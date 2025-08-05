import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiClock, FiBookmark } from 'react-icons/fi';
import Card from '../../components/Card';

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = () => {
      setIsLoading(true);
      const storedFavourites = JSON.parse(localStorage.getItem('Favourites')) || [];
      setFavourites(storedFavourites);
      setIsLoading(false);
    };

    fetchFavourites();

    // Listen for storage changes to sync across tabs
    window.addEventListener('storage', fetchFavourites);
    return () => window.removeEventListener('storage', fetchFavourites);
  }, []);

  const removeFromFavorites = (mealId) => {
    const updatedFavourites = favourites.filter(meal => meal.idMeal !== mealId);
    localStorage.setItem('Favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-28">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#5C2C1E] mb-2">Your Saved Recipes</h2>
          <p className="text-[#7B4B2A]">
            {favourites.length} {favourites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#FFF7ED] px-4 py-2 rounded-full">
          <FiBookmark className="text-[#E07A5F]" />
          <span className="text-sm font-medium text-[#5C2C1E]">Favorites</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-[#FFF7ED] rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      ) : favourites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 text-center mb-30 mt-30"
        >
          <div className="p-4 bg-[#FFF7ED] rounded-full mb-4">
            <FiHeart className="text-[#E07A5F] text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-[#5C2C1E] mb-2">No favorites yet</h3>
          <p className="text-[#7B4B2A] max-w-md">
            Save your favorite recipes by clicking the heart icon on any recipe card
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((meal) => (
              <motion.div
                key={meal.idMeal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Card meal={meal} />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromFavorites(meal.idMeal)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-100 text-red-500 z-10"
                  aria-label="Remove from favorites"
                >
                  <FiHeart className="fill-current" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.section>
  );
}

export default Favourite;