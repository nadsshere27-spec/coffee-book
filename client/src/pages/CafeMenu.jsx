import React from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const CafeMenu = () => {
  const menuCategories = [
    { 
      id: 1, 
      title: 'HOT COFFEE', 
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?w=800', 
      link: '/hot-coffee' 
    },
    { 
      id: 2, 
      title: 'COLD COFFEE', 
      image: '/src/assets/images/cards/22.jpeg', 
      link: '/cold-coffee' 
    },
    { 
      id: 3, 
      title: 'BREAKFAST', 
      image: '/src/assets/images/cards/222.jpeg', 
      link: '/breakfast' 
    },
    { 
      id: 4, 
      title: 'BAKERY', 
      image: 'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?w=800', 
      link: '/bakery' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDF6E9]">
      {/* Hero Section with Background Image */}
      <section className="relative h-[70vh] min-h-[500px] w-full">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?w=1600" 
            alt="Coffee on table with menu board"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif text-white font-light tracking-wide"
          >
            CAFE MENU
          </Motion.h1>
        </div>
      </section>

      {/* 4 Category Cards - 2 rows, 2 columns */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuCategories.map((item) => (
            <Link to={item.link} key={item.id}>
              <Motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group h-[450px] overflow-hidden rounded-2xl cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-serif text-white font-light tracking-wide mb-2">
                    {item.title}
                  </h2>
                  <div className="w-12 h-px bg-[#C4A35A] mx-auto"></div>
                </div>
              </Motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CafeMenu;