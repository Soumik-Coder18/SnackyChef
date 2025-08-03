import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiDatabase, FiSettings, FiUsers, FiKey, FiMail, FiChevronDown } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const sections = [
    {
      icon: <FiDatabase className="text-3xl" />,
      title: "Data Collection",
      shortDesc: "What we collect and why",
      content: (
        <>
          <p className="mb-4">We collect only what's necessary to provide exceptional service:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-[#E07A5F] text-white rounded-full p-1 mr-3 mt-1">
                <FiDatabase className="text-xs" />
              </span>
              <span><strong>Account Data:</strong> Email, preferences for personalized experience</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#E07A5F] text-white rounded-full p-1 mr-3 mt-1">
                <FiSettings className="text-xs" />
              </span>
              <span><strong>Usage Data:</strong> Interactions to improve our services</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#E07A5F] text-white rounded-full p-1 mr-3 mt-1">
                <FiUsers className="text-xs" />
              </span>
              <span><strong>Device Info:</strong> Browser type for compatibility</span>
            </li>
          </ul>
        </>
      ),
      color: "from-[#FF9E5E] to-[#FFD6A5]"
    },
    {
      icon: <FiSettings className="text-3xl" />,
      title: "Cookie Usage",
      shortDesc: "Transparent tracking",
      content: (
        <>
          <p className="mb-4">We use cookies responsibly to enhance your experience:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#FFEFE5] p-4 rounded-lg">
              <h4 className="font-bold text-[#5C2C1E] mb-2">Essential</h4>
              <p className="text-sm">Site functionality and security</p>
            </div>
            <div className="bg-[#F0F7E6] p-4 rounded-lg">
              <h4 className="font-bold text-[#5C2C1E] mb-2">Analytics</h4>
              <p className="text-sm">Service improvements</p>
            </div>
            <div className="bg-[#F7F0E6] p-4 rounded-lg">
              <h4 className="font-bold text-[#5C2C1E] mb-2">Preferences</h4>
              <p className="text-sm">Personalized settings</p>
            </div>
          </div>
          <p>Manage preferences anytime in your browser settings.</p>
        </>
      ),
      color: "from-[#E07A5F] to-[#FFB347]"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Third Parties",
      shortDesc: "Trusted partners only",
      content: (
        <>
          <p className="mb-4">We carefully vet all third-party services:</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm">TheMealDB</span>
            <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm">Google Analytics</span>
            <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm">Stripe</span>
          </div>
          <p>Each partner undergoes rigorous privacy compliance checks.</p>
        </>
      ),
      color: "from-[#FFD6A5] to-[#FFF3EA]"
    },
    {
      icon: <FiKey className="text-3xl" />,
      title: "Your Rights",
      shortDesc: "Complete control",
      content: (
        <>
          <p className="mb-4">You have full control over your data:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border-l-4 border-[#E07A5F] pl-3">
              <h4 className="font-bold text-[#5C2C1E]">Access</h4>
              <p className="text-sm">Request your data anytime</p>
            </div>
            <div className="border-l-4 border-[#E07A5F] pl-3">
              <h4 className="font-bold text-[#5C2C1E]">Correction</h4>
              <p className="text-sm">Update inaccurate information</p>
            </div>
            <div className="border-l-4 border-[#E07A5F] pl-3">
              <h4 className="font-bold text-[#5C2C1E]">Deletion</h4>
              <p className="text-sm">Remove your data permanently</p>
            </div>
            <div className="border-l-4 border-[#E07A5F] pl-3">
              <h4 className="font-bold text-[#5C2C1E]">Portability</h4>
              <p className="text-sm">Export your data easily</p>
            </div>
          </div>
        </>
      ),
      color: "from-[#E07A5F] to-[#FF9E5E]"
    }
  ];

  const toggleSection = (index) => {
    if (index === 0 || index === 1) {
      setExpandedSection(expandedSection === 0 ? null : 0);
    } else if (index === 2 || index === 3) {
      setExpandedSection(expandedSection === 2 ? null : 2);
    } else {
      setExpandedSection(expandedSection === index ? null : index);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen py-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto mt-13 relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              rotate: isHovering ? [0, 10, -10, 0] : 0,
              scale: isHovering ? 1.1 : 1 
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className="flex justify-center mb-6"
          >
            <div className="p-5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full shadow-lg">
              <FiShield className="text-5xl text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C2C1E] mb-4">
            <span className="relative inline-block pb-2">
              Privacy Commitment
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h1>
          <p className="text-xl text-[#3E2A20] max-w-3xl mx-auto">
            Transparent data practices that put you in control
          </p>
        </motion.div>

        {/* Interactive Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                expandedSection === index ||
                (expandedSection === 0 && (index === 0 || index === 1)) ||
                (expandedSection === 2 && (index === 2 || index === 3))
                  ? 'ring-2 ring-[#E07A5F]' : ''
              }`}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full text-left"
              >
                <div className={`p-6 bg-gradient-to-r ${section.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{section.title}</h2>
                        <p className="text-sm opacity-90">{section.shortDesc}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate:
                          expandedSection === index ||
                          (expandedSection === 0 && (index === 0 || index === 1)) ||
                          (expandedSection === 2 && (index === 2 || index === 3))
                            ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="text-xl" />
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {(expandedSection === index ||
                  (expandedSection === 0 && (index === 0 || index === 1)) ||
                  (expandedSection === 2 && (index === 2 || index === 3))) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 text-[#3E2A20]"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-[#FFF7ED]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFD6A5] shadow-sm mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#5C2C1E] mb-4 flex items-center gap-2">
                <FiShield className="text-[#E07A5F]" /> Security Measures
              </h3>
              <ul className="space-y-3 text-[#3E2A20]">
                <li className="flex items-start gap-2">
                  <span className="text-[#E07A5F]">•</span>
                  <span>End-to-end encryption for all data transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E07A5F]">•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E07A5F]">•</span>
                  <span>Role-based access controls for our team</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#5C2C1E] mb-4 flex items-center gap-2">
                <FiMail className="text-[#E07A5F]" /> Contact Us
              </h3>
              <p className="text-[#3E2A20] mb-4">
                Have questions about your privacy? Our dedicated team is here to help.
              </p>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] text-white font-semibold hover:from-[#D06A50] hover:to-[#EE8E4E] transition-all shadow-md hover:shadow-lg">
                Contact Privacy Team
              </button>
            </div>
          </div>
        </motion.div>

        {/* Policy Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-block bg-[#FFEFE5] px-6 py-3 rounded-full">
            <p className="text-sm text-[#5C2C1E]">
              <strong>Last Updated:</strong> August 15, 2025 | <strong>Effective:</strong> August 1, 2025
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;