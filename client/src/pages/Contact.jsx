import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const contactCards = [
    {
      icon: '📞',
      title: 'Call Us',
      details: ['0300 1234567', '042 111 123456'],
      subtext: 'Available 9am - 11pm daily',
      bg: 'white'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['hello@coffeebook.pk', 'reservations@coffeebook.pk'],
      subtext: 'We respond within 24 hours',
      bg: 'white'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['42 Mall Road, Lahore', 'Street 18, E-7, Islamabad'],
      subtext: 'Free parking available',
      bg: 'white'
    },
    {
      icon: '👩‍🍳',
      title: 'Meet the Owner',
      details: ['Nida Fatima Aslam', 'Founder & Head Barista'],
      subtext: 'Passionate about coffee & books',
      bg: 'gradient'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#4A2C2C] text-center mb-4"
        >
          Get in Touch
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out through any of these channels.
        </p>

        {/* 4 Cards Grid */}
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactCards.map((card, index) => (
            <Motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={`rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${
                card.bg === 'gradient' 
                  ? 'bg-gradient-to-br from-[#C4A35A] to-[#B87C4B] text-white' 
                  : 'bg-white text-[#4A2C2C]'
              }`}
            >
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h3 className={`text-xl font-serif mb-3 ${card.bg === 'gradient' ? 'text-white' : 'text-[#4A2C2C]'}`}>
                {card.title}
              </h3>
              {card.details.map((detail, i) => (
                <p key={i} className={`text-sm mb-1 ${card.bg === 'gradient' ? 'text-white/90' : 'text-[#7B4B3A]'}`}>
                  {detail}
                </p>
              ))}
              <p className={`text-xs mt-3 ${card.bg === 'gradient' ? 'text-white/70' : 'text-[#7B4B3A]/70'}`}>
                {card.subtext}
              </p>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Opening Hours Section */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white rounded-2xl shadow-md p-8 mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="text-4xl mb-3 block">⏰</span>
          <h2 className="text-2xl font-serif text-[#4A2C2C] mb-4">Opening Hours</h2>
          <div className="space-y-2">
            <p className="text-[#7B4B3A]">Monday – Friday: <span className="font-medium">9:00 AM – 11:00 PM</span></p>
            <p className="text-[#7B4B3A]">Saturday – Sunday: <span className="font-medium">10:00 AM – 12:00 AM</span></p>
          </div>
        </Motion.div>

        {/* About Cafe Section */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-[#FAF1E2] rounded-2xl p-8 text-center">
            <span className="text-4xl mb-3 block">☕</span>
            <h3 className="text-xl font-serif text-[#4A2C2C] mb-3">Our Story</h3>
            <p className="text-[#7B4B3A] text-sm leading-relaxed">
              Born and brewed in Lahore, Coffee BOOK is where coffee meets books. 
              A cozy corner for readers and coffee lovers alike.
            </p>
          </div>
          <div className="bg-[#FAF1E2] rounded-2xl p-8 text-center">
            <span className="text-4xl mb-3 block">📖</span>
            <h3 className="text-xl font-serif text-[#4A2C2C] mb-3">Our Promise</h3>
            <p className="text-[#7B4B3A] text-sm leading-relaxed">
              Every cup tells a story. Every book finds a reader. 
              We promise quality coffee and a peaceful reading experience.
            </p>
          </div>
        </Motion.div>

        {/* Social Links */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-2xl font-serif text-[#4A2C2C] mb-6">Follow Us</h2>
          <div className="flex justify-center gap-6">
            <a 
              href="https://www.instagram.com/coffeebook.pk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#C4A35A] rounded-full flex items-center justify-center text-white text-xl hover:bg-[#B87C4B] hover:-translate-y-1 transition-all duration-300"
            >
              📷
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-[#C4A35A] rounded-full flex items-center justify-center text-white text-xl hover:bg-[#B87C4B] hover:-translate-y-1 transition-all duration-300"
            >
              📘
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-[#C4A35A] rounded-full flex items-center justify-center text-white text-xl hover:bg-[#B87C4B] hover:-translate-y-1 transition-all duration-300"
            >
              🐦
            </a>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Contact;