import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiYoutube, FiMaximize, FiMinimize, FiX } from 'react-icons/fi';
import Loader from '../../components/Loader';

function InstructionalVideo({ youtubeUrl }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoContainerRef = useRef(null);

  if (!youtubeUrl) return null;

  // Extract video ID more reliably (handles different URL formats)
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(youtubeUrl);
  if (!videoId) return null;

  // Enhanced embed URL with modest branding and no suggested videos
  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&autoplay=1`;

  const toggleFullscreen = () => {
    if (!isFullscreen && videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Normal View */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="my-12 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5c2d1e] flex items-center gap-3">
            <span className="p-2 bg-[#E07A5F] text-white rounded-full">
              <FiYoutube className="text-white" />
            </span>
            Cooking Tutorial
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-2 bg-[#FFD6A5] hover:bg-[#E07A5F] hover:text-white rounded-full transition-colors"
            aria-label="Fullscreen"
          >
            <FiMaximize />
          </motion.button>
        </div>

        <div 
          ref={videoContainerRef}
          className="relative pb-[56.25%] h-0 bg-[#FFD6A5]/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-[#FFD6A5]/30"
        >
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader />
            </div>
          )}

          <iframe
            className={`absolute top-0 left-0 w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={embedUrl}
            title="Recipe instructional video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </motion.section>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl relative">
              <div className="absolute -top-12 right-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="p-3 text-white hover:text-[#FFD6A5] transition-colors"
                  aria-label="Exit fullscreen"
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                  src={embedUrl}
                  title="Recipe instructional video (fullscreen)"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="px-6 py-2 bg-[#E07A5F] text-white rounded-full hover:bg-[#5C2C1E] transition-colors flex items-center gap-2 mx-auto"
                >
                  <FiMinimize className="mr-1" />
                  Exit Fullscreen
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default InstructionalVideo;