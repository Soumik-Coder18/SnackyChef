import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filterByCategory, filterByArea, getMealById } from '../../api/mealdb';
import { getAllRecipes, getRecipeById as getUserRecipeById } from '../../api/axiosCreateRecipe';
import Card from '../../components/Card';

function SimilarRecipes() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFullMealDetails = async (meals) => {
      const detailed = await Promise.all(
        meals.map(async (meal) => {
          const fullData = await getMealById(meal.idMeal);
          return fullData?.meals?.[0] || null;
        })
      );
      return detailed.filter(Boolean);
    };

    const fetchSimilar = async () => {
      setIsLoading(true);
      try {
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
        if (isMongoId) {
          const userData = await getUserRecipeById(id);
          if (!userData) return;

          const current = userData;
          setRecipe(current);

          const allUserRecipesResponse = await getAllRecipes();
          console.log("All user recipes response:", allUserRecipesResponse);

          const allUserRecipes = Array.isArray(allUserRecipesResponse.data)
            ? allUserRecipesResponse.data
            : allUserRecipesResponse;

          const filtered = allUserRecipes.filter(r =>
            r._id !== id &&
            (
              !current.strCategory || !r.strCategory || r.strCategory === current.strCategory ||
              (!current.strArea || !r.strArea || r.strArea === current.strArea)
            )
          );

          console.log("Filtered similar user recipes:", filtered);
          setSimilarRecipes(filtered.slice(0, 6));
        } else {
          const data = await getMealById(id);
          if (!data?.meals?.length) return;

          const current = data.meals[0];
          setRecipe(current);

          let results = [];
          if (current.strCategory) {
            const categoryData = await filterByCategory(current.strCategory);
            results = [...results, ...(categoryData?.meals || [])];
          }
          if (current.strArea) {
            const areaData = await filterByArea(current.strArea);
            results = [...results, ...(areaData?.meals || [])];
          }

          const uniqueRecipes = results.filter((r, idx, self) =>
            r.idMeal !== id && idx === self.findIndex(x => x.idMeal === r.idMeal)
          );

          const detailedRecipes = await fetchFullMealDetails(uniqueRecipes.slice(0, 6));
          setSimilarRecipes(detailedRecipes);
        }
      } catch (error) {
        console.error("Error fetching similar recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchSimilar();
  }, [id]);

  if (isLoading) {
    return (
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-[#FFE8CC] rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#FFF7ED] rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!similarRecipes.length) {
    return (
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#FFD6A5] p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5C2C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#5C2C1E]">More Like This</h2>
        </div>
        <p className="text-[#7B4B2A]">No similar recipes found. Try adding more recipes!</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FFD6A5] p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5C2C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[#5C2C1E]">More Like This</h2>
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarRecipes.map(meal => (
            <div 
              key={meal.idMeal || meal._id} 
              className="h-full min-h-[320px] flex transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <Card meal={meal} />
            </div>
          ))}
        </div>
        
        {recipe && (
          <div className="mt-8 pt-6 border-t border-[#FFD6A5]">
            <p className="text-sm text-[#5C2C1E]/80">
              Showing recipes similar to <span className="font-semibold">{recipe.strMeal || recipe.name}</span> 
              {recipe.strCategory && ` in the ${recipe.strCategory} category`}
              {recipe.strArea && ` from ${recipe.strArea}`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SimilarRecipes;