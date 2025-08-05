import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Lottie from 'lottie-react';
import signupAnimation from '../../assets/animations/Login.json';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        // Handle successful signup here
        console.log('Signup successful:', formData);
      }, 1500);
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
          <div className="text-center mb-2 mt-13">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="relative inline-block pb-1">
                Join SnackyChef
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
              </span>
            </h2>
            <p className="text-[#7B341E]">Create your account and start your culinary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-[#5C2C1E]">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5C2C1E]/70">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#FFF7ED] border ${errors.name ? 'border-red-400' : 'border-[#FFD6A5]'} focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition`}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#5C2C1E]">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5C2C1E]/70">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#FFF7ED] border ${errors.email ? 'border-red-400' : 'border-[#FFD6A5]'} focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
                  placeholder="At least 6 characters"
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

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 accent-[#E07A5F]"
              />
              <label htmlFor="acceptTerms" className="text-sm text-[#5C2C1E]">
                I agree to the <a href="/terms-of-service" className="text-[#E07A5F] underline">Terms of Service</a>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-sm text-red-500">{errors.acceptTerms}</p>}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.acceptTerms}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full flex justify-center items-center gap-2 py-3 px-6 rounded-full font-medium text-white ${
                isSubmitting || !formData.acceptTerms
                  ? 'bg-[#E07A5F]/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] hover:shadow-lg'
              } shadow-md transition`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Sign Up Now'
              )}
            </motion.button>

            <div className="text-center text-sm mt-4 text-[#5C2C1E]">
              Already have an account?{" "}
              <a href="/login" className="text-[#E07A5F] font-medium hover:underline">
                Log in here
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
              <h3 className="text-xl font-semibold mb-2 text-[#5C2C1E]">Why Join SnackyChef?</h3>
              <ul className="space-y-2 text-[#7B341E]">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Save your Favourite recipes
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Get personalized recommendations
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#E07A5F]">✓</span> Join our cooking community
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;