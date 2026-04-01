import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/cafe-menu', label: 'CAFE MENU' },
    { path: '/books', label: 'BOOKS' },
    { path: '/contact', label: 'CONTACT' },
    { path: '/reservation', label: 'RESERVE' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Logo - Image */}
          <Link to="/" className="flex items-center">
            <img 
              src="/src/assets/images/logo/cafe-logo-2.png" 
              alt="Coffee BOOK Logo"
              className="max-h-14 w-auto" 
            />
          </Link>

          {/* Navigation Links - Top Right Corner */}
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs md:text-sm tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#C4A35A]'
                    : 'text-[#4A2C2C] hover:text-[#C4A35A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;