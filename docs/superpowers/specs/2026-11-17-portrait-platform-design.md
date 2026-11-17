# Portrait Platform — Design

Date: 2026-11-17

## Goal

Replace the flat portrait (`components/Portrait.tsx`, grayscale/color slider) in the "about me" section with `me.JPEG` displayed on a floating 3D platform that tilts toward the mouse. Without a mouse, the platform drifts organically on its own.

## Decisions

- **Slider removed.** Image shown in full color only.
- **Platform style:** thick brutalist slab. Image on the front face, black sides. Soft shadow beneath that reacts to float height.
- **Mouse tracking:** whole page. Tilt is computed from the pointer position relative to the platform's center, regardless of whether the pointer is over it.
- **Tech:** `@react-three/fiber` 9 + `three` 0.167 (already dependencies). No new dependencies (no `drei`).

## Components

### `components/PortraitPlatform.tsx` (new, client)

- Outer wrapper: `div` with `w-full aspect-square relative` (no `border-4`; the slab provides the visual edge).
- Renders `<Canvas>` with:
  - Perspective camera, low FOV (~25°), positioned so the slab fills the square at rest with small margin for tilt.
  - `dpr={[1, 2]}`, transparent background (`gl={{ alpha: true }}`).
  - Lights: `ambientLight` + one `directionalLight` from upper-front-left so tilted sides read as 3D.
- `Slab` subcomponent:
  - `BoxGeometry(2, 2, 0.25)`.
  - Material array (order +x, -x, +y, -y, +z, -z): sides and back `MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.6 })` (near-black so lighting still shades the sides), front (+z) `MeshBasicMaterial({ map: texture, toneMapped: false })` so image colors stay exact and unaffected by lighting.
  - Texture loaded with `useLoader(THREE.TextureLoader, "/me.JPEG")`, `colorSpace = THREE.SRGBColorSpace`.
- `Shadow` subcomponent:
  - Plane below/behind the slab with a radial-gradient `CanvasTexture` (black center → transparent edge), `transparent`, `depthWrite: false`.
  - Scale and opacity derived from slab float offset: higher float → larger, fainter shadow.

### Motion (inside `useFrame`)

- **Pointer mode** (fine pointer available and a `pointermove` received within the last 3 s):
  - `window` `pointermove` listener stores normalized offset `(nx, ny)` relative to the canvas element's bounding-rect center, divided by half the viewport size, clamped to [-1, 1].
  - Target rotation: `rotY = nx * MAX_TILT`, `rotX = ny * MAX_TILT` (screen y grows downward; negative rotX turns the face up), `MAX_TILT ≈ 15°` (0.26 rad).
- **Idle mode** (coarse pointer, or no pointer movement for 3 s):
  - Target rotation and position from sums of sines at incommensurate frequencies, e.g. `rotX = 0.12*sin(t*0.7) + 0.05*sin(t*1.3)`, `rotY = 0.15*sin(t*0.5+1) + 0.06*sin(t*1.1)` — non-repeating, organic drift.
- **Always:** gentle Y bob `posY = 0.06*sin(t*1.2)`.
- Current values move toward targets with `THREE.MathUtils.damp(current, target, λ≈4, delta)` so mode switches are smooth.

### Accessibility / performance

- `prefers-reduced-motion: reduce`: no animation, slab rendered once at a small fixed tilt; `frameloop="demand"`.
- `IntersectionObserver` on the wrapper: when out of viewport set `frameloop="never"`, back to `"always"` when visible.
- Listener removed on unmount.

### Loading / fallback

- `page.tsx` imports via `next/dynamic(() => import("@/components/PortraitPlatform"), { ssr: false, loading: Fallback })`.
- `Fallback`: plain `<img src="/me.JPEG">` in the same `aspect-square` box (object-cover), so layout doesn't shift.
- If WebGL is unavailable (`document.createElement("canvas").getContext("webgl2") || getContext("webgl")` null), `PortraitPlatform` renders the same fallback image.

## Changes to existing code

- `app/page.tsx`: replace `<Portrait />` with dynamic `PortraitPlatform`; remove `Portrait` import.
- Delete `components/Portrait.tsx` (only used in `page.tsx`; `app/cv/page.tsx` uses its own `<img>`).
- `components/ui/slider.tsx` stays (shadcn primitive, harmless).

## Out of scope

- Unused `import { Color } from "three"` in `page.tsx` — untouched.
- CV page portrait — untouched.

## Verification

- `npm run lint` and `npm run build` pass.
- Manual in `npm run dev`:
  - Desktop: slab tilts toward cursor anywhere on page; returns to idle drift after 3 s still.
  - Mobile emulation (coarse pointer): idle drift only.
  - Reduced-motion emulation: static tilted slab.
  - Side thickness visible when tilted; image colors correct (not washed out).
