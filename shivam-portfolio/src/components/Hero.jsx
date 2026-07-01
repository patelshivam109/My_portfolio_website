import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import styles from './Hero.module.css';

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
        </motion.p>
        <motion.h1 
          className={styles.name}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Shivam Patel<span className="text-gradient">.</span>
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
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#7b2cbf" />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[1, 128, 128]} scale={2.5}>
                <MeshDistortMaterial 
                  color="#030305" 
                  emissive="#00e5ff"
                  emissiveIntensity={0.2}
                  attach="material" 
                  distort={0.5} 
                  speed={2.5} 
                  roughness={0.1}
                  metalness={1}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </Sphere>
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
