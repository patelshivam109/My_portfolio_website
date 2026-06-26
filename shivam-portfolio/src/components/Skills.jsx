import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "Java", "Python", "C++"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB"]
    },
    {
      title: "Tools & Technologies",
      skills: ["VS Code", "Git", "Next.js", "Agentic AI", "Framer Motion", "Three.js"]
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills & Technologies
      </motion.h2>

      <div className={styles.skillsContainer}>
        {skillCategories.map((category, index) => (
          <div key={index} className={styles.category}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
