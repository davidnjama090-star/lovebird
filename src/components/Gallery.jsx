import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useDropzone } from 'react-dropzone';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All 💕');

  useEffect(() => {
    const stored = localStorage.getItem('galleryImages');
    if (stored) setImages(JSON.parse(stored));
  }, []);

  const saveImages = (newImages) => {
    setImages(newImages);
    localStorage.setItem('galleryImages', JSON.stringify(newImages));
  };

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      caption: '',
      date: '',
      category: 'All 💕',
      favorite: false
    }));
    saveImages([...images, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const toggleFavorite = (id) => {
    const updated = images.map(img => img.id === id ? { ...img, favorite: !img.favorite } : img);
    saveImages(updated);
  };

  const updateImage = (id, field, value) => {
    const updated = images.map(img => img.id === id ? { ...img, [field]: value } : img);
    saveImages(updated);
  };

  const filteredImages = filter === 'All 💕' ? images : images.filter(img => img.category === filter);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-playfair text-center mb-8 text-gray-800">Memory Gallery</h2>
      <div className="flex justify-center mb-8">
        {['All 💕', 'Trips ✈️', 'Funny 😂', 'Special Moments 🌹'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 mx-2 rounded-full ${filter === cat ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div {...getRootProps()} className="border-2 border-dashed border-pink-300 p-8 text-center mb-8 cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredImages.map(img => (
          <motion.div
            key={img.id}
            className="mb-4 relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.src} alt={img.caption} className="w-full rounded-lg shadow-lg" />
            <div className="absolute top-2 right-2">
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(img.id); }} className="text-2xl">
                {img.favorite ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              <input
                type="text"
                placeholder="Caption"
                value={img.caption}
                onChange={(e) => updateImage(img.id, 'caption', e.target.value)}
                className="w-full bg-transparent border-none outline-none"
                onClick={(e) => e.stopPropagation()}
              />
              <input
                type="date"
                value={img.date}
                onChange={(e) => updateImage(img.id, 'date', e.target.value)}
                className="w-full bg-transparent border-none outline-none mt-1"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        ))}
      </Masonry>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;