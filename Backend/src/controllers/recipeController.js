import Recipe from "../models/recipeModel.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

/**
 * @desc    Create a new recipe
 * @route   POST /api/v1/recipes
 * @access  Private
 */
export const createRecipe = async (req, res, next) => {
  try {
    const {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      instructions,
      strMealThumb,
      strYoutube,
      strTags,
      ingredients
    } = req.body;

    if (
      !strMeal ||
      !strCategory ||
      !strArea ||
      !strInstructions ||
      !strMealThumb ||
      !ingredients?.length
    ) {
      return next(new apiError(400, "Please provide all required fields"));
    }

    const recipe = await Recipe.create({
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      instructions,
      strMealThumb,
      strYoutube,
      strTags,
      ingredients,
      createdBy: req.user.id
    });

    return res
      .status(201)
      .json(new apiResponse(201, recipe, "Recipe created successfully"));
  } catch (err) {
    next(new apiError(500, err.message || "Failed to create recipe"));
  }
};

/**
 * @desc    Get all recipes
 * @route   GET /api/v1/recipes
 * @access  Public
 */
export const getAllRecipes = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.userId) {
      query.createdBy = req.query.userId;
    }
    const recipes = await Recipe.find(query).populate("createdBy", "username name");
    return res
      .status(200)
      .json(new apiResponse(200, recipes, "Recipes fetched successfully"));
  } catch (err) {
    next(new apiError(500, err.message || "Failed to fetch recipes"));
  }
};

/**
 * @desc    Get single recipe by ID
 * @route   GET /api/v1/recipes/:id
 * @access  Public
 */
export const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "username name"
    );

    if (!recipe) {
      return next(new apiError(404, "Recipe not found"));
    }

    return res
      .status(200)
      .json(new apiResponse(200, recipe, "Recipe fetched successfully"));
  } catch (err) {
    next(new apiError(500, err.message || "Failed to fetch recipe"));
  }
};

/**
 * @desc    Delete a recipe
 * @route   DELETE /api/v1/recipes/:id
 * @access  Private
 */
export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return next(new apiError(404, "Recipe not found"));
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return next(new apiError(403, "You are not authorized to delete this recipe"));
    }

    await recipe.deleteOne();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Recipe deleted successfully"));
  } catch (err) {
    next(new apiError(500, err.message || "Failed to delete recipe"));
  }
};


/**
 * @desc    Update a recipe
 * @route   PUT /api/v1/recipes/:id
 * @access  Private
 */
export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return next(new apiError(404, "Recipe not found"));
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return next(new apiError(403, "You are not authorized to update this recipe"));
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      recipe[key] = updates[key];
    });

    await recipe.save();

    return res
      .status(200)
      .json(new apiResponse(200, recipe, "Recipe updated successfully"));
  } catch (err) {
    next(new apiError(500, err.message || "Failed to update recipe"));
  }
};