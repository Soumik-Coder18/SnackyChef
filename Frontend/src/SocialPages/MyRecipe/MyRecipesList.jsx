import React, { useEffect, useState } from "react";
import { getMyRecipes } from "../../api/axiosCreateRecipe";
import MyRecipeCard from "./MyRecipeCard";
import Loader from "../../components/Loader";

const MyRecipesList = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const res = await getMyRecipes();
      setMyRecipes(res.data);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
      setError("Failed to load your recipes. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRefresh = () => {
    fetchRecipes(true);
  };

  const handleCreateRecipe = () => {
    window.location.href = "/create-recipe";
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full p-6 bg-[#FFF4E1] rounded-xl shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#5C2C1E] mb-2">Oops! Something went wrong</h3>
            <p className="text-[#5C2C1E] mb-6">{error}</p>
            <div className="flex space-x-4">
              <button 
                onClick={handleRefresh}
                className="px-5 py-2.5 bg-[#FF7F50] text-white rounded-lg hover:bg-[#E07A5F] transition-colors shadow-md flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = "/"}
                className="px-5 py-2.5 border border-[#5C2C1E] text-[#5C2C1E] rounded-lg hover:bg-[#FFF4E1] transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-35 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#5C2C1E]">My Recipes</h1>
            <p className="text-[#5C2C1E] mt-2">Manage and view all your culinary creations</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center px-4 py-2 rounded-lg ${refreshing ? 'bg-gray-200 text-gray-500' : 'bg-[#FFF4E1] text-[#5C2C1E] hover:bg-[#FFF0D9] border border-[#FFDAB3]'} transition-colors shadow-sm`}
            >
              <svg className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button 
              onClick={handleCreateRecipe}
              className="flex items-center px-4 py-2.5 bg-[#FF7F50] text-white rounded-lg hover:bg-[#E07A5F] transition-colors shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              New Recipe
            </button>
          </div>
        </div>
        
        <div className="bg-[#FFF4E1] rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm font-medium text-[#5C2C1E]">
              {myRecipes.length} {myRecipes.length === 1 ? 'recipe' : 'recipes'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-[#5C2C1E]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {myRecipes.length === 0 ? (
          <div className="bg-[#FFF4E1] rounded-xl shadow-md overflow-hidden">
            <div className="text-center py-16 px-4">
              <div className="w-24 h-24 bg-[#FF7F50] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#5C2C1E] mb-3">No recipes yet</h3>
              <p className="text-[#5C2C1E] max-w-md mx-auto mb-8">
                Start your culinary journey by creating your first recipe! Share your favorite dishes with the world.
              </p>
              <button 
                onClick={handleCreateRecipe}
                className="px-8 py-3 bg-[#FF7F50] text-white rounded-lg hover:bg-[#E07A5F] transition-colors shadow-md font-medium"
              >
                Create Your First Recipe
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myRecipes.map(recipe => (
                <div key={recipe._id} className="flex justify-center w-full">
                  <MyRecipeCard 
                    recipe={recipe} 
                    onDelete={(deletedId) => setMyRecipes(prev => prev.filter(r => r._id !== deletedId))}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-[#5C2C1E] text-sm">
                Can't find a recipe? Try refreshing the list or create a new one.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRecipesList;