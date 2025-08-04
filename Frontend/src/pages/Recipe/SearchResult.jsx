import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMeh } from 'react-icons/fi';
import { searchByName, filterByIngredient } from '../../api/mealdb';
import Card from '../../components/Card';
import Pagination from './RecipeComponent/Pagination';
import Loader from '../../components/Loader';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () => {
  const query = useQuery();
  const keyword = query.get('q');
  const type = query.get('type'); // 'name' or 'ingredient'

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = type === 'ingredient'
          ? await filterByIngredient(keyword)
          : await searchByName(keyword);
        setResults(res.meals || []);
        setCurrentPage(1); // reset page after results load
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchResults();
    }
  }, [keyword, type]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="w-full mx-auto px-12 sm:px-16 lg:px-24 py-20 bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#5c2d1e] mb-3 mt-20">
          {type === 'ingredient' ? 'Recipes with' : 'Search Results for'} 
          <span className="text-[#E07A5F]"> "{keyword}"</span>
        </h1>
        <div className="flex items-center text-[#7B4B2A]">
          <FiSearch className="mr-2" />
          <p>{results.length} {results.length === 1 ? 'result' : 'results'} found</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : results.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-[#FFD6A5]">
            <FiMeh className="h-12 w-12 mx-auto text-[#E07A5F] mb-4" />
            <h3 className="text-xl font-medium text-[#5C2C1E] mb-2">No results found</h3>
            <p className="text-[#7B4B2A]">
              Try different search terms or browse our recipe collection
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            <AnimatePresence>
              {currentItems.map((meal, index) => (
                <motion.div
                  key={meal.idMeal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full flex"
                >
                  <Card meal={meal} className="flex-grow h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;