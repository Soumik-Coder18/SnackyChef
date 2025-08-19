import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById, filterByCategory } from '../../api/mealdb';
import { getRecipeById, getAllRecipes } from '../../api/axiosCreateRecipe';
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
    setLoading(true);

    const fetchMeal = async () => {
      try {
        console.log("Fetching recipe for ID:", id);
        let fetchedMeal = null;

        // Try MealDB API first
        const data = await getMealById(id);
        console.log("MealDB response:", data);

        if (data?.meals?.[0] && typeof data.meals[0] === 'object') {
          fetchedMeal = data.meals[0];
          console.log("Fetched MealDB meal:", fetchedMeal);

          // Fetch similar recipes
          const similarCategory = await filterByCategory(fetchedMeal.strCategory);
          setSimilar(similarCategory?.meals?.filter((m) => m.idMeal !== id).slice(0, 6) || []);

          // Prepare ingredients and nutrition
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = fetchedMeal[`strIngredient${i}`];
            const measure = fetchedMeal[`strMeasure${i}`];
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

          // Attach ingredients array to meal for easier checking
          fetchedMeal.ingredients = ingredients;

        } else {
          // Try user-added recipe from backend
          const userData = await getRecipeById(id);
          console.log("User-added recipe response:", userData);
          if (userData?.data && typeof userData.data === 'object') {
            fetchedMeal = userData.data;
            console.log("Fetched user-added meal:", fetchedMeal);
            // Attach ingredients array if available
            if (Array.isArray(fetchedMeal.ingredients)) {
              // no change needed
            } else {
              fetchedMeal.ingredients = [];
            }
            // 🔥 Fetch similar user-added recipes
            try {
              const allUserRecipes = await getAllRecipes();
              console.log("All user recipes:", allUserRecipes);

              const similarUser = allUserRecipes.data
                ?.filter(r => r._id !== fetchedMeal._id && r.strCategory === fetchedMeal.strCategory)
                .slice(0, 6);

              setSimilar(similarUser || []);
              console.log("Similar user-added recipes:", similarUser);
            } catch (err) {
              console.error("Error fetching similar user recipes:", err);
            }
          }
        }

        if (!fetchedMeal || typeof fetchedMeal !== 'object') {
          console.warn("No valid recipe object found for ID:", id);
          setMeal(null);
          return;
        }

        // Normalize meal
        const normalizedMeal = {
          ...fetchedMeal,
          idMeal: fetchedMeal.idMeal || fetchedMeal._id || null,
          strInstructions: fetchedMeal.strInstructions || '',
          strTags: Array.isArray(fetchedMeal.strTags)
            ? fetchedMeal.strTags.join(',')
            : typeof fetchedMeal.strTags === 'string'
            ? fetchedMeal.strTags
            : '',
          strMealThumb: fetchedMeal.strMealThumb || '/fallback-image.png',
          strYoutube: fetchedMeal.strYoutube || '',
          ingredients: fetchedMeal.ingredients || [],
        };

        console.log("Normalized meal:", normalizedMeal);
        setMeal(normalizedMeal);

      } catch (error) {
        console.error("Error fetching meal:", error);
        setMeal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <Loader />;
  if (!meal) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-2xl font-bold text-[#5C2C1E]">Recipe not found</div>
      <p className="text-[#7B4B2A] mt-2">The requested recipe could not be loaded</p>
    </div>
  );

  const availableTabs = [];
  if (meal?.ingredients?.length > 0) availableTabs.push('ingredients');
  if (meal?.strInstructions && meal.strInstructions.trim() !== '') availableTabs.push('instructions');
  if (nutritionData?.length > 0) availableTabs.push('nutrition');
  if (meal?.strYoutube && meal.strYoutube.trim() !== '') availableTabs.push('video');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      {/* Recipe Header */}
      <RecipeHeader meal={meal} />

      {/* Content Tabs */}
      <div className="border-b border-[#FFD6A5] mb-8">
        <nav className="-mb-px flex space-x-8">
          {availableTabs.map((tab) => (
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
        {activeTab === 'ingredients' && availableTabs.includes('ingredients') && <IngredientsList meal={meal} />}
        {activeTab === 'instructions' && availableTabs.includes('instructions') && <Instructions instructions={meal.strInstructions} />}
        {activeTab === 'nutrition' && availableTabs.includes('nutrition') && <NutritionInfo nutritionData={nutritionData} />}
        {activeTab === 'video' && availableTabs.includes('video') && <InstructionalVideo youtubeUrl={meal.strYoutube} />}
      </motion.div>

      {/* Similar Recipes */}
      {similar.length > 0 ? (
        <div className="mt-12 border-t border-[#FFD6A5] pt-12">
          <SimilarRecipes similarRecipes={similar} />
        </div>
      ) : (
        <div className="mt-12 text-center text-[#7B4B2A]">
          No similar recipes found
        </div>
      )}
    </div>
  );
}

export default MainRecipeDetails;