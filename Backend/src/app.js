import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// Connect to MongoDB
dbConnect();

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to SnackyChef API");
});


app.use("/api/v1/user", userRoutes);

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
