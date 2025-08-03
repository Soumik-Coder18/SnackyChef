import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

function AllRecipes({ meals }) {
  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M4 3H20V5H4V3Z" fill="#E07A5F"/>
            <path d="M4 7H20V9H4V7Z" fill="#E07A5F"/>
            <path d="M4 11H20V13H4V11Z" fill="#E07A5F"/>
            <path d="M4 15H20V17H4V15Z" fill="#E07A5F"/>
            <path d="M4 19H20V21H4V19Z" fill="#E07A5F"/>
          </svg>
          <h2 className="text-3xl md:text-4xl font-bold text-[#5C2C1E]">All Recipes</h2>
        </div>
        <Link to="/view-all" className="text-[#E07A5F] font-medium hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.slice(0, 9).map((meal) => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
}

export default AllRecipes;