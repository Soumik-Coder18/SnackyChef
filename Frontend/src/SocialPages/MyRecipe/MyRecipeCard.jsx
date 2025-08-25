import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEdit2, FiTrash2, FiClock, FiUser, FiX } from 'react-icons/fi';
import { deleteRecipe } from '../../api/axiosCreateRecipe'; // Adjust the import path as needed

function MyRecipeCard({ recipe, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!recipe) return null;

  // Normalize backend fields
  const normalizedRecipe = {
    ...recipe,
    title: recipe.title || recipe.strMeal || 'Untitled Recipe',
    description: recipe.description || recipe.strInstructions || 'No description available',
    category: recipe.category || recipe.strCategory || 'Uncategorized',
    area: recipe.area || recipe.strArea || '',
    tags: Array.isArray(recipe.tags)
      ? recipe.tags
      : typeof recipe.tags === 'string'
      ? recipe.tags.split(',')
      : [],
    image: recipe.image || recipe.strMealThumb || '',
    prepTime: recipe.prepTime || recipe.strPrepTime || '',
    cookTime: recipe.cookTime || recipe.strCookTime || ''
  };

  const totalTime = (parseInt(normalizedRecipe.prepTime) || 0) + (parseInt(normalizedRecipe.cookTime) || 0);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setConfirmationText('');
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setConfirmationText('');
  };

  const handleConfirmDelete = async () => {
    if (confirmationText !== normalizedRecipe.title) {
      return;
    }

    setIsDeleting(true);
    try {
      const recipeId = recipe._id || normalizedRecipe._id || recipe.idMeal; // fallback for both MealDB & user recipes
      if (!recipeId) throw new Error("No valid recipe ID found for deletion.");

      await deleteRecipe(recipeId);
      if (onDelete) {
        onDelete(recipeId);
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.2 }
        }}
        className="group bg-[#FFF4E1] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100/50 hover:border-amber-200 w-full max-w-md mx-auto"
      >
        {/* Image Section */}
        {normalizedRecipe.image && (
          <div className="relative overflow-hidden h-56">
            <img
              src={normalizedRecipe.image}
              alt={normalizedRecipe.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            {normalizedRecipe.category && (
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500/80 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                  {normalizedRecipe.category}
                </span>
              </div>
            )}

            {/* Time Badge */}
            {totalTime > 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiClock className="w-3 h-3" />
                <span>{totalTime}min</span>
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
                {normalizedRecipe.title}
              </h3>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {normalizedRecipe.area && (
              <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span className="text-xs font-medium text-[#5C2C1E]">{normalizedRecipe.area}</span>
              </div>
            )}

            {normalizedRecipe.createdBy && normalizedRecipe.createdBy.username && (
              <div className="flex items-center gap-1.5 bg-[#FFD6A5] px-3 py-1 rounded-full">
                <FiUser className="w-3 h-3 text-[#5C2C1E]" />
                <span className="text-xs font-medium text-[#5C2C1E]">{normalizedRecipe.createdBy.username}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {normalizedRecipe.tags && normalizedRecipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {normalizedRecipe.tags.slice(0, 4).map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 text-[#5C2C1E] text-xs px-3 py-1.5 rounded-full border border-amber-200/50"
                >
                  #{tag.trim()}
                </motion.span>
              ))}
            </div>
          )}

          {/* Description */}
          {normalizedRecipe.description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
              {normalizedRecipe.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/recipe/${recipe._id}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FF7F50] hover:bg-[#E07A5F] text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FiEye className="w-4 h-4" />
                View
              </Link>
            </motion.div>

            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center gap-2 px-3 py-2.5 bg-red-50 text-red-600 text-sm font-medium rounded-xl hover:bg-red-100 transition-all duration-200 border border-red-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleCancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#5C2C1E]">Confirm Deletion</h3>
                <button
                  onClick={handleCancelDelete}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>

              <p className="text-sm text-gray-600 mb-2">
                Type <span className="font-bold">"{normalizedRecipe.title}"</span> to confirm:
              </p>

              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4"
                placeholder="Enter recipe title"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={confirmationText !== normalizedRecipe.title || isDeleting}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg transition-colors disabled:bg-red-300 disabled:cursor-not-allowed hover:bg-red-700"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Recipe'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MyRecipeCard;