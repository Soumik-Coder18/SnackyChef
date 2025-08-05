import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiClock, FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_MEALDB_BASE_URL;

const fetchMealVideos = async () => {
  try {
    // Fetch meals from multiple categories to increase chance of YouTube links
    const categories = ['Seafood', 'Vegetarian', 'Chicken'];
    const responses = await Promise.all(
      categories.map(category => 
        fetch(`${BASE_URL}/filter.php?c=${category}`).then(res => res.json())
      )
    );
    
    // Flatten and get unique meals
    const allMeals = responses.flatMap(res => res.meals || []);
    const uniqueMeals = allMeals.filter((meal, index, self) =>
      index === self.findIndex(m => m.idMeal === meal.idMeal)
    );
    
    // Get details for the first 3 unique meals with YouTube links
    const detailedMeals = [];
    for (const meal of uniqueMeals.slice(0, 6)) {
      const mealData = await fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`).then(res => res.json());
      const mealDetails = mealData.meals[0];
      if (mealDetails.strYoutube) {
        const youtubeId = mealDetails.strYoutube.split('v=')[1]?.split('&')[0];
        detailedMeals.push({
          id: mealDetails.idMeal,
          title: mealDetails.strMeal,
          url: `https://www.youtube.com/embed/${youtubeId}`,
          duration: '10-15 mins',
          category: mealDetails.strCategory,
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        });
        if (detailedMeals.length >= 3) break;
      }
    }
    
    return detailedMeals;
  } catch (error) {
    console.error("Error fetching meal videos:", error);
    return [];
  }
};

function WatchAndLearn() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const mealVideos = await fetchMealVideos();
      setVideos(mealVideos);
      setLoading(false);
    };
    
    loadVideos();
  }, []);

  const handleVideoPlay = (index) => {
    if (playingVideo !== null && playingVideo !== index) {
      // Pause the currently playing video
      const iframe = videoRefs.current[playingVideo];
      if (iframe) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
    setPlayingVideo(index);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#FFF7ED] via-[#FDE6D6] to-[#FFD6A5] py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with animated underline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block pb-2">
              Watch & Learn
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-[#3E2A20] max-w-2xl mx-auto">
            Master cooking techniques with our curated video tutorials
          </p>
        </motion.div>

        {/* Video grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-[#FFF2E2]/60 rounded-2xl overflow-hidden shadow-lg h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-[#FFF2E2]/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFE8D6]"
              >
                {/* Video player */}
                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    ref={(el) => (videoRefs.current[index] = el)}
                    onPlay={() => handleVideoPlay(index)}
                    className="w-full h-full"
                    src={`${video.url}?enablejsapi=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Video info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-[#FFEFE5] text-[#E07A5F] text-xs font-medium rounded-full">
                      {video.category}
                    </span>
                    <span className="flex items-center text-sm text-[#5C3D2E]">
                      <FiClock className="mr-1" /> {video.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#5C2C1E] mb-2">{video.title}</h3>
                  <button className="flex items-center text-sm text-[#E07A5F] font-medium hover:text-[#D06A50] transition-colors">
                    <FiBookmark className="mr-2" /> Save for later
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/recipe"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white font-semibold hover:from-[#D06A50] hover:to-[#EE8E4E] transition-all shadow-lg hover:shadow-xl"
          >
            Browse All Tutorials
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default WatchAndLearn;