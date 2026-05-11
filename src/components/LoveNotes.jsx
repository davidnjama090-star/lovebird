import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [emoji, setEmoji] = useState('❤️');

  useEffect(() => {
    const stored = localStorage.getItem('loveNotes');
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('loveNotes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = { id: Date.now(), text: newNote, emoji };
      saveNotes([...notes, note]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter(note => note.id !== id));
  };

  return (
    <section className="py-16 px-4 bg-purple-50">
      <h2 className="text-4xl font-playfair text-center mb-8 text-gray-800">Love Notes Wall</h2>
      <div className="max-w-md mx-auto mb-8">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a love note..."
          className="w-full p-3 border rounded mb-2"
          rows="3"
        />
        <input
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji"
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addNote} className="w-full bg-pink-500 text-white py-2 rounded">Add Note</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <motion.div
            key={note.id}
            className="bg-yellow-200 p-4 rounded-lg shadow-lg transform rotate-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ rotate: 0 }}
          >
            <p className="mb-2">{note.text}</p>
            <div className="text-2xl">{note.emoji}</div>
            <button onClick={() => deleteNote(note.id)} className="mt-2 text-red-500">Delete</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveNotes;