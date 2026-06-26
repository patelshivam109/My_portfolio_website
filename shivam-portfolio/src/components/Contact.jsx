import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import styles from './Contact.module.css';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <motion.h2 
        className="section-title text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>

      <div className={styles.contactContainer}>
        <motion.div 
          className={`glass-panel ${styles.contactCard}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className={styles.contactIntro}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className={styles.infoItems}>
            <a href="mailto:patelshivam110099@gmail.com" className={styles.infoItem}>
              <Mail className={styles.icon} size={24} />
              <span>patelshivam110099@gmail.com</span>
            </a>
            <a href="tel:+918591818007" className={styles.infoItem}>
              <Phone className={styles.icon} size={24} />
              <span>+91 8591818007</span>
            </a>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://github.com/patelshivam109" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <GithubIcon size={28} />
            </a>
            <a href="https://linkedin.com/in/shivam-patel" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <LinkedinIcon size={28} />
            </a>
          </div>
        </motion.div>
      </div>
      
      <footer className={styles.footer}>
        <p>Designed & Built by Shivam Patel</p>
      </footer>
    </section>
  );
}
