import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ViewAll/ViewAllCard';

function FilterResult({ meals }) {
  if (!meals || meals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-4"
      >
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-[#FFD6A5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-[#E07A5F] mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-[#5C2C1E] mb-2">No recipes found</h3>
          <p className="text-[#7B4B2A]">
            Try adjusting your filters to discover more delicious recipes.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1A0F]">
          <span className="relative inline-block pb-2">
            Filtered Recipes
            <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] rounded-full"></span>
          </span>
        </h1>
        <p className="mt-4 text-lg text-[#7B4B2A]">
          Showing {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'} matching your criteria
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {meals.map((meal, index) => (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full flex"
          >
            <div className="w-full h-full flex">
              <Card meal={meal} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FilterResult;