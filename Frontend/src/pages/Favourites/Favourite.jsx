import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiBookmark, FiSearch, FiX, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import axiosInstance from "../../api/axiosInstance";
import { getMealById } from "../../api/mealdb";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const [filteredFavourites, setFilteredFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially assume logged in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/favourites");
        if (res.data.success && Array.isArray(res.data.data)) {
          const recipeIds = res.data.data;
          const recipePromises = recipeIds.map(async (id) => {
            try {
              // Try MealDB first
              const mealData = await getMealById(id);
              if (mealData?.meals?.[0]) {
                return { ...mealData.meals[0], source: 'mealdb' };
              } 
              // Fallback: try user-added recipe
              const userMealData = await axiosInstance.get(`/recipes/${id}`);
              if (userMealData?.data?.data) {
                return { ...userMealData.data.data, source: 'user' };
              }
              return null;
            } catch (err) {
              console.error(`Error fetching recipe ID ${id}:`, err);
              return null;
            }
          });

          const recipes = await Promise.all(recipePromises);
          const validRecipes = recipes.filter(Boolean);
          setFavourites(validRecipes);
          setFilteredFavourites(validRecipes);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsLoggedIn(false);
        } else {
          console.error("Failed to fetch favourites", error);
          setError("Failed to load your favorite recipes. Please try again later.");
        }
      }
      setIsLoading(false);
    };

    fetchFavourites();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFavourites(favourites);
    } else {
      const filtered = favourites.filter(meal => 
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (meal.strCategory && meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (meal.strArea && meal.strArea.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredFavourites(filtered);
    }
  }, [searchQuery, favourites]);

  const removeFromFavorites = (mealId, meal) => {
    // Optimistic UI update
    setFavourites(prev => prev.filter(m => (m.idMeal || m._id) !== mealId));
    setFilteredFavourites(prev => prev.filter(m => (m.idMeal || m._id) !== mealId));

    // Show undo toast
    const toastId = toast(
      <div className="flex items-center">
        <span className="mr-2">Recipe removed from favorites</span>
        <button
          onClick={() => {
            toast.dismiss(toastId);
            setFavourites(prev => [meal, ...prev]);
            setFilteredFavourites(prev => [meal, ...prev]);
          }}
          className="text-[#ff7f50] hover:text-amber-700 font-medium"
        >
          Undo
        </button>
      </div>,
      {
        autoClose: 5000,
        closeButton: false,
        position: "bottom-right",
        // className: "!bg-amber-50 !text-amber-900 !rounded-xl !shadow-lg",
        // bodyClassName: "!p-3",
        style: {
          backgroundColor: '#FFF7ED',
          color: '#5C2C1E',
          fontWeight: '600',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(224, 122, 95, 0.3)',
        },
      }
    );

    // Actually remove from backend after delay if not undone
    setTimeout(async () => {
      if (toast.isActive(toastId)) {
        try {
          await axiosInstance.delete(`/favourites/${mealId}`);
        } catch (error) {
          toast.error(
            <div className="flex items-center">
              <FiX className="mr-2" />
              <span>Failed to remove favorite</span>
            </div>,
            {
              // className: "!bg-red-50 !text-red-700 !rounded-xl !shadow-lg",
              // bodyClassName: "!p-3",
              style: {
                backgroundColor: '#E07A5F',
                color: '#FFF7ED',
                fontWeight: '600',
                borderRadius: '12px',
              },
            }
          );
          // Restore if API fails
          setFavourites(prev => [meal, ...prev]);
          setFilteredFavourites(prev => [meal, ...prev]);
        }
      }
    }, 5000);
  };

  if (!isLoggedIn) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-4 py-12 max-w-7xl mx-auto min-h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl inline-flex mb-6"
          >
            <FiHeart className="text-[#ff7f50] w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#a0522d] mb-4">
            Save Your Favorite Recipes
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Log in to access your saved recipes across all devices and never lose your culinary inspirations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-6 py-3 bg-[#ff7f50] text-white font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-lg"
          >
            <FiLogIn className="mr-2" />
            Sign In to View Favorites
          </motion.button>
          <p className="mt-4 text-gray-500">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/signup')}
              className="text-[#ff7f50] hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-12 max-w-7xl mx-auto min-h-screen"
    >
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16 mt-28">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-gradient-to-r from-amber-100 to-orange-100 p-5 rounded-2xl inline-flex mb-6"
        >
          <FiBookmark className="text-[#ff7f50] w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#a1512b] mb-3">
          Your Culinary Treasures
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          All your saved recipes in one place. Quickly find and cook your favorites.
        </p>
      </div>

      {/* Search and Stats Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your favorites..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-amber-50 px-4 py-2 rounded-xl">
            <span className="text-sm font-medium text-amber-800">
              {favourites.length} {favourites.length === 1 ? 'recipe' : 'recipes'} saved
            </span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-xl">
            <span className="text-sm font-medium text-green-800">
              {filteredFavourites.length} showing
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-80 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <FiX className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error loading favorites</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Try Again
          </button>
        </motion.div>
      ) : filteredFavourites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 text-center bg-amber-50 rounded-2xl"
        >
          <div className="p-5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6">
            <FiHeart className="text-[#ff7f50] text-4xl" />
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mb-3">
            {searchQuery ? 'No matching favorites' : 'Your favorites list is empty'}
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            {searchQuery
              ? 'Try a different search term'
              : 'Start saving recipes by clicking the heart icon on any recipe'}
          </p>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-[#ff7f50] text-white font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 bg-[#ff7f50] text-white font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm"
            >
              Explore Recipes
            </button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFavourites.map((meal) => {
              const mealKey = meal.idMeal || meal._id;
              return (
                <motion.div
                  key={mealKey}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group h-full min-h-[320px] flex"
                >
                  <Card meal={meal} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromFavorites(mealKey, meal)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 text-red-500 z-10 transition-all"
                    aria-label="Remove from favorites"
                  >
                    <FiHeart className="w-5 h-5 fill-current" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </motion.section>
  );
}

export default Favourite;