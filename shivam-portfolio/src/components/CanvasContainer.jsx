import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometries() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <Icosahedron args={[1, 0]} position={[-4, 2, -5]}>
          <meshStandardMaterial color="#00e5ff" wireframe opacity={0.3} transparent />
        </Icosahedron>
      </Float>
      <Float speed={2} rotationIntensity={3} floatIntensity={2}>
        <Icosahedron args={[1.5, 0]} position={[5, -3, -8]}>
          <meshStandardMaterial color="#7b2cbf" wireframe opacity={0.2} transparent />
        </Icosahedron>
      </Float>
      <Float speed={1} rotationIntensity={1} floatIntensity={4}>
        <Icosahedron args={[0.8, 0]} position={[2, 4, -10]}>
          <meshStandardMaterial color="#ff007f" wireframe opacity={0.4} transparent />
        </Icosahedron>
      </Float>
    </group>
  );
}

function MovingStars() {
  const starsRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={1.5} />
    </group>
  );
}

export default function CanvasContainer() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#030305']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00e5ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#7b2cbf" />
        <MovingStars />
        <FloatingGeometries />
      </Canvas>
    </div>
  );
}
