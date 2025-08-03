import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiBarChart2, FiCheckCircle, FiX, FiChevronDown } from 'react-icons/fi';

const CookiePolicy = () => {
  const [activeTab, setActiveTab] = useState('essential');
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  const cookieTypes = {
    essential: {
      icon: <FiCheckCircle className="text-2xl" />,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off.",
      examples: [
        "Authentication cookies to keep you logged in",
        "Security cookies to protect against attacks",
        "Load balancing cookies for performance"
      ],
      color: "bg-[#FFEFE5] text-[#E07A5F]"
    },
    analytics: {
      icon: <FiBarChart2 className="text-2xl" />,
      title: "Analytics Cookies",
      description: "These help us understand how visitors interact with our website by collecting anonymous information.",
      examples: [
        "Pages visited and time spent",
        "Click patterns and navigation flow",
        "Demographic information (anonymized)"
      ],
      color: "bg-[#F0F7E6] text-[#5C8D40]"
    },
    preference: {
      icon: <FiSettings className="text-2xl" />,
      title: "Preference Cookies",
      description: "These allow the website to remember choices you make for a more personalized experience.",
      examples: [
        "Language and region preferences",
        "Font size and display options",
        "Favorite recipe categories"
      ],
      color: "bg-[#F7F0E6] text-[#A67C52]"
    }
  };

  const handleConsent = (consentType) => {
    // In a real app, you would save these preferences
    console.log(`User consented to ${consentType} cookies`);
    setShowConsentBanner(false);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen py-12 px-4 md:px-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cookie Consent Banner */}
        <AnimatePresence>
          {showConsentBanner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-[#FFF3E8] shadow-lg border-t border-[#FFD6A5] p-4 z-50"
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[#5C2C1E]">
                    We use cookies to enhance your experience. By continuing, you agree to our use of cookies as described in our <a href="/full-policy" className="text-[#E07A5F] hover:underline">Cookie Policy</a>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleConsent('necessary')}
                    className="px-4 py-2 rounded-full bg-[#E07A5F] text-white hover:bg-[#D06A50] transition"
                  >
                    Accept Necessary
                  </button>
                  <button 
                    onClick={() => handleConsent('all')}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white hover:from-[#D06A50] hover:to-[#EE8E4E] transition"
                  >
                    Accept All
                  </button>
                  <button 
                    onClick={() => setShowConsentBanner(false)}
                    className="p-2 text-[#5C2C1E] hover:text-[#E07A5F] transition"
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8 mt-20"
        >
          <div className="p-3 bg-[#FFEFE5] rounded-full">
            <FiSettings className="text-3xl text-[#E07A5F]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#5C2C1E]">Cookie Settings</h1>
            <p className="text-[#3E2A20]">Manage your cookie preferences</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#FFD6A5] mb-8">
          {Object.keys(cookieTypes).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 font-medium text-[#5C2C1E] relative ${activeTab === key ? 'text-[#E07A5F]' : 'hover:text-[#E07A5F]/80'}`}
            >
              {cookieTypes[key].title}
              {activeTab === key && (
                <motion.div 
                  layoutId="cookieTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#E07A5F]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <div className={`p-6 rounded-xl ${cookieTypes[activeTab].color} bg-opacity-30 mb-6`}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FFF3E8] rounded-lg shadow-sm">
                {cookieTypes[activeTab].icon}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">{cookieTypes[activeTab].title}</h2>
                <p className="mb-4">{cookieTypes[activeTab].description}</p>
                <div className="bg-[#FFF1E5] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Examples:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {cookieTypes[activeTab].examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5]">
            <div>
              <h3 className="font-semibold text-[#5C2C1E]">Enable {cookieTypes[activeTab].title}</h3>
              <p className="text-sm text-[#3E2A20]">
                {activeTab === 'essential' ? 
                  "These cookies are always enabled" : 
                  "You can choose to enable or disable these cookies"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={activeTab === 'essential'} 
                disabled={activeTab === 'essential'}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E07A5F]"></div>
            </label>
          </div>
        </motion.div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#FFF3E8] p-6 rounded-xl shadow-sm border border-[#FFD6A5]"
          >
            <h2 className="text-xl font-bold text-[#5C2C1E] mb-4 flex items-center gap-2">
              <FiSettings className="text-[#E07A5F]" /> Managing Cookies
            </h2>
            <p className="mb-4 text-[#3E2A20]">
              You can control cookies through your browser settings. Here's how:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#E07A5F]"></div>
                <p className="text-[#3E2A20]">Chrome: Settings → Privacy and security → Cookies</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#E07A5F]"></div>
                <p className="text-[#3E2A20]">Firefox: Options → Privacy & Security → Cookies</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#E07A5F]"></div>
                <p className="text-[#3E2A20]">Safari: Preferences → Privacy → Cookies</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#FFF3E8] p-6 rounded-xl shadow-sm border border-[#FFD6A5]"
          >
            <h2 className="text-xl font-bold text-[#5C2C1E] mb-4 flex items-center gap-2">
              <FiChevronDown className="text-[#E07A5F]" /> Learn More
            </h2>
            <p className="mb-4 text-[#3E2A20]">
              For detailed information about our cookie practices, please see our full Cookie Policy.
            </p>
            <Link to="/full-policy" className="inline-block px-4 py-2 rounded-full bg-[#FFEFE5] text-[#E07A5F] hover:bg-[#FFD6A5] transition">
              View Full Policy
            </Link>
          </motion.div>
        </div>

        {/* Save Preferences */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl text-center"
        >
          <h3 className="text-xl font-semibold text-[#5C2C1E] mb-3">Ready to update your preferences?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white font-semibold hover:from-[#D06A50] hover:to-[#EE8E4E] transition-all shadow-md hover:shadow-lg">
              Save Preferences
            </button>
            <button className="px-6 py-3 rounded-full border border-[#E07A5F] text-[#E07A5F] font-semibold hover:bg-[#FFEFE5] transition">
              Reset to Default
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CookiePolicy;