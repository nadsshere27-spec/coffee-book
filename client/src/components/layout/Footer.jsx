import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../ui/Popup';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const privacyBtnRef = useRef(null);
  const termsBtnRef = useRef(null);

  return (
    <footer className="bg-[#2C1A1A] text-[#E8DCCC] border-t border-[#4A2C2C] mt-auto">
      <div className="container mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
         {/* Brand Section */}
<div>
  <h3 className="font-serif text-xl font-medium text-[#FAF1E2] mb-4">Coffee BOOK</h3>
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
            <button
              ref={privacyBtnRef}
              onClick={() => setShowPrivacy(true)}
              className="text-xs text-[#E8DCCC]/60 hover:text-[#C4A35A] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              ref={termsBtnRef}
              onClick={() => setShowTerms(true)}
              className="text-xs text-[#E8DCCC]/60 hover:text-[#C4A35A] transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Popup */}
      <Popup
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
        triggerRef={privacyBtnRef}
      >
        <p className="mb-3">At Coffee BOOK, we value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
        <p className="mb-3">We collect information only when you make a reservation or contact us. Your data is never shared with third parties.</p>
        <p>For any questions, please contact us at hello@coffeebook.pk.</p>
      </Popup>

      {/* Terms Popup */}
      <Popup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
        triggerRef={termsBtnRef}
      >
        <p className="mb-3">By using our services, you agree to these terms. Reservations are held for 15 minutes past the scheduled time.</p>
        <p className="mb-3">Walk-ins are welcome based on availability. We reserve the right to modify prices and hours without prior notice.</p>
        <p>For special requests or events, please contact us directly.</p>
      </Popup>
    </footer>
  );
};

export default Footer;
