import React, { useEffect, useState } from 'react';
import { getMealById } from '../../../api/mealdb';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';

const ViewAllCard = ({ meal }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getMealById(meal.idMeal);
        if (res?.meals?.length > 0) {
          setDetails(res.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [meal.idMeal]);

  if (isLoading) {
    return (
      <div className="bg-[#FFF7ED] rounded-xl overflow-hidden shadow-md">
        <div className="animate-pulse">
          <div className="bg-[#FFD6A5] h-48 w-full"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-[#FFD6A5] rounded w-3/4"></div>
            <div className="h-4 bg-[#FFD6A5] rounded w-1/2"></div>
            <div className="h-12 bg-[#FFD6A5] rounded"></div>
            <div className="h-8 bg-[#FF7F50] rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const isNonVeg = ['Beef', 'Chicken', 'Lamb', 'Pork', 'Goat', 'Seafood', 'Egg'].includes(details.strCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#FFD6A5]/30"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={details.strMealThumb}
          alt={details.strMeal}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isNonVeg ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {isNonVeg ? 'Non-Veg' : 'Veg'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#2A1A0F]">{details.strMeal}</h3>
          <div className="flex items-center text-xs text-[#7B4B2A]">
            <FiClock className="mr-1" />
            {Math.floor(Math.random() * 45) + 15} min
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="bg-[#FF7F50]/10 text-[#E07A5F] text-xs px-2.5 py-1 rounded-full">
            {details.strCategory}
          </span>
          <span className="bg-[#FFD6A5]/30 text-[#5C2C1E] text-xs px-2.5 py-1 rounded-full">
            {details.strArea}
          </span>
        </div>

        <p className="text-sm text-[#7B4B2A] mb-4 line-clamp-3">
          {details.strInstructions?.substring(0, 150) || 'No description available.'}...
        </p>

        <Link
          to={`/recipes/${details.idMeal}`}
          className="inline-flex items-center text-[#FF7F50] font-medium hover:text-[#E07A5F] transition-colors group"
        >
          View Recipe
          <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ViewAllCard;