import React from 'react';
import { motion as Motion } from 'framer-motion';

const ColdCoffee = () => {
  const coldCoffeeItems = [
    { 
      id: 1, 
      name: 'Iced Caramel Latte', 
      description: 'Espresso, caramel sauce, cold milk over ice', 
      price: '675', 
      image: '/images/images/coffee/cold/ice-latte.png' 
    },
    { 
      id: 2, 
      name: 'Cold Brew', 
      description: '24-hour slow steeped, served on ice', 
      price: '575', 
      image: '/images/images/coffee/cold/cold-brew.png' 
    },
    { 
      id: 3, 
      name: 'Iced Vanilla Latte', 
      description: 'Espresso, vanilla syrup, cold milk over ice', 
      price: '650', 
      image: '/images/images/coffee/cold/iced-vanilla latte.jpg' 
    },
    { 
      id: 4, 
      name: 'Iced Mocha', 
      description: 'Espresso, chocolate sauce, cold milk over ice', 
      price: '680', 
      image: '/images/images/coffee/cold/icedd-mocha.png' 
    },
    { 
      id: 5, 
      name: 'Nitro Cold Brew', 
      description: 'Smooth nitrogen-infused cold brew', 
      price: '695', 
      image: '/images/images/coffee/cold/cold-nitro-brew.webp' 
    },
    { 
      id: 6, 
      name: 'Iced Capachino', 
      description: 'Espresso with cold water and ice', 
      price: '550', 
      image: '/images/images/coffee/cold/ice-capachino.png' 
    },
    { 
      id: 7, 
      name: 'Iced Hazelnut Latte', 
      description: 'Espresso, hazelnut syrup, cold milk over ice', 
      price: '670', 
      image: '/images/images/coffee/cold/hazelnut-iced.webp' 
    },
    { 
      id: 8, 
      name: 'Iced Coconut Latte', 
      description: 'Espresso, coconut milk, served over ice', 
      price: '690', 
      image: '/images/images/coffee/cold/iced-coconut-latte.webp' 
    },
    { 
      id: 9, 
      name: 'Iced Matcha', 
      description: 'Blended chocolate, espresso, ice cream', 
      price: '720', 
      image: '/images/images/coffee/cold/iced-matcha.jpg' 
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#4A2C2C] text-center mb-4"
        >
          COLD COFFEE
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Refreshing chilled brews for warm days</p>
        
        {/* 3 Columns Grid */}
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coldCoffeeItems.map((item) => (
            <Motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-64 object-contain" 
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-serif text-[#4A2C2C] mb-1">{item.name}</h3>
                <p className="text-xs text-[#7B4B3A] mb-3">{item.description}</p>
                <p className="text-lg text-[#C4A35A] font-medium">RS {item.price}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </div>
  );
};

export default ColdCoffee;