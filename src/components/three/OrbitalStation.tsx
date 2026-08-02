import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HULL = "#26242c";
const HULL_DARK = "#131217";
const GOLD = "#d4a017";

function makePanelTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#070d16";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "#1c3a5e";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Procedural orbital salvage station: core + reactor, habitat ring with lit
 *  window band, four struts, two solar arrays, docking boom, beacon, halo. */
export function OrbitalStation() {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.MeshStandardMaterial>(null);
  const reactor = useRef<THREE.MeshStandardMaterial>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const panelTex = useMemo(() => makePanelTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) root.current.rotation.y += delta * 0.04;
    if (ring.current) ring.current.rotation.z -= delta * 0.08;
    if (beacon.current) beacon.current.emissiveIntensity = 1.4 + Math.sin(t * 3.2) * 0.8;
    if (reactor.current) reactor.current.emissiveIntensity = 1.8 + Math.sin(t * 1.6) * 0.5;
    if (halo.current) halo.current.opacity = 0.12 + Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={root} rotation={[0.32, 0, 0.14]}>
      {/* additive halo for bloom-like glow */}
      <mesh scale={6.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial ref={halo} color={GOLD} side={THREE.BackSide} transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* command core */}
      <mesh>
        <cylinderGeometry args={[0.95, 1.15, 1.8, 10]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.9} roughness={0.34} />
      </mesh>
      {/* reactor insert */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 1.85, 16]} />
        <meshStandardMaterial ref={reactor} color={"#000000"} emissive={GOLD} emissiveIntensity={1.8} metalness={0} roughness={1} />
      </mesh>
      {/* core window bands */}
      {[0.95, -0.95].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.05, 8, 32]} />
          <meshStandardMaterial color={"#000000"} emissive={GOLD} emissiveIntensity={1.6} metalness={0} roughness={1} />
        </mesh>
      ))}

      {/* habitat ring */}
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.32, 12, 48]} />
          <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.06, 8, 64]} />
          <meshStandardMaterial color={"#000000"} emissive={"#ffd874"} emissiveIntensity={2.2} metalness={0} roughness={1} />
        </mesh>
      </group>

      {/* four radial struts */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8]} rotation={[0, -a, 0]}>
            <boxGeometry args={[1.6, 0.14, 0.14]} />
            <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.45} />
          </mesh>
        );
      })}

      {/* solar arrays on deployment arms */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 3.7, 0, 0]} rotation={[0, 0, s * 0.08]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 2.1, 6]} />
            <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
          </mesh>
          <mesh position={[s * 0.55, 0, 0]}>
            <boxGeometry args={[1.9, 1.3, 0.04]} />
            <meshStandardMaterial map={panelTex} emissiveMap={panelTex} color={"#0a1424"} emissive={"#2a5586"} emissiveIntensity={0.7} metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* docking boom + ring */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.05, 8, 24]} />
        <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
      </mesh>

      {/* beacon */}
      <mesh position={[0, 2.95, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial ref={beacon} color={"#000000"} emissive={"#ff5a3c"} emissiveIntensity={1.4} metalness={0} roughness={1} />
      </mesh>

      {/* engine thruster plume */}
      <mesh position={[0, -1.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.4, 16, 1, true]} />
        <meshBasicMaterial color={"#ffb24a"} transparent opacity={0.32} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}