import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiUser, FiLock, FiExternalLink, FiChevronDown, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [readSections, setReadSections] = useState([]);

  const markSectionAsRead = (id) => {
    if (!readSections.includes(id)) {
      setReadSections([...readSections, id]);
    }
  };

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
    markSectionAsRead(id);
  };

  const sections = [
    {
      id: 'use',
      icon: <FiBook className="text-2xl" />,
      title: "Use of Site",
      content: (
        <>
          <p className="mb-4">SnackyChef provides users with cooking inspiration, recipe discovery, and nutrition information. You may use the site for:</p>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Personal, non-commercial purposes</li>
            <li>Recipe discovery and meal planning</li>
            <li>Educational cooking resources</li>
          </ul>
          <p>Commercial use requires written permission from SnackyChef.</p>
        </>
      ),
      color: "bg-[#FFF7ED]",
      hoverColor: "hover:bg-[#FBE7C6]"
    },
    {
      id: 'conduct',
      icon: <FiUser className="text-2xl" />,
      title: "User Conduct",
      content: (
        <>
          <p className="mb-4">While using SnackyChef, you agree not to:</p>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Post inappropriate or offensive content</li>
            <li>Attempt unauthorized access to our systems</li>
            <li>Use automated scraping tools</li>
            <li>Violate any applicable laws</li>
          </ul>
          <div className="bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5]">
            <p className="flex items-start gap-2 text-[#5C2C1E]">
              <FiAlertTriangle className="mt-1 flex-shrink-0 text-[#E07A5F]" />
              <span>Violations may result in termination of access and legal action where appropriate.</span>
            </p>
          </div>
        </>
      ),
      color: "bg-[#FBE7C6]",
      hoverColor: "hover:bg-[#FFD6A5]"
    },
    {
      id: 'ip',
      icon: <FiLock className="text-2xl" />,
      title: "Intellectual Property",
      content: (
        <>
          <p className="mb-4">All content on SnackyChef is protected by intellectual property laws:</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5] hover:border-[#E07A5F] transition">
              <h4 className="font-bold text-[#5C2C1E] mb-2">Owned Content</h4>
              <p className="text-sm">Original recipes, images, and text</p>
            </div>
            <div className="bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5] hover:border-[#E07A5F] transition">
              <h4 className="font-bold text-[#5C2C1E] mb-2">Licensed Content</h4>
              <p className="text-sm">API data from trusted partners</p>
            </div>
          </div>
          <p>Unauthorized use of any materials is strictly prohibited without prior written consent.</p>
        </>
      ),
      color: "bg-[#FFE8D6]",
      hoverColor: "hover:bg-[#FFD6A5]"
    },
    {
      id: 'third-party',
      icon: <FiExternalLink className="text-2xl" />,
      title: "Third-Party Services",
      content: (
        <>
          <p className="mb-4">We integrate with these external services to enhance your experience:</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-[#FFF7ED] px-3 py-1 rounded-full text-sm cursor-default hover:bg-[#FBE7C6] transition"
            >
              TheMealDB API
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-[#FFF7ED] px-3 py-1 rounded-full text-sm cursor-default hover:bg-[#FBE7C6] transition"
            >
              Google Analytics
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-[#FFF7ED] px-3 py-1 rounded-full text-sm cursor-default hover:bg-[#FBE7C6] transition"
            >
              Stripe Payments
            </motion.span>
          </div>
          <p>While we carefully select partners, we are not responsible for their content or practices.</p>
        </>
      ),
      color: "bg-[#FFD6A5]",
      hoverColor: "hover:bg-[#FFDAC7]"
    },
    {
      id: 'modifications',
      icon: <FiChevronDown className="text-2xl" />,
      title: "Modifications",
      content: (
        <>
          <p className="mb-4">We may update these terms periodically:</p>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Changes will be posted on this page</li>
            <li>Material changes will be communicated via email</li>
            <li>Continued use constitutes acceptance</li>
          </ul>
          <p>We recommend reviewing these terms regularly for updates.</p>
        </>
      ),
      color: "bg-[#FFDAC7]",
      hoverColor: "hover:bg-[#FFE8D6]"
    }
  ];

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    // In a real app, you would likely send this to your backend
    localStorage.setItem('termsAccepted', 'true');
  };

  const progress = (readSections.length / sections.length) * 100;

  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen py-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      <div className="absolute top-1/4 right-10 w-24 h-24 rounded-full bg-[#FF9E5E] opacity-20 blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-13"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block pb-2">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg text-[#3E2A20] max-w-3xl mx-auto">
            Last updated: August 1, 2025 | Effective immediately
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#5C2C1E]">
              {readSections.length} of {sections.length} sections read
            </span>
            <span className="text-sm font-medium text-[#E07A5F]">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full bg-[#FFD6A5] rounded-full h-2.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-2.5 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E]"
            />
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="bg-[#FFF7ED]/80 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-12 border border-[#FFD6A5] shadow-sm hover:shadow-md transition cursor-default"
        >
          <p className="text-[#3E2A20]">
            Welcome to SnackyChef! By accessing or using our website, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. Please read them carefully.
          </p>
        </motion.div>

        {/* Interactive Terms Sections */}
        <div className="space-y-4 mb-12">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -2 }}
              className={`${section.color} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition ${section.hoverColor}`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:bg-[#FFEFE5] transition">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-[#5C2C1E]">{section.title}</h2>
                  {readSections.includes(section.id) && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#5C9E5E]"
                    >
                      <FiCheck className="text-lg" />
                    </motion.span>
                  )}
                </div>
                <motion.div
                  animate={{ 
                    rotate: expandedSection === section.id ? 180 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-1 rounded-full group-hover:bg-white/50"
                >
                  <FiChevronDown className="text-xl text-[#5C2C1E]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-[#3E2A20]"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#FFEFE5] rounded-xl p-8 text-center border border-[#FFD6A5] hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-[#5C2C1E] mb-4">By using SnackyChef, you acknowledge that:</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              "You've read these terms",
              "You understand them",
              "You agree to be bound by them"
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-[#FFF0E5] p-4 rounded-lg border border-[#FFD6A5] hover:border-[#E07A5F] transition cursor-default"
              >
                <p className="font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={handleAcceptTerms}
            disabled={acceptedTerms}
            whileHover={{ scale: acceptedTerms ? 1 : 1.03 }}
            whileTap={{ scale: acceptedTerms ? 1 : 0.98 }}
            className={`px-8 py-3 rounded-full font-medium text-white ${acceptedTerms ? 'bg-[#5C9E5E] cursor-default' : 'bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] hover:shadow-lg'} transition shadow-md`}
          >
            {acceptedTerms ? (
              <span className="flex items-center gap-2">
                <FiCheck className="text-lg" /> Terms Accepted
              </span>
            ) : 'I Accept the Terms of Service'}
          </motion.button>
          
          <p className="text-sm text-[#5C2C1E]/80 mt-4">
            If you do not agree with any part of these terms, please discontinue use of the site immediately.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;