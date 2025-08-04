import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiShoppingBag, FiEdit2, FiDivide, FiX } from 'react-icons/fi';

function IngredientsList({ meal }) {
  const [ingredients, setIngredients] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [originalQuantities, setOriginalQuantities] = useState({});

  // Parse ingredients on component mount
  useEffect(() => {
    const parsedIngredients = [];
    const quantities = {};
    
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
    
    setIngredients(parsedIngredients);
    setOriginalQuantities(quantities);
  }, [meal]);

  // Update all quantities when scale factor changes
  useEffect(() => {
    if (scaleFactor !== 1) {
      setIngredients(prev =>
        prev.map(item => ({
          ...item,
          currentMeasure: scaleQuantity(item.originalMeasure, scaleFactor)
        }))
      );
    } else {
      setIngredients(prev =>
        prev.map(item => ({
          ...item,
          currentMeasure: item.originalMeasure
        }))
      );
    }
  }, [scaleFactor]);

  // Helper function to scale quantities
  const scaleQuantity = (measure, factor) => {
    if (!measure) return '';
    
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
    
    // Calculate new scale factor based on this change
    const originalQty = originalQuantities[id];
    const newQty = newMeasure;
    
    if (originalQty && newQty) {
      const originalValue = parseFloat(originalQty.match(/^\d*\.?\d+/)?.[0] || 1);
      const newValue = parseFloat(newQty.match(/^\d*\.?\d+/)?.[0] || 1);
      
      if (originalValue > 0) {
        setScaleFactor(newValue / originalValue);
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
            <div className="flex items-center gap-2 bg-[#FFF7ED] px-3 py-1 rounded-full">
              <button 
                onClick={() => setScaleFactor(0.5)}
                className={`px-2 ${scaleFactor === 0.5 ? 'text-[#E07A5F] font-bold' : 'text-[#7B4B2A]'}`}
              >
                ½
              </button>
              <button 
                onClick={() => setScaleFactor(1)}
                className={`px-2 ${scaleFactor === 1 ? 'text-[#E07A5F] font-bold' : 'text-[#7B4B2A]'}`}
              >
                1×
              </button>
              <button 
                onClick={() => setScaleFactor(2)}
                className={`px-2 ${scaleFactor === 2 ? 'text-[#E07A5F] font-bold' : 'text-[#7B4B2A]'}`}
              >
                2×
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

      {showShoppingList && shoppingList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-[#FFF7ED] border border-[#FFD6A5] rounded-xl p-4"
        >
          <h3 className="font-bold text-[#5C2C1E] mb-3">Shopping List ({shoppingList.length})</h3>
          <ul className="space-y-2">
            {shoppingList.map(item => (
              <li key={`shop-${item.id}`} className="flex items-center gap-2 text-[#7B4B2A]">
                <span className="w-5 h-5 rounded-full border border-[#FFD6A5] flex items-center justify-center">
                  <FiCheck className="text-[#E07A5F] text-xs" />
                </span>
                {item.currentMeasure} {item.name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ingredients.map((item) => (
          <motion.div
            key={item.id}
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
                    : 'border-[#FFD6A5]'
                }`}
              >
                {checkedItems[item.id] && <FiCheck className="text-white text-xs" />}
              </button>
              
              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={item.currentMeasure}
                      onChange={(e) => handleManualEdit(item.id, e.target.value)}
                      className="flex-1 min-w-0 px-2 py-1 border border-[#FFD6A5] rounded text-[#5C2C1E]"
                      autoFocus
                    />
                    <button 
                      onClick={() => setEditingId(null)}
                      className="p-1 text-[#E07A5F] hover:bg-[#FFD6A5]/30 rounded"
                    >
                      <FiX />
                    </button>
                  </div>
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
                onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                className="p-1 text-[#7B4B2A] hover:text-[#E07A5F]"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {ingredients.length === 0 && (
        <div className="text-center py-8 text-[#7B4B2A]">
          No ingredients listed for this recipe.
        </div>
      )}
    </section>
  );
}

export default IngredientsList;