import React from 'react';
import { motion as Motion } from 'framer-motion';

const Bakery = () => {
  const bakeryItems = [
    { 
      id: 1, 
      name: 'Macarons (Per Pc)', 
      description: 'Delicate French style macarons with ganache, butter cream', 
      price: '299', 
      image: '/images/images/bakery/macroons.webp' 
    },
    { 
      id: 2, 
      name: 'Tres Leches Cake Slice', 
      description: 'Indulge in our heavenly Tres Leches Cake Slice. Moist sponge', 
      price: '900', 
      image: '/images/images/bakery/tres-leches-cake.jpg' 
    },
    { 
      id: 3, 
      name: 'Lotus Milk Cake Slice', 
      description: 'A heavenly blend of moist cake with lotus caramel', 
      price: '900', 
      image: '/images/images/bakery/lotus-milk-cake.jpg' 
    },
    { 
      id: 4, 
      name: 'Butter Croissant', 
      description: 'Flaky, golden, French pastry made with pure butter', 
      price: '350', 
      image: '/images/images/bakery/Butter-Croissant.jpg' 
    },
    { 
      id: 5, 
      name: 'Chocolate Chip Cookie', 
      description: 'Soft-baked with Belgian dark chocolate chunks', 
      price: '280', 
      image: '/images/images/bakery/chocholatechip-cookies.jfif' 
    },
    { 
      id: 6, 
      name: 'Cinnamon Roll', 
      description: 'Swirled with brown sugar & cream cheese frosting', 
      price: '420', 
      image: '/images/images/bakery/Cinnamon-Roll.jpg' 
    },
    { 
      id: 7, 
      name: 'Almond Danish', 
      description: 'Buttery pastry with almond frangipane', 
      price: '380', 
      image: '/images/images/bakery/Almond-Danish.jfif' 
    },
    { 
      id: 8, 
      name: 'Blueberry Muffin', 
      description: 'Loaded with fresh blueberries, streusel topping', 
      price: '320', 
      image: '/images/images/bakery/Blueberry-Muffin.jfif' 
    },
    { 
      id: 9, 
      name: 'Chocolate Brownie', 
      description: 'Fudgy, rich, with walnuts', 
      price: '300', 
      image: '/images/images/bakery/Chocolate-Brownie.jfif' 
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
          FRESH BAKERY
        </Motion.h1>
        <p className="text-center text-[#7B4B3A] mb-12">Baked fresh daily with love and finest ingredients</p>
        
        {/* 3 Columns Grid */}
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bakeryItems.map((item) => (
            <Motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-56 object-cover" 
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

export default Bakery;