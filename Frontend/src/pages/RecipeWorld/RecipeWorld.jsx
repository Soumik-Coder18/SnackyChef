import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import MapView from "./MapView";
import RecipeCard from "../../components/Card";
import { filterByArea } from "../../api/mealdb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiGlobe, FiClock, FiMeh } from "react-icons/fi";

const RecipeWorld = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleSelectArea = async (area) => {
    if (selectedArea === area) return; // Prevent duplicate requests
    
    setSelectedArea(area);
    setLoading(true);
    setError(null);
    setMeals([]);

    try {
      const data = await filterByArea(area);
      setMeals(data.meals || []);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Failed to load recipes. Please try again.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset error when selecting new area
  useEffect(() => {
    setError(null);
  }, [selectedArea]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-30">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full p-3 mb-4">
          <FiGlobe className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5c2c1e] mb-3">
          Flavour Journey
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover culinary treasures from around the world. Click on any country to explore its traditional recipes.
        </p>
      </div>

      {/* Interactive Map */}
      <div className="mb-12 rounded-xl overflow-hidden shadow-lg bg-white">
        <div className="relative h-96 w-full">
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-pulse text-gray-400">
                Loading world map...
              </div>
            </div>
          )}
          <MapView
            onSelectArea={handleSelectArea}
            selectedArea={selectedArea}
            onLoad={() => setIsMapLoaded(true)}
            className={`transition-opacity duration-500 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>

      {/* Recipes Section */}
      {selectedArea && (
        <div className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#5c2c1e] mb-2">
              {selectedArea} Cuisine
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
          </div>

          {/* State Indicators */}
          {loading && (
            <div className="flex flex-col items-center py-12">
              <Loader />
              <p className="text-gray-600">Discovering {selectedArea}'s culinary secrets...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-lg p-6 text-center max-w-2xl mx-auto">
              <FiMeh className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => handleSelectArea(selectedArea)}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Skeleton Loader */}
          {loading && !error && (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          )}

          {/* Empty State */}
          {!loading && meals.length === 0 && !error && (
            <div className="bg-gray-50 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <FiMeh className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No recipes found for {selectedArea}
              </h3>
              <p className="text-gray-600">
                We couldn't find any traditional recipes from this region in our database.
              </p>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && meals.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {meals.map((meal) => (
                  <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    onSelect={(m) => window.open(`/recipe/${m.idMeal}`, "_blank")}
                  />
                ))}
              </div>
              <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center">
                <FiClock className="mr-2" />
                Found {meals.length} traditional {meals.length === 1 ? "recipe" : "recipes"}
              </div>
            </>
          )}
        </div>
      )}

      {/* Call to Action */}
      {!selectedArea && (
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <span className="font-medium">Click on the map to begin your culinary journey</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeWorld;