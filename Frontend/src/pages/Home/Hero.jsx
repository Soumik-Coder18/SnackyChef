import React from 'react';
import Lottie from 'lottie-react';
import cookingAnimation from '../../assets/animations/cooking.json';

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#FFD0A5] min-h-screen px-6 md:px-12 overflow-hidden flex items-center">
      {/* Background decorative elements - food-themed */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#E07A5F] opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-48 rounded-full bg-[#A8442A] opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#FFB347] opacity-20 blur-2xl"></div>
      </div>
      
      {/* Floating food icons */}
      <div className="hidden md:block absolute top-20 left-10 text-4xl opacity-30 animate-float">🍅</div>
      <div className="hidden md:block absolute top-1/4 right-20 text-5xl opacity-40 animate-float-delay">🧅</div>
      <div className="hidden md:block absolute bottom-1/3 left-1/4 text-6xl opacity-30 animate-float-delay-2">🥕</div>
      <div className="hidden md:block absolute bottom-20 right-1/3 text-4xl opacity-40 animate-float">🧄</div>
      <div className="hidden md:block absolute top-1/2 left-1/5 text-5xl opacity-30 animate-float-delay">🍋</div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-center z-10 relative">
        {/* Text content */}
        <div className="md:w-5/12 text-center md:text-left mb-10 md:mb-0 mt-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#5C2C1E] mb-6 mt-25 drop-shadow-sm">
            <span className="relative inline-block">
              Cook Smart,
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#E07A5F] opacity-40 rounded-full"></span>
            </span>
            <br />
            Eat Better with{' '}
            <span className="relative text-[#E07A5F]">
              SnackyChef
              <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#5C2C1E] opacity-30 rounded-full"></span>
            </span>
          </h1>
          <p className="text-sm md:text-base text-[#3E2A20] mb-8 max-w-md mx-auto md:mx-0 relative">
            <span className="relative z-10">
              Transform your ingredients into delicious meals with AI-powered recipe suggestions and step-by-step video guides.
            </span>
            <span className="absolute -bottom-1 left-0 w-16 h-1 bg-[#FF9E5E] opacity-60 rounded-full"></span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/recipes"
              className="inline-block bg-gradient-to-r from-[#E07A5F] to-[#FF9E5E] hover:from-[#D06A50] hover:to-[#EE8E4E] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
            >
              Explore Recipes
            </a>
            <a
              href="/how-it-works"
              className="inline-block border-2 border-[#E07A5F] text-[#5C2C1E] px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#E07A5F]/10 hover:border-[#FF9E5E]"
            >
              How It Works
            </a>
          </div>
          
          {/* Recipe stats */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <div className="flex items-center bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-[#FF9E5E] rounded-full mr-2"></div>
              <span>10,000+ Recipes</span>
            </div>
            <div className="flex items-center bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-[#E07A5F] rounded-full mr-2"></div>
              <span>5-Minute Meals</span>
            </div>
            <div className="flex items-center bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-[#A8442A] rounded-full mr-2"></div>
              <span>Diet-Specific Options</span>
            </div>
          </div>
        </div>

        {/* Animation */}
        <div className="md:w-7/12 max-w-[620px] lg:max-w-[700px] mx-auto relative">
          <div className="absolute -inset-8 bg-gradient-to-tr from-[#FF9E5E]/20 to-[#E07A5F]/20 rounded-full blur-xl z-0"></div>
          <Lottie 
            animationData={cookingAnimation} 
            loop={true} 
            className="relative z-10 transform hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;