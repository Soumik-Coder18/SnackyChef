import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsOfService from '../pages/Legal/TermsOfService';
import Cookies from '../pages/Legal/Cookies';
import FullPolicy from '../pages/Legal/FullPolicy';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/full-policy" element={<FullPolicy />} />
        {/* Add more routes here later */}
      </Routes>
    </Router>
  );
}

export default AppRouter;