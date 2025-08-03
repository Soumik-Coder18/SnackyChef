import React, { useEffect, useState } from 'react';
import { FiX, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  filterByIngredient,
  filterByCategory,
  filterByArea,
  listIngredients,
  listCategories,
  listAreas,
} from '../../../api/mealdb';

function Filter({ onApply }) {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState(null);

  useEffect(() => {
    listIngredients().then(res => setIngredients(res.meals || []));
    listCategories().then(res => setCategories(res.meals || []));
    listAreas().then(res => setAreas(res.meals || []));
  }, []);

  const applyFilters = async () => {
    let meals = [];
    let active = null;

    if (selectedIngredient) {
      const res = await filterByIngredient(selectedIngredient);
      meals = res.meals || [];
      active = 'ingredient';
    } else if (selectedCategory) {
      const res = await filterByCategory(selectedCategory);
      meals = res.meals || [];
      active = 'category';
    } else if (selectedArea) {
      const res = await filterByArea(selectedArea);
      meals = res.meals || [];
      active = 'area';
    }

    if (onApply) {
      onApply(meals, active);
    }
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedIngredient('');
    setSelectedCategory('');
    setSelectedArea('');
    setActiveFilterType(null);
    onApply([], null);
  };

  const hasActiveFilters = selectedIngredient || selectedCategory || selectedArea;

  return (
    <div className=" max-w-7xl mx-auto mb-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 mt-5">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-2 bg-[#FFD6A5] rounded-full cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#5C2C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#5C2C1E]">
            Recipes
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#5C2C1E] bg-[#FFD6A5] rounded-full hover:bg-[#E07A5F] hover:text-white transition-colors"
            >
              <FiX /> Clear
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              hasActiveFilters ? 'bg-[#E07A5F] text-white' : 'bg-[#FF7F50] text-white'
            }`}
          >
            <FiFilter /> Filter
          </motion.button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 mt-2 w-72 bg-white border border-[#FFD6A5] rounded-lg shadow-lg z-10 p-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Ingredient</label>
              <select
                onChange={(e) => setSelectedIngredient(e.target.value)}
                value={selectedIngredient}
                className="w-full p-2 border border-[#FFD6A5] rounded text-[#5C2C1E] focus:ring-2 focus:ring-[#FF7F50]"
              >
                <option value="">All Ingredients</option>
                {ingredients.map((i, idx) => (
                  <option key={idx} value={i.strIngredient}>{i.strIngredient}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Category</label>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                className="w-full p-2 border border-[#FFD6A5] rounded text-[#5C2C1E] focus:ring-2 focus:ring-[#FF7F50]"
              >
                <option value="">All Categories</option>
                {categories.map((c, idx) => (
                  <option key={idx} value={c.strCategory}>{c.strCategory}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Cuisine</label>
              <select
                onChange={(e) => setSelectedArea(e.target.value)}
                value={selectedArea}
                className="w-full p-2 border border-[#FFD6A5] rounded text-[#5C2C1E] focus:ring-2 focus:ring-[#FF7F50]"
              >
                <option value="">All Cuisines</option>
                {areas.map((a, idx) => (
                  <option key={idx} value={a.strArea}>{a.strArea}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-2 text-sm text-[#5C2C1E] border border-[#FFD6A5] rounded hover:bg-[#FFF7ED] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2 text-sm bg-[#FF7F50] text-white rounded hover:bg-[#E07A5F] transition-colors"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mt-2 flex-wrap"
        >
          {selectedIngredient && (
            <span className="px-3 py-1 bg-[#FFD6A5] text-[#5C2C1E] rounded-full text-sm flex items-center gap-1">
              Ingredient: {selectedIngredient}
              <button onClick={() => setSelectedIngredient('')} className="hover:text-[#E07A5F]">
                <FiX size={14} />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="px-3 py-1 bg-[#FFD6A5] text-[#5C2C1E] rounded-full text-sm flex items-center gap-1">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('')} className="hover:text-[#E07A5F]">
                <FiX size={14} />
              </button>
            </span>
          )}
          {selectedArea && (
            <span className="px-3 py-1 bg-[#FFD6A5] text-[#5C2C1E] rounded-full text-sm flex items-center gap-1">
              Cuisine: {selectedArea}
              <button onClick={() => setSelectedArea('')} className="hover:text-[#E07A5F]">
                <FiX size={14} />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Filter;