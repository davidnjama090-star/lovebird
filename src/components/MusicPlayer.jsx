import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('musicSongs');
    if (stored) setSongs(JSON.parse(stored));
  }, []);

  const saveSongs = (newSongs) => {
    setSongs(newSongs);
    localStorage.setItem('musicSongs', JSON.stringify(newSongs));
  };

  const onDrop = (acceptedFiles) => {
    const newSongs = acceptedFiles.map(file => ({
      name: file.name,
      src: URL.createObjectURL(file)
    }));
    saveSongs([...songs, ...newSongs]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/*' });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-4 shadow-lg z-40"
      drag
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 200, bottom: window.innerHeight - 100 }}
    >
      <audio
        ref={audioRef}
        src={songs[currentSong]?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
      />
      <div className="flex items-center space-x-2">
        <button onClick={prevSong} className="text-2xl">⏮️</button>
        <button onClick={togglePlay} className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</button>
        <button onClick={nextSong} className="text-2xl">⏭️</button>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="w-20"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-16"
        />
      </div>
      <div {...getRootProps()} className="mt-2 text-xs cursor-pointer">
        <input {...getInputProps()} />
        Upload songs
      </div>
      <div className="text-xs mt-1">{songs[currentSong]?.name || 'No song'}</div>
    </motion.div>
  );
};

export default MusicPlayer;