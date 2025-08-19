import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/createRecipeRoutes.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// Middleware to parse JSON and URL-encoded requests with increased limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
dbConnect();

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to SnackyChef API");
});


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);

// Central error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    success: false,
    errors: err.errors || [],
  });
});

export default app;
