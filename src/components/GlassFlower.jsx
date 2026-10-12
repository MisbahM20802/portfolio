import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Components removed per user request

function Scene({ mouseNorm }) {
  const group = useRef();
  
  useFrame(() => {
    if (!group.current) return;
    const targetRx = mouseNorm.current.y * 0.08;
    const targetRz = mouseNorm.current.x * 0.08;
    group.current.rotation.x += (targetRx - group.current.rotation.x) * 0.02;
    group.current.rotation.z += (targetRz - group.current.rotation.z) * 0.02;
    group.current.rotation.y += 0.002;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Animals removed */}
      
      {/* Lighting */}
      <pointLight position={[0, 2, 2]} intensity={2.0} color="#c9a0ff" distance={6} decay={2} />
      <pointLight position={[-2, -1, 2]} intensity={1.2} color="#7dd3fc" distance={5} decay={2} />
    </group>
  );
}

export default function GlassFlower() {
  const mouseNorm = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    mouseNorm.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="hero-canvas-container" aria-hidden="true" style={{ cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <Environment preset="night" environmentIntensity={1.2} />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <Scene mouseNorm={mouseNorm} />
          </Float>
        </React.Suspense>
      </Canvas>
    </div>
  );
}
