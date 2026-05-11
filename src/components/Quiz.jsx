import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const questions = [
  { question: 'Who said "I love you" first?', options: ['Me', 'You', 'Both at the same time'], answer: 2 },
  { question: 'What is our funniest moment?', options: ['That dance', 'The cooking fail', 'Getting lost'], answer: 1 },
  { question: 'Who is more stubborn?', options: ['Me', 'You', 'Equal'], answer: 0 },
  { question: 'Where did we first talk for long hours?', options: ['Park', 'Cafe', 'Online'], answer: 2 },
  { question: 'What\'s our favorite color?', options: ['Pink', 'Blue', 'Green'], answer: 0 },
  { question: 'How many kids do we want?', options: ['2', '3', '4'], answer: 1 },
  { question: 'What\'s my favorite food?', options: ['Pizza', 'Pasta', 'Sushi'], answer: 0 },
  { question: 'Where was our first date?', options: ['Restaurant', 'Beach', 'Movie'], answer: 1 },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-playfair text-center mb-8 text-gray-800">How Well Do You Know Our Love? ❤️</h2>
      {!showResult ? (
        <motion.div
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-3 rounded ${selected === index ? (index === questions[currentQuestion].answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-gray-200'}`}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Confetti />
          <h3 className="text-2xl mb-4">Quiz Complete!</h3>
          <p className="text-lg mb-4">Your score: {score}/{questions.length} ({percentage}%)</p>
          {percentage >= 80 ? (
            <p className="text-green-600 font-semibold">You truly live in my heart ❤️</p>
          ) : (
            <p className="text-pink-600 font-semibold">We need more memories together 😄❤️</p>
          )}
          <button onClick={resetQuiz} className="mt-4 bg-pink-500 text-white px-6 py-2 rounded">Try Again</button>
        </motion.div>
      )}
    </section>
  );
};

export default Quiz;