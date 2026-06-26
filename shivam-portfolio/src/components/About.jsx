import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { Terminal, Code, Cpu } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>
      
      <div className={styles.aboutContainer}>
        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={itemVariants} className={styles.paragraph}>
            I am a passionate <strong>Full Stack Developer</strong> based in Mumbai, India. Currently pursuing my Bachelor of Engineering in Electronics & Computer Science at SLRTCE, Mumbai University (CGPA: 9.4).
          </motion.p>
          <motion.p variants={itemVariants} className={styles.paragraph}>
            I enjoy building responsive, user-friendly web applications and diving deep into real-world projects. Lately, I've been expanding my horizons by learning Artificial Intelligence and Machine Learning to integrate intelligent, agentic solutions into modern applications.
          </motion.p>
          <motion.p variants={itemVariants} className={styles.paragraph}>
            When I'm not coding, I'm constantly exploring new technologies and participating in hackathons to challenge myself and collaborate with others.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.cardsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className={`glass-panel ${styles.card}`}>
            <Terminal className={styles.cardIcon} size={40} />
            <h3>Frontend</h3>
            <p>React.js, Next.js, HTML, CSS, JavaScript</p>
          </motion.div>
          <motion.div variants={itemVariants} className={`glass-panel ${styles.card}`}>
            <Code className={styles.cardIcon} size={40} />
            <h3>Backend</h3>
            <p>Node.js, Express.js, Java, Python, C++</p>
          </motion.div>
          <motion.div variants={itemVariants} className={`glass-panel ${styles.card}`}>
            <Cpu className={styles.cardIcon} size={40} />
            <h3>AI & Data</h3>
            <p>Agentic AI, MySQL, MongoDB</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
