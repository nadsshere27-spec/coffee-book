import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { menuAPI } from '../services/api';

const Breakfast = () => {
  // Mock data as fallback
  const mockBreakfastItems = React.useMemo(() => [
    { id: 1, name: 'Mexican Omelette', description: 'Spicy chorizo, jalapeños, cheddar cheese, sour cream', price: '1495', image: '/images/images/breakfast/mexican.jpeg' },
    { id: 2, name: 'Classic Waffles', description: 'Fresh fruit, maple syrup, whipped cream', price: '1395', image: '/images/images/breakfast/waffles.jpeg' },
    { id: 3, name: 'Scrambled Eggs', description: 'Fluffy eggs, sourdough toast, cherry tomatoes', price: '1295', image: '/images/images/breakfast/scramb.jpeg' },
    { id: 4, name: 'The Coffee BOOK Omelette', description: 'Stuffed with mushrooms, spinach, feta cheese', price: '1495', image: '/images/images/breakfast/special.jpeg' },
    { id: 5, name: 'French Toast', description: 'Brioche, berries, maple syrup, powdered sugar', price: '1395', image: '/images/images/breakfast/french-toast.jpg' },
    { id: 6, name: 'Avocado Toast', description: 'Sourdough, poached eggs, chili flakes, lemon', price: '1195', image: '/images/images/breakfast/avacado.jpeg' },
    { id: 7, name: 'Pancake Stack', description: 'Fluffy pancakes, honey butter, fresh berries', price: '1350', image: '/images/images/breakfast/pancake-stack.webp' },
    { id: 8, name: 'Eggs Benedict', description: 'Poached eggs, ham, hollandaise, English muffin', price: '1595', image: '/images/images/breakfast/benedict2.jpeg' },
    { id: 9, name: 'Breakfast Burrito', description: 'Scrambled eggs, sausage, cheese, salsa, tortilla', price: '1450', image: '/images/images/breakfast/555.jpeg' }
  ], []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBreakfast = async () => {
      try {
        const response = await menuAPI.getByCategory('breakfast');
        if (response.data && response.data.data && response.data.data.length > 0) {
          setItems(response.data.data);
        } else {
          setItems(mockBreakfastItems);
        }
      } catch (err) {
        console.warn('API failed, using mock data:', err.message);
        setError(true);
        setItems(mockBreakfastItems);
      } finally {
        setLoading(false);
      }
    };
    fetchBreakfast();
  }, [mockBreakfastItems]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF6E9] py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C4A35A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#7B4B3A]">Loading breakfast items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#4A2C2C] text-center mb-4"
        >
          ALL-DAY BREAKFAST
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Served fresh from morning till evening</p>
        
        {/* 3 Columns Grid */}
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <Motion.div
              key={item.id || item._id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-64 object-cover bg-[#FAF1E2]" 
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-serif text-[#4A2C2C] mb-1">{item.name}</h3>
                <p className="text-xs text-[#7B4B3A] mb-3">{item.description}</p>
                <p className="text-lg text-[#C4A35A] font-medium">RS {item.price}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
        
        {/* Optional: Show indicator when using mock data */}
        {error && (
          <p className="text-center text-xs text-[#C4A35A] mt-8">
            ℹ️ Using demo data (backend not connected)
          </p>
        )}
      </div>
    </div>
  );
};

export default Breakfast;