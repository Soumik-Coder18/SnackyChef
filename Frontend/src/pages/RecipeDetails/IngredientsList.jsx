import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiShoppingBag, FiEdit2, FiX, FiPlus, FiMinus } from 'react-icons/fi';

function IngredientsList({ meal }) {
  const [ingredients, setIngredients] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [originalQuantities, setOriginalQuantities] = useState({});
  const inputRef = useRef(null);

  // Parse ingredients on component mount
  useEffect(() => {
    if (!meal || typeof meal !== 'object') {
      console.warn("IngredientsList: meal prop must be an object", meal);
      setIngredients([]);
      setOriginalQuantities({});
      return;
    }

    const parsedIngredients = [];
    const quantities = {};

    if (meal.ingredients && Array.isArray(meal.ingredients) && meal.ingredients.length > 0) {
      // User-added recipe from backend
      meal.ingredients.forEach((ing, index) => {
        const id = `${index}-${ing.ingredient}`;
        parsedIngredients.push({
          id,
          name: ing.ingredient,
          originalMeasure: ing.measure || '',
          currentMeasure: ing.measure || ''
        });
        quantities[id] = ing.measure || '';
      });
    } else {
      // MealDB recipe
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
          const id = `${i}-${ingredient}`;
          parsedIngredients.push({
            id,
            name: ingredient,
            originalMeasure: measure || '',
            currentMeasure: measure || ''
          });
          quantities[id] = measure || '';
        }
      }
    }

    setIngredients(parsedIngredients);
    setOriginalQuantities(quantities);
  }, [meal]);

  // Focus input when editing
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  // Update all quantities when scale factor changes
  useEffect(() => {
    setIngredients(prev =>
      prev.map(item => ({
        ...item,
        currentMeasure: scaleQuantity(item.originalMeasure, scaleFactor)
      }))
    );
  }, [scaleFactor]);

  // Helper function to scale quantities
  const scaleQuantity = (measure, factor) => {
    if (!measure || factor === 1) return measure;
    
    // Extract numeric value and unit
    const match = measure.match(/^(\d*\.?\d+)\s*([^\d]*)$/);
    if (!match) return measure;
    
    const [, valueStr, unit] = match;
    const value = parseFloat(valueStr);
    const scaledValue = value * factor;
    
    // Round to 2 decimal places if needed
    const roundedValue = scaledValue % 1 === 0 ? scaledValue : parseFloat(scaledValue.toFixed(2));
    
    return `${roundedValue} ${unit}`.trim();
  };

  // Handle manual quantity edit
  const handleManualEdit = (id, newMeasure) => {
    setIngredients(prev => prev.map(item => 
      item.id === id ? { ...item, currentMeasure: newMeasure } : item
    ));
  };

  // Save edit and exit editing mode
  const saveEdit = (id) => {
    setEditingId(null);
    // Recalculate scale factor based on this change
    const editedItem = ingredients.find(item => item.id === id);
    if (editedItem) {
      const originalQty = originalQuantities[id];
      const newQty = editedItem.currentMeasure;
      
      if (originalQty && newQty) {
        const originalValue = parseFloat(originalQty.match(/^\d*\.?\d+/)?.[0] || 1);
        const newValue = parseFloat(newQty.match(/^\d*\.?\d+/)?.[0] || 1);
        
        if (originalValue > 0) {
          setScaleFactor(newValue / originalValue);
        }
      }
    }
  };

  // Toggle ingredient checked state
  const toggleIngredient = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get shopping list items
  const shoppingList = ingredients.filter(item => !checkedItems[item.id]);

  return (
    <section className="mt-8 mb-15">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5c2d1e] flex items-center gap-3">
            <span className="p-2 bg-[#FFD6A5] rounded-full">
              <FiShoppingBag className="text-[#5C2C1E]" />
            </span>
            Ingredients
          </h2>
          
          {ingredients.length > 0 && (
            <div className="flex items-center bg-[#FFF7ED] rounded-full overflow-hidden border border-[#FFD6A5]">
              <button 
                onClick={() => setScaleFactor(Math.max(0.25, scaleFactor - 0.25))}
                className="px-3 py-1 text-[#7B4B2A] hover:bg-[#FFD6A5]/30"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="px-2 text-sm font-medium text-[#5C2C1E]">
                {scaleFactor}x
              </span>
              <button 
                onClick={() => setScaleFactor(scaleFactor + 0.25)}
                className="px-3 py-1 text-[#7B4B2A] hover:bg-[#FFD6A5]/30"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
        
        {ingredients.length > 0 && (
          <button 
            onClick={() => setShowShoppingList(!showShoppingList)}
            className="text-sm font-medium text-[#E07A5F] hover:underline flex items-center gap-1"
          >
            {showShoppingList ? 'Hide' : 'Show'} Shopping List
            <span className="bg-[#FFD6A5] text-[#5C2C1E] text-xs px-2 py-0.5 rounded-full ml-1">
              {shoppingList.length}
            </span>
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {showShoppingList && shoppingList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-[#FFF7ED] border border-[#FFD6A5] rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#5C2C1E]">Shopping List ({shoppingList.length})</h3>
              <button 
                onClick={() => setCheckedItems({})}
                className="text-xs text-[#E07A5F] hover:underline"
              >
                Mark all complete
              </button>
            </div>
            <ul className="space-y-2">
              {shoppingList.map(item => (
                <motion.li 
                  key={`shop-${item.id}`}
                  layout
                  className="flex items-center gap-2 text-[#7B4B2A]"
                >
                  <button 
                    onClick={() => toggleIngredient(item.id)}
                    className="w-5 h-5 rounded-full border border-[#FFD6A5] flex items-center justify-center hover:bg-[#FFD6A5]/30"
                  >
                    <FiCheck className="text-[#E07A5F] text-xs" />
                  </button>
                  <span>
                    {item.currentMeasure} {item.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ingredients.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: ingredients.indexOf(item) * 0.03 }}
            whileHover={{ y: -2 }}
          >
            <div 
              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                checkedItems[item.id] 
                  ? 'bg-[#FFD6A5]/30 border border-[#FFD6A5]' 
                  : 'bg-white border border-[#FFD6A5]/50 hover:border-[#FFD6A5]'
              }`}
            >
              <button 
                onClick={() => toggleIngredient(item.id)}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${
                  checkedItems[item.id] 
                    ? 'bg-[#E07A5F] border-[#E07A5F]' 
                    : 'border-[#FFD6A5] hover:bg-[#FFD6A5]/30'
                }`}
                aria-label={checkedItems[item.id] ? 'Mark as needed' : 'Mark as complete'}
              >
                {checkedItems[item.id] && <FiCheck className="text-white text-xs" />}
              </button>
              
              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEdit(item.id);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={item.currentMeasure}
                      onChange={(e) => handleManualEdit(item.id, e.target.value)}
                      onBlur={() => saveEdit(item.id)}
                      className="flex-1 min-w-0 px-2 py-1 border border-[#FFD6A5] rounded text-[#5C2C1E] focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                    />
                    <button 
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="p-1 text-[#E07A5F] hover:bg-[#FFD6A5]/30 rounded"
                      aria-label="Cancel edit"
                    >
                      <FiX />
                    </button>
                  </form>
                ) : (
                  <div 
                    className={`font-medium ${
                      checkedItems[item.id] ? 'text-[#7B4B2A] line-through' : 'text-[#5C2C1E]'
                    }`}
                  >
                    {item.currentMeasure} {item.name}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  if (editingId === item.id) {
                    saveEdit(item.id);
                  } else {
                    setEditingId(item.id);
                  }
                }}
                className={`p-1 ${editingId === item.id ? 'text-[#E07A5F]' : 'text-[#7B4B2A] hover:text-[#E07A5F]'}`}
                aria-label={editingId === item.id ? 'Save changes' : 'Edit quantity'}
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {ingredients.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-[#7B4B2A]"
        >
          No ingredients listed for this recipe.
        </motion.div>
      )}
    </section>
  );
}

export default IngredientsList;