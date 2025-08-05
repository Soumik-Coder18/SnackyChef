import React, { useState, useRef } from 'react';
import { FiUpload, FiPlus, FiTrash2, FiX, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function CreateRecipe() {
  const [formData, setFormData] = useState({
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    instructions: [{ step: '', timeValue: '', timeUnit: 'mins' }], // Changed to array of steps
    strMealThumb: '',
    strYoutube: '',
    strTags: '',
    ingredients: [{ ingredient: '', measure: '' }],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('link');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          strMealThumb: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const handleInstructionChange = (index, field, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = { ...updatedInstructions[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      instructions: updatedInstructions,
    }));
  };

  const addIngredient = () => {
    if (formData.ingredients.length < 20) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, { ingredient: '', measure: '' }],
      }));
    }
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { step: '', timeValue: '', timeUnit: 'mins' }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: updatedIngredients,
      }));
    }
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        instructions: updatedInstructions,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine steps into single instructions string
    const combinedInstructions = formData.instructions
      .map((inst, i) => {
        const timeText = inst.timeValue ? ` (Time: ${inst.timeValue} ${inst.timeUnit})` : '';
        return `Step ${i + 1}: ${inst.step}${timeText}`;
      })
      .join('\n\n');
  
    const finalData = {
      ...formData,
      strInstructions: combinedInstructions
    };
  
    console.log('Recipe Submitted:', finalData);
    // TODO: Send this to backend or local storage
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mt-23"
      >
        <div className="p-6 bg-[#FFF7ED] border-b border-[#FFD6A5]">
          <h1 className="text-3xl font-bold text-[#5C2C1E]">Create New Recipe</h1>
          <p className="text-[#7B4B2A] mt-2">Share your culinary masterpiece with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Recipe Name*</label>
              <input
                type="text"
                name="strMeal"
                value={formData.strMeal}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Category*</label>
              <input
                type="text"
                name="strCategory"
                value={formData.strCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Cuisine*</label>
              <input
                type="text"
                name="strArea"
                value={formData.strArea}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C2C1E] mb-1">Tags</label>
              <input
                type="text"
                name="strTags"
                value={formData.strTags}
                onChange={handleChange}
                placeholder="Comma separated (e.g. dessert,sweet)"
                className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[#5C2C1E] mb-3">Recipe Image*</label>
            <div className="flex gap-3 mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('link')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'link' ? 'bg-[#E07A5F] text-white' : 'bg-[#FFF7ED] text-[#5C2C1E]'}`}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'upload' ? 'bg-[#E07A5F] text-white' : 'bg-[#FFF7ED] text-[#52C1E]'}`}
              >
                Upload Image
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'link' ? (
                <motion.div
                  key="link"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  <input
                    type="url"
                    name="strMealThumb"
                    value={formData.strMealThumb}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full px-4 py-12 border-2 border-dashed border-[#FFD6A5] rounded-lg flex flex-col items-center justify-center hover:bg-[#FFF7ED] transition-colors"
                  >
                    <FiUpload className="text-[#E07A5F] text-2xl mb-2" />
                    <span className="text-[#5C2C1E]">Click to upload or drag and drop</span>
                    <span className="text-sm text-[#7B4B2A]">JPG, PNG up to 5MB</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {(imagePreview || formData.strMealThumb) && (
              <div className="mt-4 w-full max-w-xs">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-[#FFD6A5]">
                  <img
                    src={imagePreview || formData.strMealThumb}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, strMealThumb: '' }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-red-100 text-red-500"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-medium text-[#5C2C1E] mb-1">YouTube Video URL</label>
            <input
              type="url"
              name="strYoutube"
              value={formData.strYoutube}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
            />
          </div>

          {/* Instructions - Step by Step */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-[#5C2C1E]">Instructions*</label>
              <span className="text-sm text-[#7B4B2A]">
                {formData.instructions.length} steps
              </span>
            </div>

            <div className="space-y-4">
              {formData.instructions.map((instruction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FFF7ED]/50 p-4 rounded-lg border border-[#FFD6A5]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-[#5C2C1E]">Step {index + 1}</span>
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="text-[#7B4B2A] hover:text-red-500"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  <textarea
                    placeholder={`Describe step ${index + 1} in detail...`}
                    value={instruction.step}
                    onChange={(e) => handleInstructionChange(index, 'step', e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent mb-3"
                  />
                  
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#E07A5F]" />
                    <input
                      type="number"
                      min="0"
                      placeholder="Time"
                      value={instruction.timeValue || ''}
                      onChange={(e) => handleInstructionChange(index, 'timeValue', e.target.value)}
                      className="w-24 px-3 py-1 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                    />
                    <select
                      value={instruction.timeUnit || 'mins'}
                      onChange={(e) => handleInstructionChange(index, 'timeUnit', e.target.value)}
                      className="px-2 py-1 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                    >
                      <option value="secs">secs</option>
                      <option value="mins">mins</option>
                      <option value="hrs">hrs</option>
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={addInstruction}
              className="mt-4 flex items-center gap-2 text-[#E07A5F] hover:text-[#5C2C1E]"
            >
              <FiPlus size={18} />
              <span>Add Another Step</span>
            </button>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-[#5C2C1E]">Ingredients*</label>
              <span className="text-sm text-[#7B4B2A]">
                {formData.ingredients.length}/20 ingredients
              </span>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Ingredient"
                        value={item.ingredient}
                        onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={item.measure}
                        onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
                        className="w-full px-4 py-2 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                      />
                    </div>
                  </div>
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-[#7B4B2A] hover:text-red-500 mt-1"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {formData.ingredients.length < 20 && (
              <button
                type="button"
                onClick={addIngredient}
                className="mt-4 flex items-center gap-2 text-[#E07A5F] hover:text-[#5C2C1E]"
              >
                <FiPlus size={18} />
                <span>Add Another Ingredient</span>
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-[#FFD6A5]">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] text-white font-medium rounded-lg hover:shadow-md transition-all"
            >
              Publish Recipe
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateRecipe;