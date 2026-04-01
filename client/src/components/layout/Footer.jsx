import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C1A1A] text-[#E8DCCC] border-t border-[#4A2C2C] mt-auto">
      <div className="container mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
<div>
  <Link to="/" className="inline-block mb-4">
    <img 
      src="/images/images/logo/cafe-logo-2.png" 
      alt="Coffee BOOK Logo"
      className="max-h-12 w-auto object-contain" 
    />
  </Link>
  <p className="text-sm text-[#E8DCCC]/80 leading-relaxed">
    Lahore's coziest reading corner. Where coffee meets books.
  </p>
</div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-md font-medium text-[#FAF1E2] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-[#E8DCCC]/80 hover:text-[#C4A35A] transition-colors">Home</Link></li>
              <li><Link to="/cafe-menu" className="text-sm text-[#E8DCCC]/80 hover:text-[#C4A35A] transition-colors">Cafe Menu</Link></li>
              <li><Link to="/books" className="text-sm text-[#E8DCCC]/80 hover:text-[#C4A35A] transition-colors">Books</Link></li>
              <li><Link to="/contact" className="text-sm text-[#E8DCCC]/80 hover:text-[#C4A35A] transition-colors">Contact</Link></li>
              <li><Link to="/reservation" className="text-sm text-[#E8DCCC]/80 hover:text-[#C4A35A] transition-colors">Reserve a Table</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-md font-medium text-[#FAF1E2] mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-[#E8DCCC]/80">📍 42 Mall Road, Lahore</li>
              <li className="text-sm text-[#E8DCCC]/80">📞 0300 1234567</li>
              <li className="text-sm text-[#E8DCCC]/80">✉️ hello@coffeebook.pk</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-md font-medium text-[#FAF1E2] mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="text-sm text-[#E8DCCC]/80">Monday – Friday: 9am – 11pm</li>
              <li className="text-sm text-[#E8DCCC]/80">Saturday – Sunday: 10am – 12am</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#4A2C2C] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#E8DCCC]/60">
            © {currentYear} COFFEE BOOK. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/coffeebook.pk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#E8DCCC]/60 hover:text-[#C4A35A] transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="text-xs text-[#E8DCCC]/60 hover:text-[#C4A35A] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[#E8DCCC]/60 hover:text-[#C4A35A] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;