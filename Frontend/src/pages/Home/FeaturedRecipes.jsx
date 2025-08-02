import React from 'react';
import { FiClock, FiHeart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const featured = [
  {
    title: 'Creamy Garlic Chicken',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    time: '35 mins',
    rating: 4.8,
    tags: ['Dinner', 'Comfort Food']
  },
  {
    title: 'Beef Wellington',
    image: 'https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg',
    time: '2 hrs',
    rating: 4.9,
    tags: ['Special Occasion', 'Gourmet']
  },
  {
    title: 'Vegetarian Lasagna',
    image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    time: '45 mins',
    rating: 4.7,
    tags: ['Vegetarian', 'Family Meal']
  },
];

function FeaturedRecipes() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF7ED] via-[#FDE6D6] to-[#FFD6A5] py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with animated underline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block">
              Featured Recipes
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#E07A5F] opacity-40 rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-[#3E2A20] max-w-2xl mx-auto">
            Handpicked culinary delights — simple, flavorful, and inspiring meals to try today
          </p>
        </motion.div>

        {/* Recipe cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C2C1E]/80 to-transparent"></div>
                
                {/* Recipe tags */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {recipe.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-[#FFF7ED]/90 backdrop-blur-sm text-[#5C2C1E] text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recipe info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>
                
                {/* Meta info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center text-sm">
                      <FiClock className="mr-1" /> {recipe.time}
                    </span>
                    <span className="flex items-center text-sm">
                      <FiStar className="mr-1 text-amber-300" /> {recipe.rating}
                    </span>
                  </div>
                  
                  <button className="flex items-center px-4 py-2 rounded-full bg-[#E07A5F] hover:bg-[#D06A50] text-white font-medium transition">
                    <FiHeart className="mr-2" /> Save
                  </button>
                </div>
              </div>

              {/* View Recipe button (appears on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-[#5C2C1E]/80 opacity-0 transition-opacity duration-300"
              >
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white font-semibold shadow-lg">
                  View Full Recipe
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 rounded-full border-2 border-[#5C2C1E] text-[#5C2C1E] font-semibold hover:bg-[#5C2C1E] hover:text-white transition-colors">
            Explore All Recipes
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedRecipes;