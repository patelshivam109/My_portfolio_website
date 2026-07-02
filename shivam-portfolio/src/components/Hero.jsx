import React, { Suspense, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, useTexture, Html } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import styles from './Hero.module.css';
import * as THREE from 'three';
import heroImg from '../assets/hero.png';

function InteractiveFrame() {
  const texture = useTexture(heroImg);
  const cardsGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const loopDuration = 6; // Total time for one full loop
    const phase = time % loopDuration; 

    if (cardsGroupRef.current) {
      cardsGroupRef.current.children.forEach((cardGroup, i) => {
        // Pop up one by one every 0.8 seconds
        const appearTime = i * 0.8; 
        const disappearTime = 5.0; // At 5s, they all disappear together
        
        let scaleTarget = 0;
        if (phase >= appearTime && phase < disappearTime) {
          scaleTarget = 1;
        }

        // Smoothly animate the scale for a nice "pop" effect
        const currentScale = cardGroup.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, scaleTarget, delta * 12);
        cardGroup.scale.setScalar(newScale);
      });
    }
  });

  const topProjects = [
    { title: "1. News Article Summary", pos: [2.5, 1.8, 0.1] },
    { title: "2. Virtual Electronic Lab", pos: [2.5, -1.8, 0.1] },
    { title: "3. AI / ML Automation", pos: [-2.5, -1.8, 0.1] },
    { title: "4. AI Web Developer", pos: [-2.5, 1.8, 0.1] }
  ];

  return (
    <group>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* CENTER: Photo Frame */}
        <group position={[0, 0, 0]}>
          <mesh>
            <boxGeometry args={[3.2, 3.2, 0.1]} />
            <meshStandardMaterial map={texture} roughness={0.3} />
          </mesh>
          {/* Glowing Border */}
          <mesh position={[0, 0, -0.06]}>
            <boxGeometry args={[3.4, 3.4, 0.1]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* POPUP PROJECTS AROUND THE IMAGE */}
        <group ref={cardsGroupRef}>
          {topProjects.map((project, i) => (
            <group key={i} position={project.pos} scale={0}>
              <Html 
                transform 
                center
                style={{
                  background: 'rgba(15, 15, 20, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  borderLeft: '4px solid #00e5ff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                  width: '240px',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                {project.title}
              </Html>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}

export default function Hero() {
  return (
    <section id="home" className={`section ${styles.hero}`}>
      <div className={styles.content}>
        <motion.p 
          className={styles.greeting}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.neonText}>Hello, I'm</span> 
          <motion.span 
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }} 
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }} 
            style={{ display: 'inline-block', transformOrigin: '70% 70%', marginLeft: '8px', fontSize: '1.4rem' }}
          >
            👋
          </motion.span>
        </motion.p>
        <motion.h1 
          className={styles.name}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Shivam Patel
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: 'inline-block', marginLeft: '12px' }}
          >
            <Sparkles className={styles.sparkleIcon} size={48} />
          </motion.span>
        </motion.h1>
        <motion.h2 
          className={styles.role}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Full Stack Developer & <br/> AI Enthusiast
        </motion.h2>
        <motion.p 
          className={styles.bio}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Building intelligent web applications and integrating real-world AI solutions to shape the future of technology.
        </motion.p>
        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <a href="#projects" className={styles.primaryBtn}>Explore Work</a>
          <a href="#contact" className={styles.secondaryBtn}>Get in Touch</a>
        </motion.div>
      </div>

      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#7b2cbf" />
            
            <InteractiveFrame />

            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
