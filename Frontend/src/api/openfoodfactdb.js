// src/api/openfoodfactdb.js

const BASE_URL = import.meta.env.VITE_OPENFOODFACTS_BASE_URL;

// Helper to normalize ingredient
const normalizeIngredient = (ingredient) => {
  return ingredient
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .split(' ')[0]; // use just the main keyword
};

export const fetchNutritionFromOFF = async (ingredientRaw) => {
  const query = normalizeIngredient(ingredientRaw);
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}.json`);
    const data = await res.json();

    if (data?.product?.nutriments) {
      const n = data.product.nutriments;
      return {
        ingredient: ingredientRaw,
        calories: n['energy-kcal_100g'] || 0,
        protein: n['proteins_100g'] || 0,
        fat: n['fat_100g'] || 0,
        carbs: n['carbohydrates_100g'] || 0,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch nutrition for ${ingredientRaw}`, error);
  }

  return {
    ingredient: ingredientRaw,
    calories: null,
    protein: null,
    fat: null,
    carbs: null,
  };
};