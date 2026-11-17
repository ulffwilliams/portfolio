# Portrait Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show `me.JPEG` on a floating 3D slab that tilts toward the mouse (whole page) and drifts organically when there is no mouse.

**Architecture:** A client-only R3F `<Canvas>` component (`PortraitPlatform`) loaded via `next/dynamic({ ssr: false })` from `app/page.tsx`, with a lightweight `<img>` fallback in its own file so `three` stays out of the page chunk. Pointer input lives in a ref updated by a `window` listener; all motion runs in `useFrame` with frame-rate-independent damping.

**Tech Stack:** Next.js 16, React 19, `@react-three/fiber` 9, `three` 0.167, Tailwind 4.

**Spec:** `docs/superpowers/specs/2026-11-17-portrait-platform-design.md`

**Testing note:** The repo has no unit-test framework and this feature is purely visual/motion. Verification is `npm run lint`, `npm run build`, and manual checks in `npm run dev` (listed in Task 4). Adding a test runner for this is out of scope (YAGNI).

---

## File Structure

- Create `components/PortraitFallback.tsx` — static `<img>` in the same square box. No `three` import (used as dynamic `loading` UI and as no-WebGL fallback).
- Create `components/PortraitPlatform.tsx` — Canvas, slab, shadow, pointer/idle motion, reduced-motion and visibility handling.
- Modify `app/page.tsx` — swap `Portrait` for dynamic `PortraitPlatform`.
- Delete `components/Portrait.tsx`.

---

### Task 1: Fallback component

**Files:**
- Create: `components/PortraitFallback.tsx`

- [ ] **Step 1: Write file**

```tsx
export default function PortraitFallback() {
  return (
    <div className="w-full aspect-square relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/me.JPEG"
        alt="image of me"
        className="absolute inset-[12%] w-[76%] h-[76%] object-cover border-4"
      />
    </div>
  );
}
```

(The inset roughly matches the slab's on-screen size at rest, so the swap to 3D doesn't jump.)

- [ ] **Step 2: Commit**

```bash
git add components/PortraitFallback.tsx
git commit -m "feat: add static portrait fallback"
```

### Task 2: PortraitPlatform component

**Files:**
- Create: `components/PortraitPlatform.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import PortraitFallback from "./PortraitFallback";

const IMG = "/me.JPEG";
const SLAB = 2;
const DEPTH = 0.25;
const MAX_TILT = 0.26; // ~15deg
const IDLE_AFTER_MS = 3000;
const DAMP = 4;
const STATIC_TILT = { rx: -0.1, ry: 0.18 };

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

function useShadowTexture() {
  const tex = useMemo(() => {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d")!;
    // Draw the rect far off-canvas and let only its blurred shadow land in view.
    g.shadowColor = "rgba(0,0,0,0.55)";
    g.shadowBlur = 22;
    g.shadowOffsetX = 1000;
    g.fillRect(24 - 1000, 24, size - 48, size - 48);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function Slab({
  pointer,
  reduced,
}: {
  pointer: RefObject<PointerState>;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useLoader(THREE.TextureLoader, IMG);
  const shadowTex = useShadowTexture();
  const s = useRef({ rx: 0, ry: 0, y: 0 });

  useLayoutEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
  }, [tex]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    if (reduced) {
      g.rotation.set(STATIC_TILT.rx, STATIC_TILT.ry, 0);
      g.position.y = 0;
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

    const c = s.current;
    c.rx = THREE.MathUtils.damp(c.rx, tRx, DAMP, d);
    c.ry = THREE.MathUtils.damp(c.ry, tRy, DAMP, d);
    c.y = THREE.MathUtils.damp(c.y, ty, DAMP, d);

    g.rotation.set(c.rx, c.ry, 0);
    g.position.y = c.y;

    // Higher float -> larger, fainter shadow.
    if (shadow.current && shadowMat.current) {
      const k = c.y / 0.06; // -1..1
      shadow.current.scale.setScalar(1 + k * 0.05);
      shadowMat.current.opacity = 0.75 - k * 0.15;
    }
  });

  return (
    <>
      <mesh ref={shadow} position={[0.08, -0.18, -0.6]}>
        <planeGeometry args={[SLAB * 1.6, SLAB * 1.6]} />
        <meshBasicMaterial
          ref={shadowMat}
          map={shadowTex}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <group ref={group}>
        <mesh>
          <boxGeometry args={[SLAB, SLAB, DEPTH]} />
          {/* order: +x, -x, +y, -y, +z (front), -z */}
          <meshStandardMaterial attach="material-0" color="#1a1a1a" roughness={0.6} />
          <meshStandardMaterial attach="material-1" color="#1a1a1a" roughness={0.6} />
          <meshStandardMaterial attach="material-2" color="#1a1a1a" roughness={0.6} />
          <meshStandardMaterial attach="material-3" color="#1a1a1a" roughness={0.6} />
          <meshBasicMaterial attach="material-4" map={tex} toneMapped={false} />
          <meshStandardMaterial attach="material-5" color="#1a1a1a" roughness={0.6} />
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
        camera={{ fov: 25, position: [0, 0, 6] }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[-3, 4, 5]} intensity={1.6} />
        <Suspense fallback={null}>
          <Slab pointer={pointer} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npx eslint components/PortraitPlatform.tsx components/PortraitFallback.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/PortraitPlatform.tsx
git commit -m "feat: add floating 3D portrait platform"
```

### Task 3: Wire into page, delete old Portrait

**Files:**
- Modify: `app/page.tsx` (import block lines 1-17, usage line 161)
- Delete: `components/Portrait.tsx`

- [ ] **Step 1: Replace import**

Remove `import Portrait from "@/components/Portrait";` and add:

```tsx
import dynamic from "next/dynamic";
import PortraitFallback from "@/components/PortraitFallback";

const PortraitPlatform = dynamic(
  () => import("@/components/PortraitPlatform"),
  { ssr: false, loading: () => <PortraitFallback /> },
);
```

(`const` goes after all imports, before `export default function Home`.)

- [ ] **Step 2: Replace usage**

`<Portrait />` → `<PortraitPlatform />`

- [ ] **Step 3: Delete old component**

```bash
git rm components/Portrait.tsx
```

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: use 3D portrait platform in about section"
```

### Task 4: Verify

- [ ] **Step 1:** `npm run lint` → no new errors.
- [ ] **Step 2:** `npm run build` → succeeds.
- [ ] **Step 3:** `npm run dev`, open `http://localhost:3000/#about`:
  - Desktop: slab tilts toward cursor anywhere on page; drifts on its own after 3 s still.
  - DevTools device emulation (touch): idle drift only.
  - DevTools rendering → `prefers-reduced-motion: reduce`: static tilted slab.
  - Sides visible when tilted; image colors match the original JPEG.
