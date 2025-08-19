import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from "../../api/axiosInstance";
import { motion } from 'framer-motion';
import { FiHeart, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function RecipeHeader({ meal }) {
  if (!meal || typeof meal !== 'object') {
    console.warn("RecipeHeader: meal prop must be an object", meal);
    return (
      <section className="px-4 py-10 text-center text-red-500">
        Recipe data not available.
      </section>
    );
  }

  const normalizedMeal = {
    ...meal,
    idMeal: String(meal.idMeal || meal._id || ''),
    strInstructions: meal.strInstructions || '',
    strTags:
      Array.isArray(meal.strTags)
        ? meal.strTags.join(',')
        : typeof meal.strTags === 'string'
        ? meal.strTags
        : ''
  };

  console.log("RecipeHeader normalizedMeal:", normalizedMeal);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  useEffect(() => {
    async function fetchFav() {
      console.log("Fetching favourites for meal:", normalizedMeal?.idMeal);
      if (!normalizedMeal?.idMeal) return;
      try {
        const res = await axiosInstance.get("/favourites");
        console.log("Fetched favourites:", res.data);
        if (res.data.success && Array.isArray(res.data.data)) {
          setIsFav(res.data.data.map(String).includes(normalizedMeal.idMeal));
        }
      } catch (error) {
        console.error("Failed to fetch favourites", error);
      }
    }
    fetchFav();
  }, [normalizedMeal]);

  const toggleFavourite = async () => {
    const recipeId = normalizedMeal?.idMeal;
    if (!recipeId) return console.warn("No recipe ID to toggle favourite");
    if (!user || !(user._id || user.id)) {
      navigate('/login');
      return;
    }
    setLoadingFav(true);
    try {
      if (isFav) {
        await axiosInstance.delete(`/favourites/${recipeId}`);
        setIsFav(false);
      } else {
        await axiosInstance.post("/favourites", { recipeId });
        setIsFav(true);
      }
    } catch (error) {
      console.error("Failed to toggle favourite", error);
    } finally {
      setLoadingFav(false);
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
              src={normalizedMeal.strMealThumb}
              alt={normalizedMeal.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-[#FF7F50] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={toggleFavourite}
                disabled={loadingFav}
                aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
              >
                <FiHeart className={`w-5 h-5 ${isFav ? 'text-red-500' : 'text-[#E07A5F]'}`} />
              </motion.button>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[#FFD6A5]/30 text-[#5C2C1E] text-sm font-medium rounded-full">
                  {normalizedMeal.strArea}
                </span>
                <span className="px-3 py-1 bg-[#FF7F50]/10 text-[#E07A5F] text-sm font-medium rounded-full">
                  {normalizedMeal.strCategory}
                </span>
                {normalizedMeal.strTags && normalizedMeal.strTags.split(',').map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#FFF7ED] text-[#7B4B2A] text-sm font-medium rounded-full">
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#5c2d1e] mb-4">
                {normalizedMeal.strMeal}
              </h1>

              <p className="text-[#7B4B2A] mb-6">
                {normalizedMeal.strInstructions?.substring(0, 150)}...
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
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={toggleFavourite}
                  disabled={loadingFav}
                  aria-pressed={isFav}
                >
                  <FiHeart className="w-5 h-5" />
                  {isFav ? "Unfavorite" : "Favorite"}
                </motion.button>

                {normalizedMeal.strSource && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={normalizedMeal.strSource}
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