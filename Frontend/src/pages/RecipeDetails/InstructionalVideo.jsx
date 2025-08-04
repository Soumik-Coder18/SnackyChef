import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiMaximize, FiMinimize } from 'react-icons/fi';
import Loader from '../../components/Loader';

function InstructionalVideo({ youtubeUrl }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0`;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`my-10 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4 md:p-8' : 'relative'}`}
    >
      <div className={`${isFullscreen ? 'h-full' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5c2d1e] flex items-center gap-3">
            <span className="p-2 bg-[#fed7a5] text-white rounded-full">
              <FiYoutube className="text-white" />
            </span>
            Instructional Video
          </h2>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-[#FFD6A5] hover:bg-[#E07A5F] hover:text-white rounded-full transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>

        {!isLoaded && (
          <div className="relative pb-[56.25%] bg-[#FFD6A5]/20 rounded-lg overflow-hidden flex items-center justify-center">
            <Loader />
          </div>
        )}

        <div className={`relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl transition-all duration-300 ${isFullscreen ? 'h-full pb-0' : ''}`}>
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

        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="mt-4 px-4 py-2 bg-white text-[#5C2C1E] rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            Exit Fullscreen
          </button>
        )}
      </div>
    </motion.section>
  );
}

export default InstructionalVideo;