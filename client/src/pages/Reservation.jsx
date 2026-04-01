import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import { reservationAPI } from '../services/api';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState('');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
    '9:00 PM', '10:00 PM'
  ];

  const occasions = [
    'Just Visiting', 'Birthday', 'Anniversary', 'Book Club Meeting',
    'Date Night', 'Business Meeting', 'Study Session', 'Other'
  ];

  // ✅ Wrap checkAvailability in useCallback
  const checkAvailability = useCallback(async () => {
    if (!formData.date || !formData.time) return;
    
    try {
      const response = await reservationAPI.checkAvailability(
        formData.date, 
        formData.time, 
        parseInt(formData.guests)
      );
      setAvailability(response.data);
    } catch (err) {
      console.error('Availability check failed:', err);
      setAvailability(null);
    }
  }, [formData.date, formData.time, formData.guests]); // ✅ Dependencies added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Effect to check availability when relevant fields change
  useEffect(() => {
    if (formData.date && formData.time) {
      checkAvailability();
    }
  }, [formData.date, formData.time, formData.guests, checkAvailability]); // ✅ All dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await reservationAPI.create(formData);
      if (response.data && response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '', phone: '', email: '', date: '', time: '',
          guests: '2', occasion: '', specialRequests: ''
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (err) {
      console.error('Reservation error:', err);
      setError(err.response?.data?.message || 'Failed to create reservation. Please try again.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const guestsExceedAvailable = availability && !availability.available;

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#4A2C2C] text-center mb-4"
        >
          Reserve a Table
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Secure your cozy corner at Coffee BOOK</p>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative h-48 md:h-64">
            <img 
              src="/images/images/breakfast/seat.jpeg" 
              alt="Cafe table setting"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-serif text-[#4A2C2C] text-center mb-6">Make a Reservation</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-500 text-green-600 rounded-lg text-center">
                ✓ Reservation confirmed! We'll send a confirmation email shortly.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-500 text-red-600 rounded-lg text-center">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {availability && (
                <div className={`p-4 rounded-xl ${
                  guestsExceedAvailable ? 'bg-red-100 border border-red-500' : 
                  availability.availableSeats < 15 ? 'bg-yellow-100 border border-yellow-500' : 'bg-green-100 border border-green-500'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {guestsExceedAvailable ? '❌' : availability.availableSeats < 15 ? '⚠️' : '✅'}
                    </span>
                    <div>
                      <p className={`font-medium ${
                        guestsExceedAvailable ? 'text-red-600' : 
                        availability.availableSeats < 15 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {guestsExceedAvailable 
                          ? `Only ${availability.availableSeats} seats available`
                          : `${availability.availableSeats} seats available`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Occasion (Optional)</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A]"
                >
                  <option value="">Select occasion</option>
                  {occasions.map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A2C2C] mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special requests? (e.g., preferred seating, allergies, etc.)"
                  className="w-full px-4 py-3 rounded-lg bg-[#FAF1E2] border border-[#E8DCCC] text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#C4A35A] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || guestsExceedAvailable}
                className="w-full bg-[#C4A35A] hover:bg-[#B87C4B] text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Booking...
                  </span>
                ) : (
                  'Confirm Reservation 📖'
                )}
              </button>
            </form>
          </div>
        </Motion.div>

        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: '⏰', title: 'Hold Time', desc: 'Tables held for 15 minutes' },
            { icon: '🕊️', title: 'No Cancellation Fee', desc: 'Just let us know if plans change' },
            { icon: '🪑', title: 'Maximum Guests', desc: 'Up to 10 guests per table' }
          ].map((item, index) => (
            <Motion.div
              key={index}
              variants={fadeUp}
              className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="font-serif font-medium text-[#4A2C2C] mb-1">{item.title}</h3>
              <p className="text-sm text-[#7B4B3A]">{item.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>

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