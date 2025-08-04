// src/components/NutritionInfo.jsx
import React from 'react';

function NutritionInfo({ nutritionData }) {
  if (!nutritionData || nutritionData.length === 0) return null;

  return (
    <div className="bg-[#FFF7ED] rounded-2xl shadow-lg p-6 mt-8 border border-[#FFE8CC]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FFD6A5] p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5C2C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#5C2C1E]">Nutritional Information</h2>
      </div>
      
      <div className="space-y-4">
        {nutritionData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-[#FFE8CC] hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg text-[#5C2C1E] mb-3">{item.ingredient}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#FFF7ED] p-3 rounded-lg">
                <p className="text-xs text-[#5C2C1E]/70">Calories</p>
                <p className="font-medium text-[#5C2C1E]">{item.calories ?? 'N/A'}</p>
              </div>
              <div className="bg-[#FFF7ED] p-3 rounded-lg">
                <p className="text-xs text-[#5C2C1E]/70">Protein (g)</p>
                <p className="font-medium text-[#5C2C1E]">{item.protein ?? 'N/A'}</p>
              </div>
              <div className="bg-[#FFF7ED] p-3 rounded-lg">
                <p className="text-xs text-[#5C2C1E]/70">Fat (g)</p>
                <p className="font-medium text-[#5C2C1E]">{item.fat ?? 'N/A'}</p>
              </div>
              <div className="bg-[#FFF7ED] p-3 rounded-lg">
                <p className="text-xs text-[#5C2C1E]/70">Carbs (g)</p>
                <p className="font-medium text-[#5C2C1E]">{item.carbs ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center text-xs text-[#5C2C1E]/70">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Nutrients shown per 100g as estimated from Open Food Facts</span>
      </div>
    </div>
  );
}

export default NutritionInfo;