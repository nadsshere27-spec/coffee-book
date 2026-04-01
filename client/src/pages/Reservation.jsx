import React from 'react';
import { motion as Motion } from 'framer-motion';

const Reservation = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#4A2C2C] text-center mb-4"
        >
          Reserve a Table
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Secure your cozy corner at Coffee BOOK</p>

        {/* Main Card */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image inside card */}
          <div className="relative h-48 md:h-64">
            <img 
              src="/src/assets/images/breakfast/seat.jpeg" 
              alt="Cafe table setting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-serif text-[#4A2C2C] text-center mb-6">Make a Reservation</h2>
            
            <div className="space-y-6">
              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#FAF1E2] rounded-xl">
                  <span className="text-3xl mb-2 block">📞</span>
                  <h3 className="font-serif text-[#4A2C2C] mb-1">Call Us</h3>
                  <p className="text-[#7B4B3A]">0300 1234567</p>
                  <p className="text-xs text-[#7B4B3A] mt-1">9am - 11pm daily</p>
                </div>
                <div className="text-center p-4 bg-[#FAF1E2] rounded-xl">
                  <span className="text-3xl mb-2 block">💬</span>
                  <h3 className="font-serif text-[#4A2C2C] mb-1">WhatsApp</h3>
                  <p className="text-[#7B4B3A]">0300 1234567</p>
                  <p className="text-xs text-[#7B4B3A] mt-1">Message anytime</p>
                </div>
              </div>

              {/* PTCL Landline */}
              <div className="text-center p-4 bg-[#FAF1E2] rounded-xl">
                <span className="text-3xl mb-2 block">🏢</span>
                <h3 className="font-serif text-[#4A2C2C] mb-1">PTCL Landline</h3>
                <p className="text-[#7B4B3A]">042 111 123456</p>
                <p className="text-xs text-[#7B4B3A] mt-1">For corporate bookings</p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E8DCCC]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#7B4B3A]">or</span>
                </div>
              </div>

              {/* Email Option */}
              <div className="text-center p-4 bg-gradient-to-r from-[#C4A35A] to-[#B87C4B] rounded-xl text-white">
                <span className="text-3xl mb-2 block">✉️</span>
                <h3 className="font-serif text-white mb-1">Email Us</h3>
                <p className="text-white/90">reservations@coffeebook.pk</p>
                <p className="text-xs text-white/70 mt-1">Include your name, date, time, and number of guests</p>
              </div>
            </div>

            {/* Info Note */}
            <div className="mt-8 p-4 bg-[#FAF1E2] rounded-xl text-center">
              <p className="text-sm text-[#4A2C2C]">
                ✧ Tables held for 15 minutes after reservation time ✧
              </p>
              <p className="text-xs text-[#7B4B3A] mt-2">
                Walk-ins always welcome! We save tables for our guests.
              </p>
            </div>
          </div>
        </Motion.div>

        {/* Opening Hours Section */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Motion.div variants={fadeUp} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <span className="text-3xl mb-2 block">⏰</span>
            <h3 className="font-serif text-[#4A2C2C] mb-2">Opening Hours</h3>
            <p className="text-[#7B4B3A]">Monday – Friday: 9am – 11pm</p>
            <p className="text-[#7B4B3A]">Saturday – Sunday: 10am – 12am</p>
          </Motion.div>

          <Motion.div variants={fadeUp} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <span className="text-3xl mb-2 block">📍</span>
            <h3 className="font-serif text-[#4A2C2C] mb-2">Location</h3>
            <p className="text-[#7B4B3A]">42 Mall Road, Lahore</p>
            <p className="text-[#7B4B3A] text-sm mt-1">Free parking available</p>
          </Motion.div>
        </Motion.div>

        {/* Instagram Link */}
        <div className="text-center mt-12">
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
    </div>
  );
};

export default Reservation;