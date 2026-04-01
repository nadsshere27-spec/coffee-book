import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import Button from '../components/ui/Button';

// ==================== MODAL COMPONENT ====================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-white border-b border-[#E8DCCC] px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-serif text-[#4A2C2C]">{title}</h3>
          <button onClick={onClose} className="text-[#7B4B3A] hover:text-[#C4A35A] text-2xl">&times;</button>
        </div>
        <div className="p-6 text-[#4A2C2C]">{children}</div>
      </Motion.div>
    </div>
  );
};

// ==================== HOME COMPONENT ====================
const Home = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E9]">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/coffee/hot/44.jpeg" 
            alt="Cozy cafe interior with warm lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <Motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <Motion.p 
                variants={fadeUp}
                className="text-sm tracking-[0.3em] uppercase text-[#C4A35A] mb-4 font-light"
              >
                EST. 2026
              </Motion.p>
              
              <Motion.h1 
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-tight mb-6"
              >
                Think of Coffee BOOK
                <br />
                <span className="italic font-light">as your second home</span>
              </Motion.h1>
              
              <Motion.p 
                variants={fadeUp}
                className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed"
              >
                It certainly is just that to us. Where coffee meets books, 
                and every corner tells a story.
              </Motion.p>
              
              <Motion.div 
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/cafe-menu">
                  <Button variant="primary" size="lg" className="bg-[#C4A35A] hover:bg-[#B87C4B] text-white min-w-[160px]">
                    EXPLORE MENU
                  </Button>
                </Link>
                <Link to="/reservation">
                  <Button variant="secondary" size="lg" className="border-2 border-white text-white hover:bg-white/20 min-w-[160px]">
                    RESERVE A TABLE
                  </Button>
                </Link>
              </Motion.div>
            </Motion.div>
          </div>
        </div>

        <Motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-[#C4A35A] z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </section>

      {/* ==================== ABOUT US & OUR HERITAGE SECTION (EXACT LIKE REFERENCE) ==================== */}
<section className="py-24 bg-[#FDF6E9]">
  <div className="container mx-auto px-6 max-w-6xl">
    
    {/* First Row - About Us (Text Left, Image Right) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
      {/* Text Column */}
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-[#4A2C2C] mb-4 tracking-tight">
          About Us
        </h2>
        <p className="text-[#7B4B3A] leading-relaxed text-base">
          Born and brewed in Lahore, we take pride in the experience we provide our customers 
          with our freshest and richest blends of coffee. Every cup is crafted with care, 
          sourced from the finest beans to deliver the perfect sip.
        </p>
      </div>
      
      {/* Image Column */}
      <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square max-w-md mx-auto w-full">
        <img 
          src="/src/assets/images/coffee/hot/8888.jpeg" 
          alt="Coffee cup"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    {/* Second Row - Our Heritage (Image Left, Text Right) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Image Column */}
      <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square max-w-md mx-auto w-full order-1 md:order-none">
        <img 
          src="/src/assets/images/coffee/hot/6555.jpeg" 
          alt="Stack of books"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Text Column */}
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-[#4A2C2C] mb-4 tracking-tight">
          Our Heritage
        </h2>
        <p className="text-[#7B4B3A] leading-relaxed text-base">
          Coffee BOOK started in 2026 with the commitment to serve the perfect cup 
          alongside the finest books. Now, we've become Lahore's coziest reading corner, 
          where coffee meets stories and every corner invites you to stay a while.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* ==================== ABOUT SECTION (WITH IMAGE) ==================== */}
      <section className="py-24 bg-[#FAF1E2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#4A2C2C] mb-4">Our Coffee Culture</h2>
              <p className="text-[#7B4B3A] leading-relaxed">
                In the gentle rhythm of our café, every cup is crafted with care and intention.
Sunlit corners and quiet conversations create an atmosphere of effortless elegance.
Here, time slows—inviting you to reflect, connect, and simply be.
Each detail is designed to offer comfort, warmth, and a sense of belonging.
              </p>
            </Motion.div>

            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src="/src/assets/images/coffee/hot/11.jpeg" 
                alt="Books and coffee"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ==================== OPENING HOURS & CONTACT ==================== */}
      <section className="py-24 bg-[#FDF6E9]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="flex justify-center mb-4">
                <span className="text-5xl">⏰</span>
              </div>
              <h2 className="text-2xl font-serif text-[#4A2C2C] text-center mb-6">Opening Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#E8DCCC]">
                  <span className="text-[#4A2C2C] font-medium">Monday – Friday</span>
                  <span className="text-[#7B4B3A]">9:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E8DCCC]">
                  <span className="text-[#4A2C2C] font-medium">Saturday – Sunday</span>
                  <span className="text-[#7B4B3A]">10:00 AM – 12:00 AM</span>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-sm text-[#C4A35A]">📍 42 Mall Road, Lahore</p>
                </div>
              </div>
            </Motion.div>

            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="flex justify-center mb-4">
                <span className="text-5xl">📞</span>
              </div>
              <h2 className="text-2xl font-serif text-[#4A2C2C] text-center mb-6">Contact Us</h2>
              <div className="space-y-4 text-center">
                <p className="text-[#7B4B3A]">📞 0300 1234567</p>
                <p className="text-[#7B4B3A]">✉️ hello@coffeebook.pk</p>
                <p className="text-[#7B4B3A]">📍 42 Mall Road, Lahore</p>
                <div className="pt-4">
                  <a 
                    href="https://www.instagram.com/coffeebook.pk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#C4A35A] hover:underline"
                  >
                    <span>📸</span> @coffeebook.pk
                  </a>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* Privacy & Terms Links */}
          <div className="flex justify-center gap-8 mt-12 text-sm text-[#7B4B3A]">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-[#C4A35A] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setShowTerms(true)} className="hover:text-[#C4A35A] transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <p className="mb-4">At Coffee BOOK, we value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
        <p className="mb-4">We collect information only when you make a reservation or contact us. Your data is never shared with third parties.</p>
        <p>For any questions, please contact us at hello@coffeebook.pk.</p>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <p className="mb-4">By using our services, you agree to these terms. Reservations are held for 15 minutes past the scheduled time.</p>
        <p className="mb-4">Walk-ins are welcome based on availability. We reserve the right to modify prices and hours without prior notice.</p>
        <p>For special requests or events, please contact us directly.</p>
      </Modal>

      {/* Scroll Progress Bar Component */}
      <ScrollProgressBar />
    </div>
  );
};

// Scroll Progress Bar Component
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#E8DCCC]">
      <div 
        className="h-full bg-[#C4A35A] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default Home;