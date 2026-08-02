import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarfieldProps {
  count?: number;
  radius?: number;
}

/** Procedural two-layer starfield: bone-white field + gold accents. */
export function Starfield({ count = 1500, radius = 60 }: StarfieldProps) {
  const ref = useRef<THREE.Group>(null);

  const shell = useMemo(() => {
    const make = (n: number, lo: number, hi: number) => {
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = radius * (lo + Math.random() * (hi - lo));
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      return g;
    };
    return { white: make(count, 0.6, 1), gold: make(Math.floor(count * 0.08), 0.8, 1) };
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <group ref={ref}>
      <points geometry={shell.white} frustumCulled={false}>
        <pointsMaterial
          size={0.12}
          sizeAttenuation
          color={"#e8e6e0"}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={shell.gold} frustumCulled={false}>
        <pointsMaterial
          size={0.22}
          sizeAttenuation
          color={"#ffd874"}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}