import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { FiSettings, FiBarChart2, FiCheckCircle, FiXCircle, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FullPolicy = () => {
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    lenis.scrollTo(0, { immediate: false });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const toggleSection = (id) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: "Strictly Necessary",
      icon: <FiCheckCircle className="text-2xl" />,
      color: "bg-[#FFEFE5]",
      description: "Essential for website functionality",
      examples: ["Session management", "Security features", "Load balancing"]
    },
    {
      id: 'performance',
      title: "Performance",
      icon: <FiBarChart2 className="text-2xl" />,
      color: "bg-[#FBE7C6]",
      description: "Help us understand site usage",
      examples: ["Visitor analytics", "Page load speed", "Error tracking"]
    },
    {
      id: 'functional',
      title: "Functional",
      icon: <FiSettings className="text-2xl" />,
      color: "bg-[#FFD6A5]",
      description: "Remember your preferences",
      examples: ["Language settings", "Font size choices", "Region selection"]
    },
    {
      id: 'targeting',
      title: "Targeting",
      icon: <FiSettings className="text-2xl" />,
      color: "bg-[#FFDAC7]",
      description: "Personalize your experience",
      examples: ["Ad preferences", "Recommendations", "Social media integration"]
    }
  ];

  const policySections = [
    {
      id: 'what-are',
      title: "What Are Cookies?",
      content: (
        <>
          <p className="mb-4">
            Cookies are small text files stored on your device when you visit websites. They help sites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5]">
              <h4 className="font-bold mb-2">First-Party Cookies</h4>
              <p className="text-sm">Set by our domain for essential functions</p>
            </div>
            <div className="bg-[#FFF7ED] p-4 rounded-lg border border-[#FFD6A5]">
              <h4 className="font-bold mb-2">Third-Party Cookies</h4>
              <p className="text-sm">Set by external services we use</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'why-use',
      title: "Why We Use Cookies",
      content: (
        <>
          <p className="mb-4">Cookies help us provide the best possible experience on SnackyChef by:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              { icon: <FiSettings className="text-3xl text-[#E07A5F]" />, text: "Enabling core features", bg: "bg-[#FFEFE5]" },
              { icon: <FiBarChart2 className="text-3xl text-[#E07A5F]" />, text: "Analyzing usage", bg: "bg-[#FBE7C6]" },
              { icon: <FiXCircle className="text-3xl text-[#E07A5F]" />, text: "Improving security", bg: "bg-[#FFDAC7]" },
              { icon: <FiCheckCircle className="text-3xl text-[#E07A5F]" />, text: "Personalizing content", bg: "bg-[#FFD6A5]" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className={`${item.bg} p-5 rounded-lg border border-[#FFD6A5] text-center`}
              >
                <div className="mb-3 flex justify-center">
                  <span className="p-3 rounded-full bg-white/70 shadow">{item.icon}</span>
                </div>
                <p className="text-sm font-medium text-[#5C2C1E]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </>
      )
    },
    {
      id: 'manage',
      title: "Managing Cookies",
      content: (
        <>
          <p className="mb-4">You have control over cookies through your browser settings:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FFEFE5]">
                  <th className="p-3 text-left border border-[#FFD6A5]">Browser</th>
                  <th className="p-3 text-left border border-[#FFD6A5]">Instructions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { browser: "Chrome", link: "https://support.google.com/chrome/answer/95647" },
                  { browser: "Firefox", link: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" },
                  { browser: "Safari", link: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
                  { browser: "Edge", link: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-[#FFD6A5] hover:bg-[#FFF7ED]">
                    <td className="p-3 border border-[#FFD6A5] font-medium">{row.browser}</td>
                    <td className="p-3 border border-[#FFD6A5]">
                      <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-[#E07A5F] hover:underline">
                        View instructions
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen py-16 px-6 md:px-12 overflow-x-hidden overflow-y-auto">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative pb-20 mt-14">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-[#FFF7ED] rounded-full shadow-md mb-4">
            <FiSettings className="text-3xl text-[#E07A5F]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="relative inline-block">
              Full Cookie Policy
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Last updated: August 1, 2025
          </p>
        </motion.div>

        {/* Cookie Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cookieTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ y: -5 }}
              className={`${type.color} p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-default`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#FFF7ED] rounded-lg">
                  {type.icon}
                </div>
                <h3 className="font-bold text-lg">{type.title}</h3>
              </div>
              <p className="mb-3 text-sm">{type.description}</p>
              <div className="space-y-2">
                {type.examples.map((example, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#E07A5F]">•</span>
                    <span className="text-sm">{example}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((section) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#FFF7ED] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-6 flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <motion.div
                  animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                >
                  <FiChevronDown className="text-xl" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Cookie Control Panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#FFF7ED] rounded-xl shadow-md p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FiSettings className="text-[#E07A5F]" />
            Cookie Preferences
          </h2>
          
          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{type.title} Cookies</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {type.id === 'necessary' ? (
                    <span className="px-3 py-1 bg-[#FFEFE5] text-[#5C2C1E] rounded-full text-sm">
                      Always On
                    </span>
                  ) : (
                    <>
                      <button className="px-3 py-1 bg-[#5C9E5E] text-white rounded-full text-sm">
                        Allow
                      </button>
                      <button className="px-3 py-1 bg-[#FFEFE5] text-[#5C2C1E] rounded-full text-sm">
                        Block
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
            <button className="px-6 py-2 bg-[#5C2C1E] text-white rounded-full hover:bg-[#3E2A20] transition">
              Confirm Preferences
            </button>
            <button className="px-6 py-2 border border-[#5C2C1E] text-[#5C2C1E] rounded-full hover:bg-[#FFF7ED] transition">
              Accept All Cookies
            </button>
            <button className="px-6 py-2 text-[#5C2C1E] hover:underline">
              Reject All
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FullPolicy;