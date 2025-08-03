import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Card({ meal }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-[#FFD6A5]/30"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-lg font-bold text-white line-clamp-1">{meal.strMeal}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#FF7F50]/10 text-[#E07A5F] text-xs px-2.5 py-1 rounded-full">
              {meal.strCategory}
            </span>
            <span className="bg-[#FFD6A5]/30 text-[#5C2C1E] text-xs px-2.5 py-1 rounded-full">
              {meal.strArea}
            </span>
          </div>

          {meal.strTags && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {meal.strTags.split(',').slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="bg-[#FFD6A5]/50 text-[#5C2C1E] text-xs px-2 py-1 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {meal.strInstructions && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {meal.strInstructions}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="px-4 py-2 bg-[#FF7F50] text-white text-sm rounded-lg hover:bg-[#E07A5F] transition-colors flex items-center gap-1"
          >
            View Recipe
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <div className="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {Math.floor(Math.random() * 60) + 30} mins
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;