import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen px-6 py-20 text-[#5C2C1E] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-14"
        >
          <div className="inline-flex items-center justify-center p-4 bg-[#FFEFE5] rounded-full shadow-sm mb-6">
            <FiBookOpen className="text-3xl text-[#E07A5F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="relative inline-block pb-2">
              Our Kitchen Story
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h1>
          <p className="text-xl text-[#7B341E] max-w-3xl mx-auto leading-relaxed">
            Where culinary passion meets digital innovation - creating a space that's as nourishing as it is delightful
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#FFF7ED] rounded-2xl p-8 md:p-12 mb-16 shadow-sm border border-[#FFD6A5]"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#5C2C1E]">
                <span className="border-b-2 border-[#E07A5F] pb-1">Our Recipe</span> for Success
              </h2>
              <p className="text-lg mb-6 text-[#5C3D2E]">
                Founded by food-loving friends, SnackyChef began as a small project to make cooking more accessible and has grown into a vibrant community.
              </p>
              <p className="mb-6 text-[#5C3D2E]">
                We believe cooking should be joyful, not intimidating. Our platform removes the stress from meal planning while keeping the creativity alive.
              </p>
              <div className="flex items-center gap-4 p-3 bg-[#FFEFE5] rounded-lg max-w-max">
                <span className="text-[#E07A5F] font-medium">Featured in "Best Cooking Apps 2025"</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10K+", label: "Recipes", icon: <FiBookOpen className="text-3xl" /> },
                { value: "Growing", label: "Community", icon: <FiUsers className="text-3xl" /> },
                { value: "100%", label: "Food Love", icon: <FiHeart className="text-3xl" /> },
                { value: "24/7", label: "Inspiration", icon: <FiBookOpen className="text-3xl" /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-[#FFEFE5] p-6 rounded-xl text-center"
                >
                  <div className="text-[#E07A5F] mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-[#5C3D2E]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-[#E07A5F] pb-1">Our Core</span> Ingredients
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiHeart className="text-3xl" />,
                title: "Made With Love",
                desc: "Every recipe crafted with genuine passion for food and community"
              },
              {
                icon: <FiUsers className="text-3xl" />,
                title: "Community First",
                desc: "Built together with home cooks who share our culinary vision"
              },
              {
                icon: <FiBookOpen className="text-3xl" />,
                title: "Practical Magic",
                desc: "Real solutions for real kitchens with what you have on hand"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-[#FFEFE5] p-8 rounded-xl border border-[#FFD6A5]"
              >
                <div className="text-[#E07A5F] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#5C2C1E]">{value.title}</h3>
                <p className="text-[#5C3D2E]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-[#FFF7ED] rounded-2xl p-8 md:p-12 border border-[#FFD6A5]">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
            <p className="text-xl text-[#7B341E] mb-8 max-w-2xl mx-auto">
              Join our community of food lovers and transform your kitchen adventures today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/signup')}
                className="px-8 py-3 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
              >
                Join SnackyChef
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/recipe')}
                className="px-8 py-3 border-2 border-[#5C2C1E] text-[#5C2C1E] rounded-full font-medium hover:bg-[#FFF7ED] transition"
              >
                Explore Recipes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;