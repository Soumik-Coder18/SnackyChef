import React from 'react';
import Hero from './Hero';
import Ingredient from './Ingredient';
import FeaturedRecipes from './FeaturedRecipes';
import NutritionHighlights from './NutritionHighlights';
import WatchAndLearn from './Watch&Learn';
import HowItWorks from './HowItWorks';

function Home() {
  return (
    <div>
      <Hero />
      <Ingredient/>
      <FeaturedRecipes/>
      <NutritionHighlights/>
      <WatchAndLearn/>
      <HowItWorks/>
    </div>
  );
}

export default Home;
