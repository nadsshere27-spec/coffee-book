import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { menuAPI } from '../services/api';

const HotCoffee = () => {
  // Mock data as fallback (defined outside component or use useMemo)
  const mockHotCoffeeItems = React.useMemo(() => [
    { id: 1, name: 'Espresso', description: 'Strong and bold single shot', price: '350', image: '/images/images/coffee/hot/hot-expresso.png' },
    { id: 2, name: 'Cappuccino', description: 'Equal parts espresso, steamed milk and foam', price: '450', image: '/images/images/coffee/hot/hot-cappuccino.png' },
    { id: 3, name: 'Latte', description: 'Espresso with steamed milk and light foam', price: '470', image: '/images/images/coffee/hot/hot-latte.png' },
    { id: 4, name: 'Caramel Latte', description: 'Espresso with caramel and steamed milk', price: '480', image: '/images/images/coffee/hot/hot-caramel-latte.png' },
    { id: 5, name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: '490', image: '/images/images/coffee/hot/hot-mocha.png' },
    { id: 6, name: 'Flat White', description: 'Double espresso with silky microfoam', price: '470', image: '/images/images/coffee/hot/109.png' },
    { id: 7, name: 'Americano', description: 'Espresso with hot water', price: '380', image: '/images/images/coffee/hot/hot-americano.png' },
    { id: 8, name: 'Macchiato', description: 'Espresso with a dash of steamed milk', price: '420', image: '/images/images/coffee/hot/33333.webp' },
    { id: 9, name: 'Affogato', description: 'Espresso poured over vanilla ice cream', price: '520', image: '/images/images/coffee/hot/hot-affogato.png' }
  ], []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHotCoffee = async () => {
      try {
        const response = await menuAPI.getByCategory('hot');
        if (response.data && response.data.data && response.data.data.length > 0) {
          setItems(response.data.data);
        } else {
          setItems(mockHotCoffeeItems);
        }
      } catch (err) {
        console.warn('API failed, using mock data:', err.message);
        setError(true);
        setItems(mockHotCoffeeItems);
      } finally {
        setLoading(false);
      }
    };
    fetchHotCoffee();
  }, [mockHotCoffeeItems]); // ✅ Added dependency

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
          <p className="text-[#7B4B3A]">Loading hot coffee...</p>
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
          HOT COFFEE
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Crafted with love, brewed to perfection</p>
        
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
                className="w-full h-64 object-contain bg-[#FAF1E2] p-2" 
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

export default HotCoffee;