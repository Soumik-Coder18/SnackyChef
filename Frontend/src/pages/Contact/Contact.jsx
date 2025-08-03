import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiMapPin, FiPhone, FiClock, FiCheckCircle } from 'react-icons/fi';
import Lottie from 'lottie-react';
import contactAnimation from '../../assets/animations/Contact.json';

const Contact = () => {
  const [animationLoaded, setAnimationLoaded] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FFF7ED] to-[#FFE8D6] min-h-screen px-4 md:px-8 py-20 text-[#5C2C1E] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="relative inline-block pb-2">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg text-[#7B341E] max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFF7ED] p-8 rounded-xl shadow-sm border border-[#FFD6A5]"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#5C2C1E]">
              <FiMapPin className="text-[#E07A5F]" />
              Contact Info
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#FFEFE5] rounded-full">
                  <FiMapPin className="text-[#E07A5F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#5C2C1E]">Address</h3>
                  <p className="text-[#7B341E]">123 Recipe Lane, Foodie City, FC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#FFEFE5] rounded-full">
                  <FiPhone className="text-[#E07A5F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#5C2C1E]">Phone</h3>
                  <p className="text-[#7B341E]">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#FFEFE5] rounded-full">
                  <FiMail className="text-[#E07A5F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#5C2C1E]">Email</h3>
                  <p className="text-[#7B341E]">hello@snackychef.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#FFEFE5] rounded-full">
                  <FiClock className="text-[#E07A5F]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#5C2C1E]">Hours</h3>
                  <p className="text-[#7B341E]">Monday - Friday: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#FFF7ED] p-8 rounded-xl shadow-sm border border-[#FFD6A5]"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#5C2C1E]">
              <FiMessageSquare className="text-[#E07A5F]" />
              Send Us a Message
            </h2>
            
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#F0F7E6] border border-[#5C9E5E] text-[#5C2C1E] p-4 rounded-lg mb-6 flex items-center gap-3"
              >
                <FiCheckCircle className="text-2xl text-[#5C9E5E]" />
                <div>
                  <h3 className="font-bold">Message Sent Successfully!</h3>
                  <p>We'll get back to you soon.</p>
                </div>
              </motion.div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#5C2C1E]/70">
                  <FiUser />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 pl-10 rounded-md bg-[#FFEFE5] border border-[#FFD6A5] placeholder:text-[#5C2C1E]/70 focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#5C2C1E]/70">
                  <FiMail />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 pl-10 rounded-md bg-[#FFEFE5] border border-[#FFD6A5] placeholder:text-[#5C2C1E]/70 focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition"
                />
              </div>
              
              <div className="relative">
                <div className="absolute top-3 left-3 text-[#5C2C1E]/70">
                  <FiMessageSquare />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 pl-10 rounded-md bg-[#FFEFE5] border border-[#FFD6A5] placeholder:text-[#5C2C1E]/70 focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] outline-none transition"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full font-medium text-white ${isSubmitting ? 'bg-[#E07A5F]/80' : 'bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E]'} shadow-md hover:shadow-lg transition`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Animation Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#FFF7ED] rounded-xl p-6 md:p-8 border border-[#FFD6A5]"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-[#5C2C1E]">We're Here to Help</h2>
              <p className="text-[#7B341E] mb-4">
                Whether you have questions about our recipes, need technical support, or want to collaborate, our team is ready to assist you.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm text-[#5C2C1E]">24/7 Support</span>
                <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm text-[#5C2C1E]">Quick Responses</span>
                <span className="bg-[#FFEFE5] px-3 py-1 rounded-full text-sm text-[#5C2C1E]">Friendly Team</span>
              </div>
            </div>
            <div className="md:w-1/2">
              {animationLoaded ? (
                <Lottie
                  animationData={contactAnimation}
                  loop={true}
                  className="w-full h-auto max-h-[300px]"
                  onError={() => setAnimationLoaded(false)}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-[250px] bg-[#FFE8D6] rounded-lg border border-[#FFD6A5] text-[#E07A5F]">
                  <div className="text-center p-4">
                    <FiMail className="text-4xl mx-auto mb-3" />
                    <p>Contact us today!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;