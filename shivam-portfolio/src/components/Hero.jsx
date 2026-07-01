import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
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
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#7b2cbf" />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
              <mesh>
                <torusKnotGeometry args={[1.2, 0.2, 128, 32]} />
                <meshStandardMaterial color="#00e5ff" wireframe opacity={0.6} transparent />
              </mesh>
              
              <Sphere args={[0.6, 64, 64]}>
                <meshStandardMaterial 
                  color="#1a0b2e" 
                  emissive="#7b2cbf"
                  emissiveIntensity={1.5}
                  roughness={0.1}
                  metalness={0.9}
                />
              </Sphere>
            </Float>

            <Float speed={3} rotationIntensity={2} floatIntensity={3}>
              <mesh position={[2.5, 1.5, 0]}>
                <icosahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial color="#ff007f" wireframe />
              </mesh>
            </Float>
            <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
              <mesh position={[-2.5, -1.5, 1]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#00e5ff" wireframe />
              </mesh>
            </Float>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
