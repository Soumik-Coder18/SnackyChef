import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiHeart, FiClock, FiShoppingBag } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Discover Recipes",
      description: "Explore thousands of curated recipes from around the world with our smart filters.",
      color: "from-[#FF7F50] to-[#FF9E5E]"
    },
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Search by Ingredients",
      description: "Find perfect recipes based on what you already have in your kitchen.",
      color: "from-[#E07A5F] to-[#D4A373]"
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "View Details",
      description: "Get complete instructions, ingredients, and preparation times for each recipe.",
      color: "from-[#5C2C1E] to-[#7B4B2A]"
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Save Favorites",
      description: "Create collections of your favorite recipes for easy access anytime.",
      color: "from-[#D4A373] to-[#FFD6A5]"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Cook with Ease",
      description: "Follow our step-by-step guides with timers and visual instructions.",
      color: "from-[#7B4B2A] to-[#5C2C1E]"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFF9F2] to-[#FFEFE5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A1A0F] mb-4">
            <span className="relative inline-block">
              How SnackyChef Works
              <div className='mt-2'></div>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg text-[#7B4B2A] max-w-3xl mx-auto">
            Your culinary journey made simple in just 5 easy steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0"></div>
              
              <div className="relative z-10 h-full bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#FFD6A5]/30">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 text-white`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2A1A0F] mb-3">{step.title}</h3>
                <p className="text-[#7B4B2A]">{step.description}</p>
                <div className="absolute -top-4 -left-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#FF7F50] text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex justify-center mt-12 mb-20">
          <div className="relative w-full max-w-4xl h-1 bg-[#FFD6A5]">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/4 w-4 h-4 transform -translate-x-2 -translate-y-2 rounded-full bg-[#E07A5F]"
                style={{ left: `${(i + 1) * 20}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;