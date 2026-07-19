import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import styles from './Preloader.module.css';

const Starfield = ({ isWarping }) => {
  const pointsRef = useRef();
  const speedRef = useRef(0.2); // Base speed
  const targetSpeedRef = useRef(0.2);
  
  const particleCount = 3000;
  
  const [positions, randoms] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 1.0) * 500; // z
      
      randoms[i] = Math.random();
    }
    
    return [positions, randoms];
  }, []);

  useEffect(() => {
    if (isWarping) {
      targetSpeedRef.current = 60; // Warp speed!
    } else {
      targetSpeedRef.current = 0.2;
    }
  }, [isWarping]);
  
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Lerp speed for smooth acceleration
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeedRef.current, delta * 2.5);
    
    const geometry = pointsRef.current.geometry;
    const posAttribute = geometry.attributes.position;
    
    for (let i = 0; i < particleCount; i++) {
      // z is i * 3 + 2
      posAttribute.array[i * 3 + 2] += speedRef.current * (randoms[i] * 0.5 + 0.5) * delta * 60;
      
      // if particle passes camera, reset far back
      if (posAttribute.array[i * 3 + 2] > 10) {
        posAttribute.array[i * 3 + 2] = -500;
        posAttribute.array[i * 3] = (Math.random() - 0.5) * 100;
        posAttribute.array[i * 3 + 1] = (Math.random() - 0.5) * 100;
      }
    }
    posAttribute.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} color="#aaddff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('waiting'); // 'waiting' -> 'warping' -> 'flashing' -> 'done'
  
  useEffect(() => {
    // Sequence of events
    const waitTimer = setTimeout(() => setPhase('warping'), 1500); // Wait 1.5s then warp
    const flashTimer = setTimeout(() => setPhase('flashing'), 3500); // Flash at 3.5s
    const doneTimer = setTimeout(() => {
        setPhase('done');
        onComplete();
    }, 4000); // Complete at 4s
    
    return () => {
      clearTimeout(waitTimer);
      clearTimeout(flashTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className={styles.preloaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000005']} />
        <Starfield isWarping={phase === 'warping' || phase === 'flashing'} />
      </Canvas>
      
      <div className={styles.overlay}>
        <AnimatePresence mode="wait">
          {(phase === 'waiting' || phase === 'warping') && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.9, letterSpacing: '2px' }}
              animate={{ 
                opacity: 1, 
                scale: phase === 'warping' ? 1.05 : 1, 
                letterSpacing: phase === 'warping' ? '8px' : '2px',
                filter: phase === 'warping' ? 'blur(1px)' : 'blur(0px)'
              }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
              transition={{ duration: 1 }}
              className={styles.message}
            >
              {phase === 'waiting' ? 'Preparing for Launch...' : 'Initiating Warp Drive...'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* The Flash */}
      <AnimatePresence>
        {phase === 'flashing' && (
          <motion.div 
            className={styles.flash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader;
