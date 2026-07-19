import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CanvasContainer from './components/CanvasContainer';
import Preloader from './components/Preloader';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader key="preloader" onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>
      <CanvasContainer />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
