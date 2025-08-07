import { sendEmail } from "../config/mailer.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json(new apiError(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OTP.create({ user: user._id, otp, expiresAt });

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });

    res.status(201).json(new apiResponse(201, { userId: user._id }, "Signup successful, verify your email"));
  } catch (err) {
    res.status(500).json(new apiError(500, "Signup failed", err.message));
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const validOtp = await OTP.findOne({ user: userId, otp });
    if (!validOtp || validOtp.expiresAt < new Date()) {
      return res.status(400).json(new apiError(400, "OTP is invalid or expired"));
    }

    await User.findByIdAndUpdate(userId, { isVerified: true });
    await OTP.deleteMany({ user: userId });

    res.status(200).json(new apiResponse(200, null, "Email verified successfully"));
  } catch (err) {
    res.status(500).json(new apiError(500, "Verification failed", err.message));
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(new apiError(401, "Invalid credentials"));
    }

    if (!user.isVerified) {
      return res.status(403).json(new apiError(403, "Email not verified"));
    }

    // Generate access and refresh tokens using secrets and expiry from .env
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    // Set refresh token as HTTP-only cookie
    let refreshMaxAge = undefined;
    // Try to parse expiry as seconds and convert to ms, fallback to 7 days if parsing fails
    if (process.env.REFRESH_TOKEN_EXPIRY) {
      // If expiry is in format "7d", "30m", etc., default to 7 days (for safety)
      const parsed = parseInt(process.env.REFRESH_TOKEN_EXPIRY);
      if (!isNaN(parsed)) {
        refreshMaxAge = parsed * 1000;
      } else {
        // fallback: 7 days
        refreshMaxAge = 7 * 24 * 60 * 60 * 1000;
      }
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshMaxAge,
    });

    // Return the access token in the response body
    res.status(200).json(new apiResponse(200, { accessToken }, "Login successful"));
  } catch (err) {
    res.status(500).json(new apiError(500, "Login failed", err.message));
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json(new apiResponse(200, null, "Logged out successfully"));
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(
      new apiResponse(200, {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        isVerified: user.isVerified,
      }, "Profile fetched successfully")
    );
  } catch (err) {
    res.status(500).json(new apiError(500, "Failed to fetch profile", err.message));
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updateData = { name, phone };

    if (req.file?.path && req.file?.filename) {
      updateData.avatar = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json(
      new apiResponse(200, {
        id: updatedUser._id,
        username: updatedUser.username,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        isVerified: updatedUser.isVerified,
      }, "Profile updated")
    );
  } catch (err) {
    res.status(500).json(new apiError(500, "Update failed", err.message));
  }
};
