import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiUsers, FiExternalLink } from 'react-icons/fi';
import { FaRegClock, FaRegUser } from 'react-icons/fa';

function RecipeHeader({ meal }) {
  if (!meal) return null;

  // Calculate random cooking time (15-60 mins) and servings (2-6)
  const cookingTime = Math.floor(Math.random() * 45) + 15;
  const servings = Math.floor(Math.random() * 4) + 2;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#FFD6A5]/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Image */}
          <div className="relative h-64 sm:h-80 lg:h-full">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-[#FF7F50] hover:text-white transition-colors"
                onClick={() => console.log('Favorite clicked')}
              >
                <FiHeart className="w-5 h-5 text-[#E07A5F]" />
              </motion.button>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#FFD6A5]/30 text-[#5C2C1E] text-sm font-medium rounded-full">
                  {meal.strArea}
                </span>
                <span className="px-3 py-1 bg-[#FF7F50]/10 text-[#E07A5F] text-sm font-medium rounded-full">
                  {meal.strCategory}
                </span>
                {meal.strTags && meal.strTags.split(',').map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#FFF7ED] text-[#7B4B2A] text-sm font-medium rounded-full">
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#5c2d1e] mb-4">
                {meal.strMeal}
              </h1>

              <p className="text-[#7B4B2A] mb-6">
                {meal.strInstructions?.substring(0, 150)}...
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-[#5C2C1E]">
                  <FiClock className="mr-2 text-[#E07A5F]" />
                  <span>{cookingTime} mins</span>
                </div>
                <div className="flex items-center text-[#5C2C1E]">
                  <FiUsers className="mr-2 text-[#E07A5F]" />
                  <span>{servings} servings</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] text-white font-medium rounded-full hover:shadow-md transition-all flex items-center gap-2"
                >
                  <FiHeart className="w-5 h-5" />
                  Save Recipe
                </motion.button>

                {meal.strSource && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white border border-[#FFD6A5] text-[#5C2C1E] font-medium rounded-full hover:bg-[#FFF7ED] transition-colors flex items-center gap-2"
                  >
                    <FiExternalLink className="w-5 h-5" />
                    Original Recipe
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default RecipeHeader;