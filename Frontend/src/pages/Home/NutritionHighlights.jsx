import React from 'react';
import { motion } from 'framer-motion';
import { GiFruitBowl, GiMeat, GiWheat } from 'react-icons/gi';

const NutritionHighlights = () => {
  const highlights = [
    {
      icon: <GiFruitBowl className="text-4xl" />,
      label: 'High Fiber',
      description: 'Great for digestion and gut health',
      color: 'from-[#FF9E5E] to-[#FFD6A5]'
    },
    {
      icon: <GiMeat className="text-4xl" />,
      label: 'High Protein',
      description: 'Supports muscle growth and repair',
      color: 'from-[#E07A5F] to-[#FFB347]'
    },
    {
      icon: <GiWheat className="text-4xl" />,
      label: 'Whole Grains',
      description: 'Sustained energy and fullness',
      color: 'from-[#FFD6A5] to-[#FFF3EA]'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD0A5] py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#E07A5F] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#FF9E5E] opacity-5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block pb-2">
              Nutritional Benefits
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-[#3E2A20] max-w-2xl mx-auto">
            Discover how our recipes contribute to your wellbeing
          </p>
        </motion.div>

        {/* Nutrition cards with gradient accents */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-[#FFF2E2]/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFE8D6]"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
              
              {/* Content */}
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${item.color} text-[#FFF8F0]`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#5C2C1E] mb-3">{item.label}</h3>
                <p className="text-[#3E2A20]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nutrition disclaimer with subtle animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-[#FFF2E2]/90 backdrop-blur-sm border border-[#FFE8D6] rounded-2xl p-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-[#5C2C1E]">
            <span className="font-medium">Note:</span> Nutritional values are estimates based on standard ingredients. Actual values may vary based on specific preparation methods and ingredient brands.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionHighlights;