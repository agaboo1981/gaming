import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { OrbitalStation } from "./OrbitalStation";
import { Starfield } from "./Starfield";

interface RigProps {
  scroll?: MotionValue<number>;
}

/**
 * Camera rig: gentle parallax driven by the global pointer (tracked via a
 * window listener so it works through the HTML overlays above the canvas)
 * plus a scroll-driven drift so the station recedes as the reader leaves the
 * hero. All damping is frame-rate independent.
 */
function CameraRig({ scroll }: RigProps) {
  const { camera, size } = useThree();
  const goal = useRef(new THREE.Vector3(0, 1.4, 7.6));
  const ptr = useRef({ x: 0, y: 0 });
  const intro = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const aspect = size.width / Math.max(1, size.height);
    // Pull the camera back on narrow viewports so the full station stays framed.
    const base = aspect < 0.8 ? 11.5 : aspect < 1.2 ? 9.2 : 7.6;
    intro.current = Math.min(1, intro.current + delta * 0.5);
    const s = scroll ? scroll.get() : 0; // 0..1 over hero
    const p = ptr.current;
    const introZ = (1 - intro.current) * 4; // ease in from further back
    goal.current.set(
      p.x * 1.1,
      1.4 + p.y * 0.7 - s * 2.6,
      base - s * 1.4 + introZ
    );
    const k = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(goal.current, k);
    camera.lookAt(0, -0.1 + s * 0.6, 0);
  });
  return null;
}

interface StationSceneProps {
  scroll?: MotionValue<number>;
  className?: string;
}

/**
 * Full WebGL hero scene. Transparent canvas (alpha) so the CSS gradient
 * shows through; dpr clamped for perf; lights tuned for a cinematic gold rim.
 */
export function StationScene({ scroll, className }: StationSceneProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.4, 7.6], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <CameraRig scroll={scroll} />

        {/* cool ambient + blue key + gold rim */}
        <ambientLight intensity={0.16} color={"#3a4a6a"} />
        <directionalLight position={[-4, 3, 3]} intensity={1.15} color={"#cfe0ff"} />
        <directionalLight position={[5, -1, -4]} intensity={2.6} color={"#d4a017"} />
        <pointLight position={[0, 0, 1.2]} intensity={6} color={"#e8b520"} distance={7} />

        <OrbitalStation />
        <Starfield count={1500} />
        <fog attach="fog" args={["#07080b", 9, 26]} />
      </Suspense>
    </Canvas>
  );
}
