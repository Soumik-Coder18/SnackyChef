import React, { useEffect, useState } from 'react';
import { getMealById } from '../../../api/mealdb';
import ViewAllCard from './ViewAllCard';
import Pagination from '../RecipeComponent/Pagination';
import Loader from '../../../components/Loader';
import { motion } from 'framer-motion';

const TOTAL_MEALS = 100;
const ITEMS_PER_PAGE = 12;

const ViewAllRecipe = () => {
  const [mealIds, setMealIds] = useState([]);
  const [currentMeals, setCurrentMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(TOTAL_MEALS / ITEMS_PER_PAGE);

  useEffect(() => {
    const ids = Array.from({ length: TOTAL_MEALS }, (_, i) => 52772 + i);
    setMealIds(ids);
  }, []);

  useEffect(() => {
    const fetchCurrentMeals = async () => {
      setLoading(true);
      const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
      const currentIds = mealIds.slice(startIdx, startIdx + ITEMS_PER_PAGE);

      try {
        const mealPromises = currentIds.map(id => getMealById(id));
        const mealResponses = await Promise.all(mealPromises);
        const meals = mealResponses
          .map(res => res.meals && res.meals[0])
          .filter(Boolean);

        setCurrentMeals(meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mealIds.length) {
      fetchCurrentMeals();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, mealIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F2] to-[#FFEFE5]">
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 mt-15"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5c2d1e] mb-4">
            <span className="relative inline-block pb-2">
              Explore All Recipes
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg text-[#7B4B2A]">
            Browse our complete collection of {TOTAL_MEALS}+ delicious recipes
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {currentMeals.map((meal, index) => (
                <motion.div
                  key={meal.idMeal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full flex"
                >
                  <ViewAllCard meal={meal} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          </>
        )}
      </section>

      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FFD6A5]/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#E07A5F]/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default ViewAllRecipe;