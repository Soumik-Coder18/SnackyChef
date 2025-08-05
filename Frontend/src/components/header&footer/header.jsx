import React, { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div
        className={`transition-all duration-300 rounded-full px-6 py-3 flex flex-col md:flex-row justify-between items-center text-[#A0522D] border ${
          scrolled
            ? 'bg-[#FFF7ED]/90 backdrop-blur-md border-[#FFD6A5] shadow-lg'
            : 'bg-white/30 backdrop-blur-sm border-[#FBE7C6] shadow-md'
        }`}
      >
        <div className="flex justify-between items-center w-full md:w-auto md:mb-0">
          <a href="/" className="flex items-center gap-3 group">
            {/* Cooking Pan-Themed SVG Logo */}
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <circle cx="32" cy="32" r="30" fill="#FF7F50" stroke="#FFF7ED" strokeWidth="2"/>
              <rect x="18" y="28" width="28" height="14" rx="3" fill="#FFF7ED" stroke="#FF7F50" strokeWidth="2"/>
              <rect x="24" y="20" width="16" height="4" rx="2" fill="#FFF7ED"/>
              <path d="M42 28L48 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 28L16 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 className="text-2xl font-bold tracking-tight font-['Poppins'] text-[#5C2C1E]">
              Snacky<span className="text-[#FF7F50]">Chef</span>
            </h1>
          </a>
          <div className="flex gap-3 md:hidden ml-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (searchOpen) setSearchOpen(false);
              }}
              className="md:hidden text-[#5C2C1E] hover:text-[#FF7F50] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="md:hidden text-[#5C2C1E] hover:text-[#FF7F50] transition-colors"
              aria-label="Toggle search"
            >
              <FiSearch size={24} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mb-2 md:mb-0 hidden md:block">
          <ul className="flex gap-8 list-none text-base font-medium">
            <li><a href="/" className="hover:text-[#FF7F50] transition-colors">Home</a></li>
            <li><a href="/recipe" className="hover:text-[#FF7F50] transition-colors">Recipes</a></li>
            <li><a href="/favourite" className="hover:text-[#FF7F50] transition-colors">Favourites</a></li>
            <li><a href="/about" className="hover:text-[#FF7F50] transition-colors">About</a></li>
          </ul>
        </nav>
        
        {/* Search Bar (Desktop only) */}
        <div className="w-full md:w-1/3 flex justify-end hidden md:flex">
          <form action="/search" method="GET" className="relative w-full max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5C2C1E]/70" />
            <input
              type="text"
              name="q"
              placeholder="Search recipes..."
              className="w-full pl-12 pr-4 py-2 rounded-full border border-[#FFD6A5] text-[#5C2C1E] bg-[#FFF2E2]/90 focus:outline-none focus:ring-2 focus:ring-[#FF7F50] placeholder-[#5C2C1E]/60"
            />
            <input type="hidden" name="type" value="name" />
          </form>
        </div>
      </div>
      
      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden bg-[#FFF7ED] px-4 py-3 border-b border-[#FFD6A5] mt-2 rounded-lg shadow-sm">
          <form action="/search" method="GET" className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5C2C1E]/70" />
            <input
              type="text"
              name="q"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#FFD6A5] text-[#5C2C1E] bg-[#FFF2E2]/90 focus:outline-none focus:ring-2 focus:ring-[#FF7F50] placeholder-[#5C2C1E]/60"
              autoFocus
            />
            <input type="hidden" name="type" value="name" />
          </form>
        </div>
      )}
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF7ED] px-4 py-3 border-b border-[#FFD6A5] mt-2 rounded-lg shadow-sm">
          <ul className="flex flex-col gap-4 text-base font-medium">
            <li><a href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#FF7F50] transition-colors">Home</a></li>
            <li><a href="/recipes" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#FF7F50] transition-colors">Recipes</a></li>
            <li><a href="/favourite" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#FF7F50] transition-colors">Favourites</a></li>
            <li><a href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#FF7F50] transition-colors">About</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;