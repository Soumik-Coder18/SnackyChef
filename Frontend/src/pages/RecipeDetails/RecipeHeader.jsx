import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from "../../api/axiosInstance";
import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiUsers, FiExternalLink } from 'react-icons/fi';
import { FaRegClock, FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function RecipeHeader({ meal }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!meal) return null;

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // Fetch initial favorite status for this recipe
    async function fetchFav() {
      try {
        const res = await axiosInstance.get("/favourites");
        if (res.data.success && Array.isArray(res.data.data)) {
          setIsFav(res.data.data.includes(meal.idMeal));
        }
      } catch (error) {
        console.error("Failed to fetch favourites", error);
      }
    }
    if (meal?.idMeal) fetchFav();
  }, [meal]);

  const toggleFavourite = async () => {
    // console.log("User in toggleFavourite:", user);
    if (!user || !(user._id || user.id)) {
      navigate('/login');
      return;
    }
    try {
      if (isFav) {
        await axiosInstance.delete(`/favourites/${meal.idMeal}`);
        setIsFav(false);
      } else {
        await axiosInstance.post("/favourites", { recipeId: meal.idMeal });
        setIsFav(true);
      }
    } catch (error) {
      console.error("Failed to toggle favourite", error);
    }
  };
 

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
                onClick={toggleFavourite}
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

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 font-medium rounded-full hover:shadow-md transition-all flex items-center gap-2 ${
                    isFav
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] text-white"
                  }`}
                  onClick={toggleFavourite}
                >
                  <FiHeart className="w-5 h-5" />
                  {isFav ? "Unfavorite" : "Favorite"}
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