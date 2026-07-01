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
            I am an engineering student focused on Full Stack Web Development, building clean interfaces, powerful backends, and complete web solutions using modern technologies.
          </motion.p>
          <motion.p variants={itemVariants} className={styles.paragraph}>
            Alongside full stack development, I am also learning AI and Machine Learning to integrate intelligent features into real-world applications. I'm driven by curiosity, hands-on learning, and the goal of becoming a versatile developer ready for future tech.
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
