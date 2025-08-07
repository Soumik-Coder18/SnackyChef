import express from "express";
import {
  signup,
  verifyEmail,
  login,
  logout,
  getProfile,
  updateProfile,
  updateCookiePreferences,
  acceptTerms
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, getProfile);
router.patch("/update-profile", authMiddleware, upload.single("avatar"), updateProfile);
router.patch("/cookie-preferences", authMiddleware, updateCookiePreferences);
router.post("/accept-terms", authMiddleware, acceptTerms);

export default router;