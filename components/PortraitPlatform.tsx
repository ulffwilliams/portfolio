"use client";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import PortraitFallback from "./PortraitFallback";

const IMG = "/me.JPEG";
const SLAB = 2;
const DEPTH = 0.6;
const SIDE = "#2b2b2b";
const WALL_Z = -1; // invisible plane that catches the shadow
const MAX_TILT = 0.26; // ~15deg
const IDLE_AFTER_MS = 3000;
const DAMP = 4;
const STATIC_TILT = { rx: -0.1, ry: 0.18 };
// Click bounce: underdamped spring (omega ~12, zeta ~0.37 -> visible overshoot).
const SPRING_K = 150;
const SPRING_C = 9;
const PUSH_Z = 3; // impulse velocity backward
const PUSH_TILT = 1.6; // impulse angular velocity per unit of off-center click

type Spring = { x: number; v: number };
const stepSpring = (sp: Spring, d: number) => {
  sp.v += (-SPRING_K * sp.x - SPRING_C * sp.v) * d;
  sp.x += sp.v * d;
};

type PointerState = { nx: number; ny: number; last: number };

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Slab({
  pointer,
  reduced,
}: {
  pointer: RefObject<PointerState>;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const loaded = useLoader(THREE.TextureLoader, IMG);
  // Own copy so we can configure it without mutating the cached loader result.
  const tex = useMemo(() => {
    const t = loaded.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    t.needsUpdate = true;
    return t;
  }, [loaded]);
  useEffect(() => () => tex.dispose(), [tex]);
  const s = useRef({ rx: 0, ry: 0, y: 0, z: 0 });
  const bounce = useRef({
    z: { x: 0, v: 0 },
    rx: { x: 0, v: 0 },
    ry: { x: 0, v: 0 },
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (reduced) return;
    e.stopPropagation();
    // Click position in slab space, normalized to -1..1 from center.
    const local = e.object.worldToLocal(e.point.clone());
    const lx = clamp(local.x / (SLAB / 2), -1, 1);
    const ly = clamp(local.y / (SLAB / 2), -1, 1);
    const b = bounce.current;
    b.z.v -= PUSH_Z;
    b.rx.v += ly * PUSH_TILT; // press top -> top goes back
    b.ry.v += lx * PUSH_TILT; // press right -> right edge goes back
  };
  const setCursor = (e: ThreeEvent<PointerEvent>, cursor: string) => {
    if (e.nativeEvent.target instanceof HTMLElement)
      e.nativeEvent.target.style.cursor = cursor;
  };

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    if (reduced) {
      g.rotation.set(STATIC_TILT.rx, STATIC_TILT.ry, 0);
      g.position.set(0, 0, 0);
      return;
    }

    const d = Math.min(dt, 0.1);
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const active = performance.now() - p.last < IDLE_AFTER_MS;

    let tRx: number;
    let tRy: number;
    if (active) {
      tRx = p.ny * MAX_TILT;
      tRy = p.nx * MAX_TILT;
    } else {
      tRx = 0.12 * Math.sin(t * 0.7) + 0.05 * Math.sin(t * 1.3 + 2);
      tRy = 0.15 * Math.sin(t * 0.5 + 1) + 0.06 * Math.sin(t * 1.1);
    }
    const ty = 0.06 * Math.sin(t * 1.2);
    // Drift toward/away from the wall so the shadow breathes (offset + softness).
    const tz = 0.12 * Math.sin(t * 0.9 + 0.5);

    const c = s.current;
    c.rx = THREE.MathUtils.damp(c.rx, tRx, DAMP, d);
    c.ry = THREE.MathUtils.damp(c.ry, tRy, DAMP, d);
    c.y = THREE.MathUtils.damp(c.y, ty, DAMP, d);
    c.z = THREE.MathUtils.damp(c.z, tz, DAMP, d);

    const b = bounce.current;
    stepSpring(b.z, d);
    stepSpring(b.rx, d);
    stepSpring(b.ry, d);

    g.rotation.set(c.rx + b.rx.x, c.ry + b.ry.x, 0);
    g.position.set(0, c.y, c.z + b.z.x);
  });

  return (
    <>
      <mesh position={[0, 0, WALL_Z]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial transparent opacity={0.28} />
      </mesh>
      <group ref={group}>
        <mesh
          castShadow
          onPointerDown={onPointerDown}
          onPointerOver={(e) => !reduced && setCursor(e, "pointer")}
          onPointerOut={(e) => setCursor(e, "")}
        >
          <boxGeometry args={[SLAB, SLAB, DEPTH]} />
          {/* order: +x, -x, +y, -y, +z (front), -z */}
          <meshStandardMaterial attach="material-0" color={SIDE} roughness={0.8} />
          <meshStandardMaterial attach="material-1" color={SIDE} roughness={0.8} />
          <meshStandardMaterial attach="material-2" color={SIDE} roughness={0.8} />
          <meshStandardMaterial attach="material-3" color={SIDE} roughness={0.8} />
          <meshBasicMaterial attach="material-4" map={tex} toneMapped={false} />
          <meshStandardMaterial attach="material-5" color={SIDE} roughness={0.8} />
        </mesh>
      </group>
    </>
  );
}

export default function PortraitPlatform() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ nx: 0, ny: 0, last: -Infinity });
  const [webgl] = useState(hasWebGL);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = pointer.current;
      p.nx = clamp(
        (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2),
        -1,
        1,
      );
      p.ny = clamp(
        (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2),
        -1,
        1,
      );
      p.last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!webgl) return <PortraitFallback />;

  return (
    <div ref={wrapRef} className="w-full aspect-square relative">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        shadows={{ type: THREE.VSMShadowMap }}
        camera={{ fov: 25, position: [0, 0, 6.5] }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.5} />
        {/* Key: near-frontal so the shadow falls slightly down-right on the wall. */}
        <directionalLight
          position={[-1.2, 1.8, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-radius={10}
          shadow-blurSamples={16}
          shadow-bias={-0.0005}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
        />
        {/* Fill from upper-left: lights top/left sides, leaves bottom/right dark. */}
        <directionalLight position={[-5, 6, 1]} intensity={2.2} />
        <Suspense fallback={null}>
          <Slab pointer={pointer} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
