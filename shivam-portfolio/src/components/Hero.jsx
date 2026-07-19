import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import styles from './Hero.module.css';
import * as THREE from 'three';

const RobotAvatar = ({ hitRef }) => {
  const rightArmRef = useRef();
  const headRef = useRef();
  const eyesRef1 = useRef();
  const eyesRef2 = useRef();
  const mouthRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const isHit = hitRef.current;
    
    // Wave animation
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 8) * 0.5 - 0.2;
    }

    // Hit reaction
    if (headRef.current) {
      if (isHit) {
        headRef.current.scale.y = THREE.MathUtils.lerp(headRef.current.scale.y, 0.6, 0.3);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.3, 0.3);
        // Change eye color to red
        if(eyesRef1.current) {
          eyesRef1.current.color.set("#ff0000");
          eyesRef1.current.emissive.set("#ff0000");
        }
        if(eyesRef2.current) {
          eyesRef2.current.color.set("#ff0000");
          eyesRef2.current.emissive.set("#ff0000");
        }
        if(mouthRef.current) {
          mouthRef.current.color.set("#ff0000");
          mouthRef.current.emissive.set("#ff0000");
        }
      } else {
        headRef.current.scale.y = THREE.MathUtils.lerp(headRef.current.scale.y, 1, 0.1);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
        // Change back to cyan
        if(eyesRef1.current) {
          eyesRef1.current.color.set("#00e5ff");
          eyesRef1.current.emissive.set("#00e5ff");
        }
        if(eyesRef2.current) {
          eyesRef2.current.color.set("#00e5ff");
          eyesRef2.current.emissive.set("#00e5ff");
        }
        if(mouthRef.current) {
          mouthRef.current.color.set("#00e5ff");
          mouthRef.current.emissive.set("#00e5ff");
        }
      }
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* Body */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      {/* Head Group */}
      <group ref={headRef} position={[0, 2.8, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#333" roughness={0.6} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.25, 0.1, 0.61]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial ref={eyesRef1} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.25, 0.1, 0.61]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial ref={eyesRef2} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
        </mesh>
        {/* Mouth */}
        <mesh position={[0, -0.3, 0.61]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <meshStandardMaterial ref={mouthRef} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Left Arm */}
      <mesh position={[-1.0, 1.8, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Right Arm (Waving) */}
      <group position={[1.0, 2.2, 0]} ref={rightArmRef}>
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.4, 1.5, 0.4]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
    </group>
  );
};

const ReactLogo = React.forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props} scale={0.4} visible={false}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1, 0.08, 16, 50]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[1, 0.08, 16, 50]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.08, 16, 50]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} toneMapped={false} />
      </mesh>
    </group>
  );
});

const DatabaseIcon = React.forwardRef((props, ref) => (
  <group ref={ref} {...props} scale={0.4} visible={false}>
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
      <meshStandardMaterial color="#00FF66" emissive="#00FF66" emissiveIntensity={1} />
    </mesh>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
      <meshStandardMaterial color="#00FF66" emissive="#00FF66" emissiveIntensity={1} />
    </mesh>
    <mesh position={[0, -0.6, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
      <meshStandardMaterial color="#00FF66" emissive="#00FF66" emissiveIntensity={1} />
    </mesh>
  </group>
));

const PythonIcon = React.forwardRef((props, ref) => (
  <group ref={ref} {...props} scale={0.4} visible={false}>
    <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.6, 0.25, 16, 50, Math.PI * 1.5]} />
      <meshStandardMaterial color="#3776AB" emissive="#3776AB" emissiveIntensity={1} />
    </mesh>
    <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <torusGeometry args={[0.6, 0.25, 16, 50, Math.PI * 1.5]} />
      <meshStandardMaterial color="#F7DF1E" emissive="#F7DF1E" emissiveIntensity={1} />
    </mesh>
  </group>
));

const AIIcon = React.forwardRef((props, ref) => (
  <group ref={ref} {...props} scale={0.4} visible={false}>
    <mesh>
      <icosahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color="#FF007F" emissive="#FF007F" emissiveIntensity={2} wireframe />
    </mesh>
    <mesh>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color="#FF007F" emissive="#FF007F" emissiveIntensity={1} />
    </mesh>
  </group>
));

function InteractiveAvatarScene() {
  const hitRef = useRef(false);
  const iconRefs = [useRef(), useRef(), useRef(), useRef()];
  const currentIconIndex = useRef(0);
  const previousCycle = useRef(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const cycle = time % 3; 

    if (cycle < previousCycle.current) {
      currentIconIndex.current = (currentIconIndex.current + 1) % 4;
    }
    previousCycle.current = cycle;

    iconRefs.forEach((ref, index) => {
      if (ref.current) {
        if (index === currentIconIndex.current) {
          ref.current.visible = true;
          
          ref.current.rotation.x = time * 2;
          ref.current.rotation.y = time * 3;

          if (cycle < 1.5) {
            const progress = Math.pow(cycle / 1.5, 2.5);
            ref.current.position.y = THREE.MathUtils.lerp(6, 1.5, progress);
            ref.current.position.x = 0;
            
            if (cycle > 1.4) {
              hitRef.current = true;
            } else {
              hitRef.current = false;
            }
          } else {
            ref.current.position.y += 0.05;
            ref.current.position.x += 0.1;
            
            if (cycle > 1.8) {
              hitRef.current = false;
            }
          }
        } else {
          ref.current.visible = false;
        }
      }
    });
  });

  return (
    <group position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <RobotAvatar hitRef={hitRef} />
      </Float>
      
      <group>
        <ReactLogo ref={iconRefs[0]} />
        <PythonIcon ref={iconRefs[1]} />
        <DatabaseIcon ref={iconRefs[2]} />
        <AIIcon ref={iconRefs[3]} />
      </group>
      
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>
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
          Full Stack Developer & <br /> AI Enthusiast
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
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#7b2cbf" />
            
            <InteractiveAvatarScene />

            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
