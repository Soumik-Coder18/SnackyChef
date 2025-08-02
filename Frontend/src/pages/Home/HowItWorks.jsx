import React from 'react';
import { motion } from 'framer-motion';
import { GiCook, GiNotebook, GiKnifeFork } from 'react-icons/gi';
import { FaLeaf, FaUtensils, FaShoppingBasket } from 'react-icons/fa';

const steps = [
  {
    icon: <FaShoppingBasket className="text-4xl" />,
    title: 'Choose Ingredients',
    description: 'Select what you have available and we’ll find perfect recipes for you.',
    color: 'from-[#FF9E5E] to-[#FFD6A5]'
  },
  {
    icon: <GiNotebook className="text-4xl" />,
    title: 'Get Recipes',
    description: 'Discover tailored recipes with step-by-step instructions and nutrition details.',
    color: 'from-[#E07A5F] to-[#FFB347]'
  },
  {
    icon: <FaUtensils className="text-4xl" />,
    title: 'Cook & Enjoy',
    description: 'Prepare delicious meals and share the joy of home cooking with loved ones.',
    color: 'from-[#FFD6A5] to-[#FFF3EA]'
  }
];

function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD0A5] py-24 px-6 md:px-12 overflow-hidden">
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
              How It Works
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-[#3E2A20] max-w-2xl mx-auto">
            Transform your ingredients into delicious meals in three simple steps
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl bg-[#FFF7ED]/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFE8D6]"
            >
              {/* Step number */}
              <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-[#E07A5F] text-white rounded-full font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className={`p-5 rounded-full bg-gradient-to-br ${step.color} text-white`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#5C2C1E] mb-3">{step.title}</h3>
                <p className="text-[#3E2A20]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;