import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { openDB } from 'idb';

const VoiceNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    initDB();
    loadNotes();
  }, []);

  const initDB = async () => {
    await openDB('VoiceNotesDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id' });
        }
      },
    });
  };

  const loadNotes = async () => {
    const db = await openDB('VoiceNotesDB', 1);
    const storedNotes = await db.getAll('notes');
    setNotes(storedNotes);
  };

  const saveNote = async (blob) => {
    const db = await openDB('VoiceNotesDB', 1);
    const id = Date.now();
    await db.add('notes', { id, blob, name: `Note ${id}` });
    loadNotes();
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      saveNote(blob);
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const playNote = (blob) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const url = URL.createObjectURL(blob);
    audioRef.current = new Audio(url);
    audioRef.current.play();
    setCurrentPlaying(blob);
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentPlaying(null);
    }
  };

  return (
    <section className="py-16 px-4 bg-pink-50">
      <h2 className="text-4xl font-playfair text-center mb-8 text-gray-800">A Message Just For You 🎤❤️</h2>
      <p className="text-center mb-8">Listen when you miss me...</p>
      <div className="flex justify-center mb-8">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-full font-semibold ${isRecording ? 'bg-red-500 text-white' : 'bg-pink-500 text-white'}`}
        >
          {isRecording ? 'Stop Recording' : 'Record Voice Note'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <motion.div
            key={note.id}
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold mb-2">{note.name}</h3>
            <button
              onClick={() => currentPlaying === note.blob ? stopPlaying() : playNote(note.blob)}
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              {currentPlaying === note.blob ? 'Stop' : 'Play'}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VoiceNotes;