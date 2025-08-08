import Loader from '../../components/Loader';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function FeaturedRecipe({ meals }) {
  if (!meals || meals.length === 0) {
    return <Loader />;
  }

  const bestMeals = [...meals]
    .filter(meal => meal.strMeal && meal.strMealThumb && meal.idMeal)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="relative py-1 px-4 sm:px-6 lg:px-8  overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#FF7F50] mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-[#5C2C1E] mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex justify-between items-center mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#5c2d1e] mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E07A5F] to-[#5C2C1E]">
              Featured Recipes
            </span>
          </h2>
          <p className="text-lg text-[#7B4B2A] max-w-2xl">
            Chef-curated selections to ignite your culinary creativity
          </p>
        </div>
        <Link
          to="/recipe-world"
          className="inline-block px-4 py-2 bg-[#FF7F50] hover:bg-[#E07A5F] text-white rounded-full font-semibold transition"
        >
          World Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestMeals.map((meal, index) => (
          <Link
            key={meal.idMeal}
            to={`/recipe/${meal.idMeal}`}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative overflow-hidden h-64">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/90 text-[#5C2C1E] text-xs font-medium rounded-full backdrop-blur-sm">
                    {meal.strCategory}
                  </span>
                  <span className="px-3 py-1 bg-white/90 text-[#5C2C1E] text-xs font-medium rounded-full backdrop-blur-sm">
                    {meal.strArea}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{meal.strMeal}</h3>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center text-[#FF7F50] font-medium group-hover:text-[#E07A5F] transition-colors">
                  View Recipe
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs text-gray-400">30 min</span>
              </div>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <a 
          href="/view-all" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] text-white font-medium rounded-full hover:shadow-lg transition-all"
        >
          Explore All Recipes
          <FiArrowRight className="ml-2" />
        </a>
      </div>
    </section>
  );
}

export default FeaturedRecipe;