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
  subject: "Verify Your Email - SnackyChef",
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <!-- Header with Logo -->
      <div style="background-color: #FF7F50; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <svg 
            width="44" 
            height="44" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="30" fill="#FF7F50" stroke="#FFF7ED" stroke-width="2"/>
            <rect x="18" y="28" width="28" height="14" rx="3" fill="#FFF7ED" stroke="#FF7F50" stroke-width="2"/>
            <rect x="24" y="20" width="16" height="4" rx="2" fill="#FFF7ED"/>
            <path d="M42 28L48 22" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>
            <path d="M22 28L16 22" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 500;">
            <span style="font-weight: 700;">SnackyChef</span>
          </h1>
        </div>
      </div>
      
      <!-- Email Content -->
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #FFD6A5; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #5C2C1E; margin-top: 0; font-size: 20px; font-weight: 600;">
          Welcome to SnackyChef, ${username}!
        </h2>
        
        <p style="margin-bottom: 20px; font-size: 15px; line-height: 1.6;">
          We're excited to have you on board. To complete your registration, please verify your email address:
        </p>
        
        <!-- OTP Box -->
        <div style="background-color: #FFF7ED; border: 1px dashed #FFD6A5; 
                  border-radius: 6px; padding: 15px; text-align: center; 
                  margin: 25px 0; font-size: 28px; font-weight: 700; 
                  letter-spacing: 2px; color: #E07A5F;">
          ${otp}
        </div>
        
        <p style="margin-bottom: 25px; font-size: 14px; color: #7B4B2A;">
          This verification code will expire in <strong>5 minutes</strong>.
        </p>
        
        <div style="border-top: 1px solid #FFD6A5; padding-top: 20px; margin-top: 20px;">
          <p style="font-size: 13px; color: #999; margin-bottom: 5px;">
            If you didn't request this email, you can safely ignore it.
          </p>
          <p style="font-size: 13px; color: #999; margin: 0;">
            Ready to get started?<br>
            <strong>The SnackyChef Team</strong>
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding: 15px 0; margin-top: 20px;">
        <p style="font-size: 12px; color: #999; margin: 5px 0;">
          © ${new Date().getFullYear()} SnackyChef. All rights reserved.
        </p>
      </div>
    </div>
  `,
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

export const updateCookiePreferences = async (req, res) => {
  try {
    const { essential, analytics, preference } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        cookiePreferences: {
          essential,
          analytics,
          preference,
          consentTimestamp: new Date(),
          consentVersion: "1.0"
        },
      },
      { new: true }
    );

    res.status(200).json(
      new apiResponse(200, user.cookiePreferences, "Preferences updated")
    );
  } catch (err) {
    res.status(500).json(new apiError(500, "Failed to update preferences", err.message));
  }
};

// Accept Terms of Service controller
export const acceptTerms = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        termsAccepted: true,
        termsAcceptedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json(
      new apiResponse(200, {
        termsAccepted: user.termsAccepted,
        termsAcceptedAt: user.termsAcceptedAt,
      }, "Terms of Service accepted")
    );
  } catch (err) {
    res.status(500).json(new apiError(500, "Failed to accept terms", err.message));
  }
};
