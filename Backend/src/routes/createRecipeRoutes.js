import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
  getMyRecipes
} from "../controllers/recipeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadRecipeImage } from "../middlewares/multerMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllRecipes);
router.get("/my-recipes", authMiddleware, getMyRecipes);
router.get("/:id", getRecipeById);

// Private routes
router.post("/create", authMiddleware, uploadRecipeImage.single("strMealThumb"), createRecipe);
router.put("/update/:id", authMiddleware, uploadRecipeImage.single("strMealThumb"), updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;