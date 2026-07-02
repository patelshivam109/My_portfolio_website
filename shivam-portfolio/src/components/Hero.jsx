import React, { Suspense, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, useTexture, Html } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import styles from './Hero.module.css';
import * as THREE from 'three';
import heroImg from '../assets/hero.png';

function InteractiveFrame() {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(heroImg);
  const mainGroupRef = useRef();
  const cardsGroupRef = useRef();
  const hoverProgress = useRef(0);

  useFrame((state, delta) => {
    // 1. Flip animation (rotates 180 degrees to reveal back)
    const targetRot = hovered ? Math.PI : 0;
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, targetRot, delta * 6);
    }
    
    // 2. Shuffling cards animation
    const progressTarget = hovered ? 1 : 0;
    hoverProgress.current = THREE.MathUtils.lerp(hoverProgress.current, progressTarget, delta * 5);

    if (cardsGroupRef.current) {
      cardsGroupRef.current.children.forEach((cardGroup, i) => {
        // Stacked at center when not hovered, spreads out vertically when hovered
        const targetY = 1.5 - (i * 1.0); // Spreads from top to bottom
        const targetX = (i % 2 === 0 ? -0.15 : 0.15); // Slight left/right stagger
        const targetRotZ = (i % 2 === 0 ? 0.05 : -0.05); // Slight tilt
        
        cardGroup.position.y = THREE.MathUtils.lerp(0, targetY, hoverProgress.current);
        cardGroup.position.x = THREE.MathUtils.lerp(0, targetX, hoverProgress.current);
        cardGroup.rotation.z = THREE.MathUtils.lerp(0, targetRotZ, hoverProgress.current);
      });
    }
  });

  const topProjects = [
    "1. News Article Summary",
    "2. Virtual Electronic Lab",
    "3. AI / ML Automation",
    "4. AI Web Developer"
  ];

  return (
    <group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={mainGroupRef}>
          {/* FRONT: Photo Frame */}
          <group position={[0, 0, 0.1]}>
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

          {/* BACK: Projects (Shuffling Cards) */}
          <group ref={cardsGroupRef} position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
            {topProjects.map((project, i) => (
              <group key={i} position={[0, 0, -i * 0.01]}>
                <Html 
                  transform 
                  occlude 
                  center
                  style={{
                    background: 'rgba(15, 15, 20, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    borderLeft: '4px solid #00e5ff',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                    width: '300px',
                    textAlign: 'center',
                    pointerEvents: 'none', // Prevent HTML from stealing hover from the group
                  }}
                >
                  {project}
                </Html>
              </group>
            ))}
          </group>
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
