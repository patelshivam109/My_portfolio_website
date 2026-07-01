import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './Experience.module.css';

const TiltCard = ({ children, index, side }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
    >
      <div className={styles.timelineDot}></div>
      <motion.div
        className={`glass-panel ${styles.timelineContent}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Experience() {
  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Data Vidwan",
      date: "June 2026 - Present",
      description: "Working on real-world Artificial Intelligence and Machine Learning projects, optimizing models through data preprocessing, and researching modern AI algorithms for intelligent automation."
    },
    {
      title: "AI Web Developer Intern",
      company: "InAmigos Foundation (IAF)",
      date: "June 2026 - June 2026",
      description: "Built and customized modern, responsive websites leveraging AI tools for content generation and design optimization. Collaborated on implementing AI-driven workflows to streamline web development."
    },
    {
      title: "Web Development Intern",
      company: "Zaalima Development Pvt. Ltd",
      date: "Mar 2026 – Jun 2026",
      description: "Built responsive and user-friendly web interfaces using modern web technologies. Collaborated with backend developers to enhance API performance. Conducted debugging, testing, and deployment of web applications."
    }
  ];

  const education = [
    {
      title: "Bachelor of Engineering - BE, Electronics and Computer Science",
      company: "Shree L. R. Tiwari College of Engineering",
      date: "July 2023 - June 2027",
      description: "Focused on core electronics and modern computer science principles. Current CGPA: 9.4."
    },
    {
      title: "HSC, Science",
      company: "Thakur College of Science & Commerce",
      date: "June 2021 - March 2023",
      description: "Higher Secondary Certificate with a focus on Science."
    },
    {
      title: "SSC",
      company: "St. Joseph's High School",
      date: "June 2011 - June 2021",
      description: "Secondary School Certificate."
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
              <TiltCard key={index} index={index} side="left">
                <h4>{exp.title}</h4>
                <h5 className="text-gradient">{exp.company}</h5>
                <span className={styles.date}>{exp.date}</span>
                <p>{exp.description}</p>
              </TiltCard>
            ))}
          </div>
        </div>

        <div className={styles.timelineColumn}>
          <h3 className={styles.columnTitle}>Education</h3>
          <div className={styles.timeline}>
            {education.map((edu, index) => (
              <TiltCard key={index} index={index} side="right">
                <h4>{edu.title}</h4>
                <h5 className="text-gradient">{edu.company}</h5>
                <span className={styles.date}>{edu.date}</span>
                <p>{edu.description}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
