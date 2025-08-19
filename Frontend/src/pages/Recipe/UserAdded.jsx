import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../api/axiosCreateRecipe";
import Card from "../../components/Card";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const UserAdded = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRecipes()
      .then((res) => {
        console.log("API response:", res);
        // Normalize response to always be an array of recipes
        const recipesArray =
          res?.data?.data && Array.isArray(res.data.data)
            ? res.data.data
            : res?.data && Array.isArray(res.data)
            ? res.data
            : [];
        console.log("Normalized recipes:", recipesArray);
        setUserRecipes(recipesArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setUserRecipes([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="p-3 bg-[#FFEFE5] rounded-full shadow-sm"
          >
            <FaUtensils size={24} color="#E07A5F" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#5C2C1E]">User Added Recipes</h2>
        </div>
        <a href="/user-recipes" className="text-[#E07A5F] font-medium hover:underline">
          View All
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-[#FFEFE5] rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      ) : userRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-[#FFEFE5] rounded-full mb-4">
            <FaUtensils size={32} color="#E07A5F" />
          </div>
          <h3 className="text-xl font-medium text-[#5C2C1E] mb-2">No Recipes Added Yet</h3>
          <p className="text-[#7B4B2A]">
            Be the first to share your culinary creation!
          </p>
          <a
            href="/create-recipe"
            className="mt-6 inline-block bg-[#E07A5F] text-white px-4 py-2 rounded-lg shadow hover:bg-[#d0694e] transition"
          >
            Add Your First Recipe
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => {
              console.log("Recipe:", recipe);
              return (
                <motion.div
                  key={recipe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card meal={{ ...recipe, idMeal: recipe._id }} />
                  <p className="mt-2 text-[#7B4B2A] font-medium text-sm text-center">
                    {recipe.createdBy?.name || recipe.createdBy?.username || "Unknown"}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <a
              href="/create-recipe"
              className="inline-block bg-[#E07A5F] text-white px-4 py-2 rounded-lg shadow hover:bg-[#d0694e] transition"
            >
              Add Another Recipe
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default UserAdded;