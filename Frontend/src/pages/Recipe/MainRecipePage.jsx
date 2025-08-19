import React, { useState, useEffect } from 'react';
import { searchByName } from '../../api/mealdb';
import Filter from './RecipeComponent/Filter';
import Pagination from './RecipeComponent/Pagination';
import FeaturedRecipe from './FeaturedRecipe';
import AllRecipes from './AllRecipes';
import QuickRecipe from './QuickRecipe';
import FilterResult from './RecipeComponent/FilterResult';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader';
import { getAllRecipes } from '../../api/axiosCreateRecipe';
import Card from '../../components/Card';
import UserAdded from './UserAdded';

function MainRecipePage() {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const mealsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchByName('');
        if (data.meals) setAllMeals(data.meals);
        const userData = await getAllRecipes();
        if (userData?.data) setUserRecipes(userData.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterApply = (meals, activeFilter) => {
    setFilteredMeals(meals);
    setIsFilterActive(!!activeFilter);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = allMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-30 lg:px-8 py-10 md:py-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5c2c1e] mb-6"
          >
            <span className="relative inline-block">
              Discover Culinary Delights
              <div className='mt-3'></div>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] rounded-full"></span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[#7B4B2A] max-w-3xl mx-auto"
          >
            Explore our collection of delicious recipes from around the world
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Filter onApply={handleFilterApply} />
        </motion.div>

        {isFilterActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <FilterResult meals={filteredMeals} />
          </motion.div>
        ) : (
          <div className="space-y-20 mt-12">
            <FeaturedRecipe meals={currentMeals} />
            <AllRecipes meals={currentMeals} />
            <QuickRecipe meals={currentMeals} />
            
            <UserAdded />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(allMeals.length / mealsPerPage)}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FFD6A5]/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#E07A5F]/10 blur-3xl"></div>
      </div>
    </div>
  );
}

export default MainRecipePage;