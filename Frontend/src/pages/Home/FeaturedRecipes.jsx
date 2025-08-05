import React, { useEffect, useState } from 'react';
import { searchByName } from '../../api/mealdb';
import Card from '../../components/Card'; // Import the Card component
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FeaturedRecipes() {
  const [featured, setFeatured] = useState([]);
  
  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await searchByName('chicken'); // example keyword
      if (res.meals) {
        const selected = res.meals.slice(0, 3); // Limit to only 3 meals
        setFeatured(selected);
      }
    };
    fetchFeatured();
  }, []);
  
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

        {/* Recipe cards using Card component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((meal) => (
            <Card key={meal.idMeal} meal={meal} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-center mt-16"
        >
          <Link
            to="/recipe"
            className="inline-block px-8 py-4 rounded-full border-2 border-[#5C2C1E] text-[#5C2C1E] font-semibold hover:bg-[#5C2C1E] hover:text-white transition-colors"
          >
            Explore All Recipes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedRecipes;