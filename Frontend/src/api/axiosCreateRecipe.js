

import axios from "axios";

const axiosRecipeInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/recipes`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRecipeInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create a new recipe
export const createRecipe = async (recipeData) => {
  const res = await axiosRecipeInstance.post("/create", recipeData);
  return res.data;
};

// Get all recipes
export const getAllRecipes = async () => {
  const res = await axiosRecipeInstance.get("/");
  return res.data;
};

// Get a single recipe by ID
export const getRecipeById = async (id) => {
  const res = await axiosRecipeInstance.get(`/${id}`);
  return res.data;
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  const res = await axiosRecipeInstance.delete(`/${id}`);
  return res.data;
};

export default {
  axiosRecipeInstance,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe
};