import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "You are my everything.",
  "Every day with you is a blessing.",
  "I love you more than words can say.",
  "You make my heart skip a beat.",
  "Forever and always, my love."
];

const SurpriseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState('');

  const openModal = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setIsOpen(true);
  };

  const hearts = Array.from({ length: 10 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-pink-500 text-4xl"
      initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
      animate={{ y: '-10vh', rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
    >
      ❤️
    </motion.div>
  ));

  return (
    <>
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={openModal}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Click for a Surprise 💝
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white p-8 rounded-lg max-w-md mx-4 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {hearts}
              <h3 className="text-2xl font-playfair mb-4 text-center">Surprise! 🎉</h3>
              <p className="text-lg text-center mb-4 italic">"{quote}"</p>
              <div className="text-center">
                <button className="bg-pink-500 text-white px-4 py-2 rounded mr-2">Reveal Photo</button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">Personal Message</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SurpriseModal;