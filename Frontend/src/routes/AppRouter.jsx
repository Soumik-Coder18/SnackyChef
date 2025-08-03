import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsOfService from '../pages/Legal/TermsOfService';
import Cookies from '../pages/Legal/Cookies';
import FullPolicy from '../pages/Legal/FullPolicy';
import Contact from '../pages/Contact/Contact';
import About from '../pages/Contact/About';
import SignUp from '../pages/Register/SignUp';
import Login from '../pages/Register/login';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/full-policy" element={<FullPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
}

export default AppRouter;