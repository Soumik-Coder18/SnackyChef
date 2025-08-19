

import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema({
  step: { type: String, required: true },
  timeValue: { type: Number },
  timeUnit: { type: String, enum: ["secs", "mins", "hrs"], default: "mins" }
});

const ingredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  measure: { type: String }
});

const recipeSchema = new mongoose.Schema(
  {
    strMeal: { type: String, required: true, index: true },
    strCategory: { type: String, required: true, index: true },
    strArea: { type: String, required: true, index: true },
    strInstructions: { type: String, required: true },
    instructions: [instructionSchema],
    strMealThumb: { type: String }, // optional, will store Cloudinary URL
    strYoutube: { type: String },
    strTags: [{ type: String, trim: true }], // array of tags
    ingredients: [ingredientSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;