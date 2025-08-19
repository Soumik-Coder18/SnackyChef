import axiosInstance from '../../api/axiosInstance';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Lottie from 'lottie-react';
import signupAnimation from '../../assets/animations/Login.json';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axiosInstance.post('/login', formData);
        // console.log("Login response:", response.data); // Debugging line
        const accessToken = response?.data?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);

          // Fetch user profile and set user context
          try {
            const profileRes = await axiosInstance.get('/profile');
            setUser(profileRes.data.data);
            if (profileRes.data.data) {
              localStorage.setItem('userId', profileRes.data.data._id);
            }
          } catch (err) {
            setUser(null);
          }

          toast.success(response?.data?.message || 'Login successful!');
          navigate('/');
        } else {
          toast.error('Login failed: no token received');
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error);
        const res = error.response?.data;

        const message =
          res?.errors?.[0] ||
          res?.message ||
          error.message ||
          "Something went wrong. Please try again.";

        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please fix the highlighted errors.');
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen py-12 md:py-20 px-4 md:px-8 text-[#5C2C1E] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-16">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8"
        >
          <div className="text-center mb-6 mt-25">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="relative inline-block pb-1">
                Welcome Back
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
              </span>
            </h2>
            <p className="text-[#7B341E]">Continue your delicious journey with SnackyChef</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Email or Username Field */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium mb-1 text-[#5C2C1E]">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5C2C1E]/70">
                  <FiMail />
                </div>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="your@email.com or username"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#FFF7ED] border ${errors.identifier ? 'border-red-400' : 'border-[#FFD6A5]'} focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition`}
                />
              </div>
              {errors.identifier && <p className="mt-1 text-sm text-red-500">{errors.identifier}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#5C2C1E]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5C2C1E]/70">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg bg-[#FFF7ED] border ${errors.password ? 'border-red-400' : 'border-[#FFD6A5]'} focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5C2C1E]/70 hover:text-[#E07A5F]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full flex justify-center items-center gap-2 py-3 px-6 rounded-full font-medium text-white ${isSubmitting ? 'bg-[#E07A5F]/80' : 'bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E]'} shadow-md hover:shadow-lg transition`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                'Log In'
              )}
            </motion.button>

            <div className="text-center text-sm mt-4 text-[#5C2C1E]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#E07A5F] font-medium hover:underline">
                Sign up here
              </a>
            </div>
          </form>
        </motion.div>

        {/* Animation Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="p-4">
            <Lottie 
              animationData={signupAnimation} 
              loop={true} 
              className="w-full h-auto max-h-[480px]" 
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-3 text-[#5C2C1E]">Your Culinary Journey Awaits</h3>
              <ul className="space-y-2 text-[#7B341E]">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Access your saved recipes
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Continue meal planning
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Discover new cooking inspiration
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </section>
  );
};

export default Login;