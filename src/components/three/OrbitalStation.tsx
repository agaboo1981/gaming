import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HULL = "#e8e8ed";
const HULL_DARK = "#f5f5f7";
const GOLD = "#3b82f6";

function makePanelTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#dbeafe";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "#3b82f6";
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
  const dish = useRef<THREE.Group>(null);
  const shuttle = useRef<THREE.Group>(null);
  const droneA = useRef<THREE.Group>(null);
  const droneB = useRef<THREE.Group>(null);
  const strobes = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const panelTex = useMemo(() => makePanelTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) root.current.rotation.y += delta * 0.04;
    // Spin the habitat ring in its own plane (Y) so attached details orbit cleanly.
    if (ring.current) ring.current.rotation.y -= delta * 0.08;
    if (beacon.current) beacon.current.emissiveIntensity = 1.4 + Math.sin(t * 3.2) * 0.8;
    if (reactor.current) reactor.current.emissiveIntensity = 1.8 + Math.sin(t * 1.6) * 0.5;
    if (halo.current) halo.current.opacity = 0.1 + Math.sin(t * 0.8) * 0.03;
    if (dish.current) dish.current.rotation.y += delta * 0.9;
    for (let i = 0; i < strobes.current.length; i++) {
      const m = strobes.current[i];
      if (m) m.emissiveIntensity = Math.sin(t * 4 + i * 1.7) > 0.55 ? 3.2 : 0.25;
    }
    if (shuttle.current) {
      const a = t * 0.12;
      const px = Math.cos(a) * 4.2;
      const pz = Math.sin(a) * 4.2;
      shuttle.current.position.set(px, 0.9, pz);
      shuttle.current.lookAt(px - Math.sin(a), 0.9, pz + Math.cos(a));
    }
    const drones: Array<[THREE.Group | null, number, number]> = [
      [droneA.current, 0.2, 0],
      [droneB.current, -0.16, Math.PI],
    ];
    for (const [g, sp, ph] of drones) {
      if (!g) continue;
      const a = t * sp + ph;
      g.position.set(
        Math.cos(a) * 3.3,
        0.2 + Math.sin(t * 0.9 + ph) * 0.22,
        Math.sin(a) * 3.3,
      );
      g.rotation.y = -a;
    }
  });

  return (
    <group ref={root} rotation={[0.32, 0, 0.14]}>
      {/* additive halo for bloom-like glow */}
      <mesh scale={6.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial ref={halo} color={GOLD} side={THREE.BackSide} transparent opacity={0.1} depthWrite={false} />
      </mesh>

      {/* command core */}
      <mesh>
        <cylinderGeometry args={[0.95, 1.15, 1.8, 10]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.9} roughness={0.34} />
      </mesh>
      {/* reactor axle — passes through the core with housed end caps */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 2.4, 16]} />
        <meshStandardMaterial ref={reactor} color={"#000000"} emissive={GOLD} emissiveIntensity={1.8} metalness={0} roughness={1} />
      </mesh>
      {[-1.2, 1.2].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.18, 16]} />
          <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.45} />
        </mesh>
      ))}
      {/* core window bands */}
      {[
        { y: 0.86, r: 0.98 },
        { y: -0.86, r: 1.16 },
      ].map((s, i) => (
        <mesh key={i} position={[0, s.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[s.r, 0.055, 8, 32]} />
          <meshStandardMaterial color={"#000000"} emissive={GOLD} emissiveIntensity={1.6} metalness={0} roughness={1} />
        </mesh>
      ))}

      {/* hull piping between the struts */}
      {[45, 135, 225, 315].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <mesh key={deg} position={[Math.cos(a) * 1.04, 0, Math.sin(a) * 1.04]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
            <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
          </mesh>
        );
      })}

      {/* habitat ring */}
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.32, 12, 48]} />
          <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.87, 0.045, 8, 64]} />
          <meshStandardMaterial color={"#000000"} emissive={"#93c5fd"} emissiveIntensity={2.2} metalness={0} roughness={1} />
        </mesh>
        {/* cargo containers riding the ring — make the spin visible */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <group
              key={i}
              position={[Math.cos(a) * 2.55, 0.42, Math.sin(a) * 2.55]}
              rotation={[0, -a, 0]}
            >
              <mesh>
                <boxGeometry args={[0.34, 0.24, 0.26]} />
                <meshStandardMaterial
                  color={i % 2 ? HULL : HULL_DARK}
                  metalness={0.7}
                  roughness={0.5}
                />
              </mesh>
              {i % 3 === 0 && (
                <mesh position={[0, 0.02, 0.14]}>
                  <boxGeometry args={[0.2, 0.05, 0.02]} />
                  <meshStandardMaterial
                    color={"#000000"}
                    emissive={"#93c5fd"}
                    emissiveIntensity={1.8}
                    metalness={0}
                    roughness={1}
                  />
                </mesh>
              )}
            </group>
          );
        })}
        {/* nav strobes */}
        {(
          [
            [2.55, 0.35, 0],
            [-2.55, 0.35, 0],
            [0, 0.35, 2.55],
            [0, 0.35, -2.55],
          ] as [number, number, number][]
        ).map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial
              ref={(m) => {
                strobes.current[i] = m;
              }}
              color={"#000000"}
              emissive={i % 2 ? "#e0f2fe" : "#3b82f6"}
              emissiveIntensity={0.25}
              metalness={0}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* four radial struts */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.75, 0, Math.sin(a) * 1.75]} rotation={[0, -a, 0]}>
            <boxGeometry args={[1.9, 0.14, 0.14]} />
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
            <meshStandardMaterial map={panelTex} emissiveMap={panelTex} color={"#dbeafe"} emissive={"#3b82f6"} emissiveIntensity={0.7} metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[s * 0.55, 0, -0.035]}>
            <boxGeometry args={[1.98, 1.38, 0.02]} />
            <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* antenna farm + sweeping radar dish */}
      {[
        [0.5, -0.3],
        [-0.45, -0.32],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.15, z]}>
          <cylinderGeometry args={[0.02, 0.03, 0.7, 6]} />
          <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
      <group position={[-0.55, 0.9, 0.25]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.4, 6]} />
          <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
        </mesh>
        <group ref={dish} position={[0, 0.44, 0]} rotation={[0.5, 0, 0.3]}>
          <mesh>
            <coneGeometry args={[0.28, 0.12, 16, 1, true]} />
            <meshStandardMaterial
              color={"#e8e8ed"}
              metalness={0.6}
              roughness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color={"#000000"}
              emissive={"#3b82f6"}
              emissiveIntensity={2.4}
              metalness={0}
              roughness={1}
            />
          </mesh>
        </group>
      </group>

      {/* docking boom — pierces the docking ring */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.6, 8]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.05, 8, 24]} />
        <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
      </mesh>

      {/* mast + beacon — mast threads the ring, beacon sits on the mast */}
      <mesh position={[0, 2.42, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.35, 8]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.66, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial ref={beacon} color={"#000000"} emissive={"#3b82f6"} emissiveIntensity={1.4} metalness={0} roughness={1} />
      </mesh>

      {/* engine nozzle — joins hull to plume */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.35, 16]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.8} roughness={0.45} />
      </mesh>
      {/* belly sensor dome with glowing lens */}
      <mesh position={[0.55, -0.92, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color={HULL} metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[0.55, -1.05, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color={"#000000"}
          emissive={"#60a5fa"}
          emissiveIntensity={2.2}
          metalness={0}
          roughness={1}
        />
      </mesh>
      {/* engine thruster plume */}
      <mesh position={[0, -1.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.4, 16, 1, true]} />
        <meshBasicMaterial color={"#60a5fa"} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* holographic traffic lanes */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.008, 6, 128]} />
        <meshBasicMaterial color={"#3b82f6"} transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.3, 0.006, 6, 128]} />
        <meshBasicMaterial color={"#3b82f6"} transparent opacity={0.2} depthWrite={false} />
      </mesh>

      {/* courier shuttle riding the outer lane */}
      <group ref={shuttle}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.5, 8]} />
          <meshStandardMaterial color={"#e8e8ed"} metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.09, 0.18, 8]} />
          <meshStandardMaterial color={"#3b82f6"} metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.07, 0.05]}>
          <boxGeometry args={[0.08, 0.03, 0.2]} />
          <meshStandardMaterial
            color={"#000000"}
            emissive={"#93c5fd"}
            emissiveIntensity={2}
            metalness={0}
            roughness={1}
          />
        </mesh>
        <mesh position={[0, 0, -0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={"#000000"}
            emissive={"#60a5fa"}
            emissiveIntensity={2.5}
            metalness={0}
            roughness={1}
          />
        </mesh>
      </group>

      {/* patrol drones on the inner lane */}
      <group ref={droneA}>
        <mesh>
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial
            color={"#0a1424"}
            metalness={0.6}
            roughness={0.4}
            emissive={"#3b82f6"}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>
      <group ref={droneB}>
        <mesh>
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial
            color={"#0a1424"}
            metalness={0.6}
            roughness={0.4}
            emissive={"#3b82f6"}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>
    </group>
  );
}