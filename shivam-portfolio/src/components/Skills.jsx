import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming & Frameworks",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MERN Stack", "Java", "Python", "C++", "Flask"]
    },
    {
      title: "Databases & Tools",
      skills: ["MySQL", "MongoDB", "Git", "VS Code", "Next.js", "Framer Motion", "Three.js"]
    },
    {
      title: "AI & Specialized",
      skills: ["Agentic AI", "Retrieval-Augmented Generation (RAG)", "Application Programming Interfaces (API)"]
    },
    {
      title: "Certifications",
      skills: ["Green Skills & AI Foundation", "IR & KE with Deep Learning (Python)", "AI Fundamentals", "Pyverse – App Creation (Python)", "Agentic AI (IBM SkillsBuild)"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills & Certifications
      </motion.h2>

      <div className={styles.skillsContainer}>
        {skillCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className={`glass-panel ${styles.category}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <motion.div 
              className={styles.skillTags}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {category.skills.map((skill, i) => (
                <motion.span key={i} variants={itemVariants} className={styles.skillTag}>
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
