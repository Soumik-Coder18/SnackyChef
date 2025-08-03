import React from 'react';
import Card from '../../components/Card';

function QuickRecipe({ meals, usedMealIds = [] }) {
  let quickMeals = meals.filter(meal =>
    !usedMealIds.includes(meal.idMeal) &&
    meal.strTags &&
    /(quick|easy|30min|under30|30-minute|less-than-30)/i.test(meal.strTags)
  );

  if (quickMeals.length === 0) {
    quickMeals = meals.slice(0, 6);
  } else {
    quickMeals = quickMeals.slice(0, 6);
  }
  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FFEFE5] rounded-full">
            <svg width="24" height="24" fill="none" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#5C2C1E]">Quick Recipe Ideas</h2>
        </div>
        <a href="/view-all" className="text-[#E07A5F] font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quickMeals.map(meal => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
}

export default QuickRecipe;