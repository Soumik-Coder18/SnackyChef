import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById, filterByCategory } from '../../api/mealdb';
import Loader from '../../components/Loader';
import NutritionInfo from './NutritionInfo';
import SimilarRecipes from './SimilarRecipes';
import RecipeHeader from './RecipeHeader';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';
import InstructionalVideo from './InstructionalVideo';
import { motion } from 'framer-motion';

function MainRecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on mount

  async function fetchMeal() {
    setLoading(true);
    try {
      const data = await getMealById(id);
      if (data?.meals?.[0]) {
        const meal = data.meals[0];
        setMeal(meal);

        const similarCategory = await filterByCategory(meal.strCategory);
        setSimilar(similarCategory?.meals?.filter((m) => m.idMeal !== id).slice(0, 6) || []);

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ing) ingredients.push({ ingredient: ing, measure });
        }

        const simulated = ingredients.map((item) => ({
          ingredient: item.ingredient,
          calories: Math.floor(Math.random() * 100 + 50),
          protein: Math.floor(Math.random() * 10 + 2),
          fat: Math.floor(Math.random() * 10 + 1),
          carbs: Math.floor(Math.random() * 15 + 5),
        }));
        setNutritionData(simulated);
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchMeal();
}, [id]);

  if (loading) return <Loader />;
  if (!meal) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-2xl font-bold text-[#5C2C1E]">Recipe not found</div>
      <p className="text-[#7B4B2A] mt-2">The requested recipe could not be loaded</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      {/* Recipe Header */}
      <RecipeHeader meal={meal} />

      {/* Content Tabs */}
      <div className="border-b border-[#FFD6A5] mb-8">
        <nav className="-mb-px flex space-x-8">
          {['ingredients', 'instructions', 'nutrition', 'video'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-[#E07A5F] text-[#5C2C1E]'
                  : 'border-transparent text-[#7B4B2A] hover:text-[#5C2C1E] hover:border-[#FFD6A5]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        {activeTab === 'ingredients' && <IngredientsList meal={meal} />}
        {activeTab === 'instructions' && <Instructions instructions={meal.strInstructions} />}
        {activeTab === 'nutrition' && <NutritionInfo nutritionData={nutritionData} />}
        {activeTab === 'video' && <InstructionalVideo youtubeUrl={meal.strYoutube} />}
      </motion.div>

      {/* Similar Recipes */}
      {similar.length > 0 && (
        <div className="mt-12 border-t border-[#FFD6A5] pt-12">
          <SimilarRecipes similarRecipes={similar} />
        </div>
      )}
    </div>
  );
}

export default MainRecipeDetails;