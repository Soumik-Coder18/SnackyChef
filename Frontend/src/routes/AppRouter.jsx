import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import Home from '../pages/Home/Home';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsOfService from '../pages/Legal/TermsOfService';
import Cookies from '../pages/Legal/Cookies';
import FullPolicy from '../pages/Legal/FullPolicy';
import Contact from '../pages/Contact/Contact';
import About from '../pages/Contact/About';
import SignUp from '../pages/Register/SignUp';
import Login from '../pages/Register/login';
import OTP from '../pages/Register/OTP';
import Recipe from '../pages/Recipe/MainRecipePage';
import ViewAllRecipe from '../pages/Recipe/ViewAll/ViewAllRecipe';
import SearchResult from '../pages/Recipe/SearchResult';
import HowItWorks from '../pages/Contact/HowItWorks';
import RecipeDetails from '../pages/RecipeDetails/MainRecipeDetails';
import Favourite from '../pages/Favourites/Favourite';
import CreateRecipe from '../SocialPages/UserRecipes/CreateRecipe';
import MyRecipesList from '../SocialPages/MyRecipe/MyRecipesList';
import UserDashboard from '../Dashboard/UserDashboard';
import RecipeWorld from '../pages/RecipeWorld/RecipeWorld';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/full-policy" element={<FullPolicy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/view-all" element={<ViewAllRecipe />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/recipe-world" element={<RecipeWorld />} />

      {/* Protected Routes */}
      <Route path="/create-recipe" element={
        <ProtectedRoute>
          <CreateRecipe />
        </ProtectedRoute>
      } />
      <Route path="/UserDashboard" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/my-recipes" element={
        <ProtectedRoute>
          <MyRecipesList />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRouter;