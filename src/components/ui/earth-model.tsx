
'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Textures are now mocked as they were not provided and causing build failures.
  // In a real application, you would have 'earth_daymap.jpg' and 'earth_normal_map.jpg' in the public/textures folder.
  const [earthTexture, earthNormalMap] = useLoader(THREE.TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_normal_map.jpg',
  ]);

  useFrame((state, delta) => {
    if(meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        normalMap={earthNormalMap}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
}

export default function EarthModel() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight color="hsl(var(--primary))" position={[10, 5, 10]} intensity={300} />
        <pointLight color="hsl(var(--secondary))" position={[-10, -5, -10]} intensity={100} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth />
        
        <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
        />
    </Canvas>
  );
}
