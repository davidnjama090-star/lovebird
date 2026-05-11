import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import MusicPlayer from '../components/MusicPlayer';
import VoiceNotes from '../components/VoiceNotes';
import Quiz from '../components/Quiz';
import LoveNotes from '../components/LoveNotes';
import SurpriseModal from '../components/SurpriseModal';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-white font-poppins">
      <Hero />
      <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
        <Gallery />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
        <VoiceNotes />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
        <Quiz />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }}>
        <LoveNotes />
      </motion.div>
      <MusicPlayer />
      <SurpriseModal />
    </div>
  );
};

export default Home;