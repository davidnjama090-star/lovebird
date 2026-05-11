import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Every moment with you is my favorite story';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const hearts = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-pink-300 text-2xl"
      initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
      animate={{ y: '-10vh' }}
      transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, delay: Math.random() * 5 }}
    >
      ❤️
    </motion.div>
  ));

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {hearts}
      <div className="text-center z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-playfair text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Forever Memories ❤️
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mb-8 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          {displayText}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-100 transition-colors">
            Enter Our Story
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
            Open Memories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;