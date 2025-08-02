import React, { useState } from 'react';
import { FiSearch, FiClock, FiHeart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const IngredientSearch = () => {
  const [ingredient, setIngredient] = useState('');
  const popularIngredients = [
    { name: 'Tomato', emoji: '🍅', type: 'vegetable' },
    { name: 'Garlic', emoji: '🧄', type: 'vegetable' },
    { name: 'Chicken', emoji: '🍗', type: 'protein' },
    { name: 'Egg', emoji: '🥚', type: 'protein' },
    { name: 'Onion', emoji: '🧅', type: 'vegetable' },
    { name: 'Cheese', emoji: '🧀', type: 'dairy' }
  ];

  const handleSearch = () => {
    if (ingredient.trim()) {
      alert(`Searching for recipes with: ${ingredient}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#FFF7ED] via-[#FDE6D6] to-[#FFD6A5] py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with animated underline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block pb-2">
              Discover Recipes
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-[#3E2A20] max-w-2xl mx-auto">
            Transform your ingredients into culinary masterpieces
          </p>
        </motion.div>

        {/* Search card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-16 border border-[#FFE8D6]"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7B341E] text-xl" />
              <input
                type="text"
                placeholder="What ingredients do you have? (e.g. tomato, chicken)..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-5 py-3 rounded-full border-2 border-[#FFD6A5] focus:outline-none focus:ring-2 focus:ring-[#E07A5F] text-[#5C2C1E] placeholder-[#7B341E]/60 bg-[#FFF2E2]/70"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white font-semibold hover:from-[#D06A50] hover:to-[#EE8E4E] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Search Recipes
            </button>
          </div>

          {/* Popular ingredients */}
          <div className="text-center">
            <p className="text-sm font-medium text-[#5C2C1E]/80 mb-3">Popular ingredients:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularIngredients.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIngredient(item.name)}
                  className={`flex items-center px-4 py-2 rounded-full border text-[#5C2C1E] transition ${
                    item.type === 'vegetable' ? 'bg-[#FFF2E2] border-[#FFD6A5] hover:bg-[#FFE5CC]' :
                    item.type === 'protein' ? 'bg-[#FFE5E0] border-[#FFB8A5] hover:bg-[#FFD2C6]' :
                    'bg-[#F8EFD9] border-[#F0D6A1] hover:bg-[#FBEBCF]'
                  }`}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FiSearch className="text-3xl mb-4 text-[#E07A5F]" />,
              title: "Smart Matching",
              description: "Finds recipes using your exact ingredients",
              color: "bg-[#FFEFE5]"
            },
            {
              icon: <FiClock className="text-3xl mb-4 text-[#E07A5F]" />,
              title: "Quick Meals",
              description: "30-minute recipes for busy days",
              color: "bg-[#FFEFE5]"
            },
            {
              icon: <FiHeart className="text-3xl mb-4 text-[#E07A5F]" />,
              title: "Healthy Options",
              description: "Nutrition-balanced suggestions",
              color: "bg-[#FFEFE5]"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${feature.color} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#FFE8D6]`}
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-bold text-[#5C2C1E] mb-3">{feature.title}</h3>
                <p className="text-[#3E2A20]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientSearch;