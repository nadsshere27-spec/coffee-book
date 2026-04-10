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
      scrolled ? 'bg-white/95 shadow-sm py-3 md:py-4' : 'bg-transparent py-5 md:py-6'
    }`}>
      <div className="w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo - Mobile: h-14, Desktop: h-16 */}
          <Link to="/" className="flex items-center pl-0 md:pl-1">
            <img 
              src="/images/images/logo/cafe-logo-2.png" 
              alt="Coffee BOOK Logo"
              className="w-auto h-14 md:h-16" 
            />
          </Link>

          {/* Navigation Links - Mobile: gap-3, Desktop: gap-8 */}
          <div className="flex items-center gap-3 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs md:text-sm tracking-wider transition-colors duration-300 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#C4A35A]'
                    : 'text-[#4A2C2C] hover:text-[#C4A35A]'
                } ${link.label === 'RESERVE' ? 'mr-4 md:mr-8' : ''}`}
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