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
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl">
      <div
        className={`transition-all duration-300 rounded-full px-6 py-3 flex flex-col md:flex-row justify-between items-center text-[#A0522D] border ${
          scrolled
            ? 'bg-[#FFF7ED]/90 backdrop-blur-md border-[#FFD6A5] shadow-md'
            : 'bg-white/30 backdrop-blur-sm border-[#FBE7C6] shadow-sm'
        }`}
      >
        <div className="flex justify-between items-center w-full md:w-auto mb-2 md:mb-0">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍳</span>
            <h1 className="text-2xl font-semibold tracking-tight">SnackyChef</h1>
          </div>
          <div className="flex gap-3 md:hidden ml-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (searchOpen) setSearchOpen(false);
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="md:hidden"
              aria-label="Toggle search"
            >
              <FiSearch size={24} />
            </button>
          </div>
        </div>
        {/* Navigation */}
        <nav className="mb-2 md:mb-0 hidden md:block">
          <ul className="flex gap-6 list-none text-base font-medium">
            <li><a href="/" className="hover:text-[#FF7F50] transition-colors">Home</a></li>
            <li><a href="/recipes" className="hover:text-[#FF7F50] transition-colors">Recipes</a></li>
            <li><a href="/favorites" className="hover:text-[#FF7F50] transition-colors">Favorites</a></li>
            <li><a href="/about" className="hover:text-[#FF7F50] transition-colors">About</a></li>
          </ul>
        </nav>
        {/* Search Bar (Desktop) */}
        <div className="w-full md:w-1/3 flex justify-end">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 rounded-full border border-[#FFD6A5] text-[#6B3F1D] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FFD6A5] placeholder-[#C0A080] hidden md:block"
          />
        </div>
      </div>
      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden bg-[#FFF7ED] px-4 py-3 border-b border-[#FFD6A5]">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5C2C1E]/70" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#FFD6A5] text-[#5C2C1E] bg-[#FFF2E2]/90 focus:outline-none focus:ring-2 focus:ring-[#FFD6A5] placeholder-[#5C2C1E]/60"
              autoFocus
            />
          </div>
        </div>
      )}
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF7ED] px-4 py-3 border-b border-[#FFD6A5]">
          <ul className="flex flex-col gap-3 text-base font-medium">
            <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="/recipes" onClick={() => setMobileMenuOpen(false)}>Recipes</a></li>
            <li><a href="/favorites" onClick={() => setMobileMenuOpen(false)}>Favorites</a></li>
            <li><a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
