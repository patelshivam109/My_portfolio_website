import React from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

export default function Experience() {
  const experiences = [
    {
      title: "AI/ML Training (Agentic AI)",
      company: "IBM",
      date: "July 2025 – Aug 2025",
      description: "Certified in IBM SkillsBuild’s Agentic AI program. Built practical AI agent workflows, learned prompt engineering, automation design, and contributed to real-world AI solution development in collaboration with CSRBOX."
    },
    {
      title: "Intern / Web Developer",
      company: "Zaalima Development",
      date: "Mar 2026 – Jun 2026",
      description: "Built responsive and user-friendly web interfaces using modern web technologies. Collaborated with backend developers to enhance API performance. Conducted debugging, testing, and deployment of web applications."
    }
  ];

  const education = [
    {
      title: "Bachelor of Engineering – Electronics & Computer Science",
      company: "SLRTCE, Mumbai University",
      date: "2023 - 2027",
      description: "CGPA: 9.4 (Till Sem 6)"
    }
  ];

  return (
    <section id="experience" className={`section ${styles.expSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Experience & Education
      </motion.h2>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineColumn}>
          <h3 className={styles.columnTitle}>Experience</h3>
          <div className={styles.timeline}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.timelineDot}></div>
                <div className={`glass-panel ${styles.timelineContent}`}>
                  <h4>{exp.title}</h4>
                  <h5 className="text-gradient">{exp.company}</h5>
                  <span className={styles.date}>{exp.date}</span>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.timelineColumn}>
          <h3 className={styles.columnTitle}>Education</h3>
          <div className={styles.timeline}>
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.timelineDot}></div>
                <div className={`glass-panel ${styles.timelineContent}`}>
                  <h4>{edu.title}</h4>
                  <h5 className="text-gradient">{edu.company}</h5>
                  <span className={styles.date}>{edu.date}</span>
                  <p>{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
