import React from 'react';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiHeart, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#FFD6A5] to-[#FFF8F0] border-t-2 border-[#FFB085] shadow-inner overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#FF7F50" stroke="#FFF7ED" strokeWidth="2"/>
                <rect x="18" y="28" width="28" height="14" rx="3" fill="#FFF7ED" stroke="#FF7F50" strokeWidth="2"/>
                <rect x="24" y="20" width="16" height="4" rx="2" fill="#FFF7ED"/>
                <path d="M42 28L48 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 28L16 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h1 className="text-2xl font-bold tracking-tight font-['Poppins'] text-[#5C2C1E]">
                Snacky<span className="text-[#FF7F50]">Chef</span>
              </h1>
            </div>
            <p className="text-[#5C3D2E]">
              Your culinary companion for discovering and creating delicious recipes.
            </p>
            <div className="flex gap-4 text-[#5C2C1E]">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E07A5F] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E07A5F] transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E07A5F] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-[#5C2C1E] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#5C3D2E]">
              <li><a href="/" className="hover:text-[#E07A5F] transition-colors">Home</a></li>
              <li><a href="/recipes" className="hover:text-[#E07A5F] transition-colors">Recipes</a></li>
              <li><a href="/categories" className="hover:text-[#E07A5F] transition-colors">Categories</a></li>
              <li><a href="/about" className="hover:text-[#E07A5F] transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact - Updated to navigate to contact page */}
          <div>
            <h4 className="text-lg font-semibold text-[#5C2C1E] mb-4">Contact</h4>
            <ul className="space-y-2 text-[#5C3D2E]">
              <li className="flex items-center gap-2">
                <FiMail className="text-[#E07A5F]" />
                <a href="/contact" className="hover:text-[#E07A5F] transition-colors">
                  Contact Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>123 Culinary Street</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Foodville, FC 12345</span>
              </li>
            </ul>
          </div>

          {/* Account Actions */}
          <div>
            <h4 className="text-lg font-semibold text-[#5C2C1E] mb-4">Join SnackyChef</h4>
            <div className="space-y-3">
              <motion.a
                href="/signup"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#E07A5F] transition-colors"
              >
                <FiUserPlus className="text-[#E07A5F]" />
                Create an account
              </motion.a>
              <motion.a
                href="/login"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#E07A5F] transition-colors"
              >
                <FiLogIn className="text-[#E07A5F]" />
                Sign in to your account
              </motion.a>
            </div>
            <p className="mt-4 text-sm text-[#5C3D2E]">
              Join our community to save recipes, create meal plans, and more!
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FFD6A5] pt-6 flex flex-col md:flex-row justify-between items-center text-[#5C3D2E] text-sm">
          <div className="mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} SnackyChef. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-[#E07A5F] transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-[#E07A5F] transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-[#E07A5F] transition-colors">Cookies</a>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-1">
            Made with <FiHeart className="text-[#E07A5F]" /> in Foodville
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;