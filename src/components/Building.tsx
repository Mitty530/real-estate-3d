import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function Building() {
  const buildingRef = useRef<THREE.Group | null>(null);
  
  // Rotate the building
  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.001;
    }
  });

  // Create a simple building geometry
  return (
    <group ref={buildingRef}>
      {/* Base building */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial
          color="#34acc7"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Windows */}
      {[...Array(5)].map((_, i) => (
        <group key={i} position={[0, i * 1.5 + 0.5, 0]}>
          {[-1.5, 1.5].map((x) => (
            <mesh key={x} position={[x, 0, 2.01]}>
              <planeGeometry args={[0.8, 0.8]} />
              <meshStandardMaterial
                color="#a509ff"
                emissive="#a509ff"
                emissiveIntensity={0.5}
                metalness={1}
                roughness={0}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Roof */}
      <mesh position={[0, 6.5, 0]}>
        <cylinderGeometry args={[2.5, 3, 2, 4]} />
        <meshStandardMaterial
          color="#a134c7"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Add OrbitControls for interactive viewing */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </group>
  );
}
