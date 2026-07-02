import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import styles from './Projects.module.css';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

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
      className={`glass-panel ${styles.projectCard}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className={styles.cardInner}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div style={{ transform: "translateZ(40px)" }} className={styles.projectContent}>
          <div className={styles.projectHeader}>
            <Code className={styles.projectIcon} size={28} />
            <h3 className={styles.projectTitle}>{project.title}</h3>
          </div>
          <p className={styles.projectDesc}>{project.description}</p>
          <div className={styles.techStack}>
            {project.tech.map((t, i) => (
              <span key={i} className={styles.techBadge}>{t}</span>
            ))}
          </div>
          <div className={styles.projectLinks}>
            <a href={project.link} className={styles.iconLink} target="_blank" rel="noreferrer">
              <ExternalLink size={20} />
              <span>View live</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const projects = [
    {
      title: "News Article Summary Generator",
      description: "Designed and implemented a web-based News Article Summary Generator using a Flask backend and responsive frontend technologies, enabling automated summarization from text, keywords, and URLs with support for multilingual processing, text-to-speech, UI theming, and database management.",
      tech: ["Flask", "Python", "HTML", "CSS", "JavaScript"],
      link: "https://news-article-summary-generator.onrender.com/"
    },
    {
      title: "Virtual Electronic Lab",
      description: "Developed an interactive electronic circuit simulation platform using HTML, CSS, JavaScript, and SVG, implementing real-time simulations for MOSFETs, BJT amplifiers, inverting amplifiers, and logic gates to replicate a physical electronics lab for effective learning.",
      tech: ["HTML", "CSS", "JavaScript", "SVG"],
      link: "https://shubuexe.github.io/Virtual-Lab-2.3.1-/"
    }
  ];

  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Personal Projects
      </motion.h2>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
