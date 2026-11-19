"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Figure({ still }: { still: boolean }) {
  const group = useRef<Group>(null);
  const visor = useRef<Mesh>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const aimY = state.pointer.x * 0.55 + 0.35;
    const aimX = state.pointer.y * -0.15;
    g.rotation.y += (aimY - g.rotation.y) * 0.08;
    g.rotation.x += (aimX - g.rotation.x) * 0.08;
    if (!still) {
      g.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.035;
    }
    if (visor.current) {
      const mat = visor.current.material;
      if (!Array.isArray(mat) && "emissiveIntensity" in mat) {
        mat.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 2.2) * 0.15;
      }
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
        <circleGeometry args={[0.62, 40]} />
        <meshBasicMaterial color="#171717" transparent opacity={0.16} />
      </mesh>

      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.58, 0.62, 0.08, 40]} />
        <meshStandardMaterial color="#e7e4dc" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <torusGeometry args={[0.5, 0.018, 8, 40]} />
        <meshStandardMaterial color="#f0ff40" roughness={0.35} metalness={0.2} />
      </mesh>

      <mesh position={[0, -0.42, 0]}>
        <capsuleGeometry args={[0.32, 0.46, 8, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.48} metalness={0.32} />
      </mesh>
      <mesh position={[0, -0.02, 0.06]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.26, 0.035, 10, 28]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.4} />
      </mesh>

      <mesh position={[-0.4, -0.48, 0.08]} rotation={[0.15, 0, 0.15]}>
        <capsuleGeometry args={[0.065, 0.34, 6, 12]} />
        <meshStandardMaterial color="#161616" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0.4, -0.48, 0.08]} rotation={[0.15, 0, -0.15]}>
        <capsuleGeometry args={[0.065, 0.34, 6, 12]} />
        <meshStandardMaterial color="#161616" roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.38, 40, 40]} />
        <meshStandardMaterial color="#314155" roughness={0.68} />
      </mesh>

      <mesh position={[0, 0.86, -0.16]} rotation={[0.7, 0, 0]}>
        <boxGeometry args={[0.1, 0.58, 0.34]} />
        <meshStandardMaterial color="#1b2836" roughness={0.55} />
      </mesh>
      <mesh position={[-0.16, 0.7, -0.16]} rotation={[0.55, 0.15, 0.45]}>
        <boxGeometry args={[0.07, 0.4, 0.24]} />
        <meshStandardMaterial color="#243447" roughness={0.6} />
      </mesh>
      <mesh position={[0.16, 0.7, -0.16]} rotation={[0.55, -0.15, -0.45]}>
        <boxGeometry args={[0.07, 0.4, 0.24]} />
        <meshStandardMaterial color="#243447" roughness={0.6} />
      </mesh>

      <mesh position={[-0.18, 0.72, 0.02]} rotation={[0.2, 0, -0.35]}>
        <coneGeometry args={[0.09, 0.28, 16]} />
        <meshStandardMaterial color="#2c3848" roughness={0.7} />
      </mesh>
      <mesh position={[0.18, 0.72, 0.02]} rotation={[0.2, 0, 0.35]}>
        <coneGeometry args={[0.09, 0.28, 16]} />
        <meshStandardMaterial color="#2c3848" roughness={0.7} />
      </mesh>
      <mesh position={[-0.18, 0.66, 0.05]} rotation={[0.2, 0, -0.35]}>
        <coneGeometry args={[0.045, 0.16, 12]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.66, 0.05]} rotation={[0.2, 0, 0.35]}>
        <coneGeometry args={[0.045, 0.16, 12]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.28, 0.3]} scale={[1.05, 0.72, 1.15]}>
        <sphereGeometry args={[0.18, 28, 28]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0.48]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.42, 0.3]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.08]} />
        <meshStandardMaterial color="#f0ff40" roughness={0.32} metalness={0.15} />
      </mesh>
      <mesh ref={visor} position={[0, 0.42, 0.35]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.62, 0.13, 0.06]} />
        <meshStandardMaterial
          color="#0c0c0c"
          emissive="#f0ff40"
          emissiveIntensity={0.35}
          roughness={0.12}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

export default function DeskFigureScene({ still }: { still: boolean }) {
  return (
    <Canvas
      camera={{ position: [0.15, 0.35, 3.15], fov: 32 }}
      dpr={[1, 1.6]}
      frameloop={still ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.72} />
      <directionalLight position={[2.4, 3.2, 2.2]} intensity={1.7} />
      <directionalLight position={[-2.2, 1.2, -1.4]} intensity={0.45} color="#d7e2f2" />
      <pointLight position={[0.2, 0.5, 1.6]} intensity={1.2} color="#f0ff40" distance={4} />
      <Figure still={still} />
    </Canvas>
  );
}
