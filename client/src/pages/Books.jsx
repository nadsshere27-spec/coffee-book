import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { booksAPI } from '../services/api';

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mock data as fallback
  const mockBestsellers = React.useMemo(() => [
    { id: 1, title: 'The Wrath Of The Fallen', author: 'Amber V. Nicole', series: 'Gods & Monsters (Book 4)', year: '2026', image: '/images/images/books/horror/The-Wrath-Of-The-Fallen.jfif' },
    { id: 2, title: 'Empire Of Flame And Thorns', author: 'Amber V. Nicole', series: 'Thorn: Flame And Thorns (Book 1)', year: '2026', image: '/images/images/books/horror/Empire-Of-Flame-And-Thorns.jpg' },
    { id: 3, title: 'Isles Of The Emberdark', author: 'Brandon Sanderson', series: 'Cosmere Novel', year: '2026', image: '/images/images/books/horror/Isles-Of-The-Emberdark.png' }
  ], []);

  const fictionBooks = React.useMemo(() => [
    { id: 4, title: 'A Little Life', author: 'Hanya Yanagihara', image: '/images/images/books/fiction/A-Little-Life.jfif' },
    { id: 5, title: 'The Cruel Prince', author: 'Holly Black', series: 'The Folk Of The Air Series (Book 1)', image: '/images/images/books/fiction/The-Cruel-Prince.jfif' },
    { id: 6, title: 'Powerless', author: 'Lauren Roberts', series: 'The Powerless (Book 1)', image: '/images/images/books/fiction/Powerless.jfif' }
  ], []);

  const romanceBooks = React.useMemo(() => [
    { id: 7, title: 'Before the coffee gets cold', author: 'Toshikazu Kawaguchi', image: '/images/images/books/romance/Before the coffee gets cold.jfif' },
    { id: 8, title: 'Flame And Purple Of Thorns', author: 'Marion Blackwood', image: '/images/images/books/romance/Flame-And-Purple-Of-Thorns.jfif' },
    { id: 9, title: 'We Who Have No Gods', author: 'Unknown', series: 'The Acheron Order (Book 1)', image: '/images/images/books/romance/We-Who-Have-No-Gods.jfif' }
  ], []);

  const horrorBooks = React.useMemo(() => [
    { id: 10, title: 'The Wrath Of The Fallen', author: 'Amber V. Nicole', image: '/images/images/books/horror/The-Wrath-Of-The-Fallen.jfif' },
    { id: 11, title: 'Empire Of Flame And Thorns', author: 'Amber V. Nicole', image: '/images/images/books/horror/Empire-Of-Flame-And-Thorns.jpg' },
    { id: 12, title: 'Isles Of The Emberdark', author: 'Brandon Sanderson', image: '/images/images/books/horror/Isles-Of-The-Emberdark.png' }
  ], []);

  const [bestsellers, setBestsellers] = useState(mockBestsellers);

  const categories = [
    { id: 'fiction', name: 'Fiction' },
    { id: 'nonfiction', name: 'Non-Fiction' },
    { id: 'youngadults', name: 'Young Adults' },
    { id: 'children', name: 'Children' },
    { id: 'urdu', name: 'Urdu Books' }
  ];

  // 30 books for each category (only names) — keep as is
  const categoryBooks = {
    fiction: [
      'A Little Life', 'The Cruel Prince', 'Powerless', 'The Wrath Of The Fallen',
      'Empire Of Flame And Thorns', 'Isles Of The Emberdark', 'Flame And Purple Of Thorns',
      'We Who Have No Gods', 'Before the coffee gets cold', 'The Seven Husbands of Evelyn Hugo',
      'The Midnight Library', 'Where the Crawdads Sing', 'The Invisible Life of Addie LaRue',
      'The Night Circus', 'The Starless Sea', 'The Book Thief', 'All the Light We Cannot See',
      'The Kite Runner', 'A Thousand Splendid Suns', 'The Great Gatsby', 'Pride and Prejudice',
      'Jane Eyre', 'Wuthering Heights', '1984', 'Animal Farm', 'The Catcher in the Rye',
      'To Kill a Mockingbird', 'The Bell Jar', 'The Secret History', 'Babel'
    ],
    nonfiction: [
      'Atomic Habits', 'Ikigai', 'The Psychology of Money', 'Sapiens', 'Thinking Fast and Slow',
      'Educated', 'Becoming', 'The Power of Habit', 'Deep Work', 'The 7 Habits of Highly Effective People',
      'The Subtle Art of Not Giving a F*ck', 'Can\'t Hurt Me', 'The Four Agreements', 'The 48 Laws of Power',
      'Meditations', 'The Art of War', 'The Diary of a Young Girl', 'Man\'s Search for Meaning',
      'The Body Keeps the Score', 'Quiet', 'Dare to Lead', 'Grit', 'Originals', 'The Culture Map',
      'Factfulness', 'Enlightenment Now', 'The Sixth Extinction', 'The Immortal Life of Henrietta Lacks',
      'The Gene', 'The Emperor of All Maladies'
    ],
    youngadults: [
      'The Hunger Games', 'Divergent', 'The Fault in Our Stars', 'Six of Crows', 'Shadow and Bone',
      'Throne of Glass', 'A Court of Thorns and Roses', 'The Cruel Prince', 'Caraval', 'Once Upon a Broken Heart',
      'The Inheritance Games', 'One of Us Is Lying', 'We Were Liars', 'The Summer I Turned Pretty',
      'To All the Boys I\'ve Loved Before', 'The Selection', 'Shatter Me', 'Legend', 'The Maze Runner',
      'The Giver', 'The Perks of Being a Wallflower', 'Eleanor & Park', 'Fangirl', 'Aristotle and Dante',
      'The Hate U Give', 'Children of Blood and Bone', 'An Ember in the Ashes', 'Red Queen', 'Renegades'
    ],
    children: [
      'The Very Hungry Caterpillar', 'Goodnight Moon', 'Where the Wild Things Are', 'Charlotte\'s Web',
      'The Cat in the Hat', 'Green Eggs and Ham', 'The Giving Tree', 'The Lorax', 'Oh, the Places You\'ll Go!',
      'Matilda', 'Charlie and the Chocolate Factory', 'James and the Giant Peach', 'The BFG',
      'The Tale of Peter Rabbit', 'Winnie-the-Pooh', 'Alice\'s Adventures in Wonderland',
      'The Chronicles of Narnia', 'Harry Potter and the Sorcerer\'s Stone', 'Percy Jackson and the Olympians',
      'The Hobbit', 'The Secret Garden', 'Anne of Green Gables', 'Little Women', 'The Adventures of Tom Sawyer',
      'Treasure Island', 'The Jungle Book', 'Paddington Bear', 'Curious George', 'Madeline', 'Pippi Longstocking'
    ],
    urdu: [
      'Pepita', 'Bastat-e-Rafta', 'Aag Ka Darya', 'Raja Gidh', 'Udas Naslain', 'Toba Tek Singh',
      'Kulliyat-e-Iqbal', 'Bang-e-Dra', 'Shikwa Jawab-e-Shikwa', 'Zaviya', 'Dastan-e-Amir Hamza',
      'Umrao Jaan Ada', 'Mirat-ul-Uroos', 'Farishta', 'Aangan', 'Pir-e-Kamil', 'Jannat Kay Pattay',
      'Mushaf', 'Abdullah', 'Akhri Chattan', 'Khas-o-Khashak', 'Yakh Pinda', 'Abla Pahari',
      'Kalees', 'Maut Ki Kitab', 'Devta', 'Shahab Nama', 'Tazkira', 'Ghubar-e-Khatir', 'Zikr-e-Hafeez'
    ]
  };

  useEffect(() => {
    const fetchBestsellers = async () => {
      setLoading(true);
      try {
        const response = await booksAPI.getFeatured();
        if (response.data && response.data.data && response.data.data.length > 0) {
          setBestsellers(response.data.data);
        }
      } catch (err) {
        console.warn('API failed, using mock data:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const popupVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  const currentBooks = selectedCategory ? categoryBooks[selectedCategory.id] || [] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF6E9] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C4A35A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#7B4B3A]">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6E9] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Hero Section - Smaller */}
        <section className="relative h-[35vh] min-h-[250px] w-full rounded-xl overflow-hidden mb-10">
          <div className="absolute inset-0">
            <img 
              src="/images/images/library-background/landscape-library.jfif" 
              alt="Stack of books"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A2C2C]/80 to-[#2C1A1A]/60"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-3xl md:text-5xl font-serif font-light mb-2">Our Library</h1>
            <p className="text-sm text-white/80 max-w-2xl">Available books you can read in our cafe</p>
          </div>
        </section>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
              className="px-4 py-1.5 rounded-full bg-white text-[#4A2C2C] border border-[#E8DCCC] hover:bg-[#C4A35A] hover:text-white transition-all duration-300 text-sm font-medium shadow-sm"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Slide-Down Popup */}
        <AnimatePresence>
          {showPopup && selectedCategory && (
            <Motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-10 overflow-hidden"
            >
              <div className="bg-white rounded-xl shadow-md border border-[#E8DCCC] p-4">
                <div className="flex justify-between items-center mb-3 pb-1 border-b border-[#E8DCCC]">
                  <h2 className="text-lg font-serif text-[#4A2C2C]">{selectedCategory.name} Books</h2>
                  <button 
                    onClick={closePopup}
                    className="text-[#7B4B3A] hover:text-[#C4A35A] text-xl transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                  {currentBooks.map((book, index) => (
                    <div key={index} className="text-sm text-[#4A2C2C] py-0.5 px-1 hover:text-[#C4A35A] transition-colors">
                      {book}
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* INTERNATIONAL BESTSELLERS */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10"
        >
          <h2 className="text-xl font-serif text-[#4A2C2C] mb-3">International Bestsellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestsellers.map((book) => (
              <Motion.div
                key={book.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="bg-[#FAF1E2] p-3 flex items-center justify-center h-36">
                  <img src={book.image} alt={book.title} className="h-full w-auto object-contain" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-serif text-[#4A2C2C] font-medium mb-0.5">{book.title}</h3>
                  <p className="text-xs text-[#7B4B3A]">{book.author}</p>
                  {book.series && <p className="text-[10px] text-[#C4A35A] mt-0.5">{book.series}</p>}
                  <p className="text-[10px] text-[#7B4B3A] mt-1">{book.year}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* FICTION */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10"
        >
          <h2 className="text-xl font-serif text-[#4A2C2C] mb-3">Fiction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fictionBooks.map((book) => (
              <Motion.div
                key={book.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="bg-[#FAF1E2] p-3 flex items-center justify-center h-36">
                  <img src={book.image} alt={book.title} className="h-full w-auto object-contain" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-serif text-[#4A2C2C] font-medium mb-0.5">{book.title}</h3>
                  <p className="text-xs text-[#7B4B3A]">{book.author}</p>
                  {book.series && <p className="text-[10px] text-[#C4A35A] mt-0.5">{book.series}</p>}
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* ROMANCE */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10"
        >
          <h2 className="text-xl font-serif text-[#4A2C2C] mb-3">Romance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {romanceBooks.map((book) => (
              <Motion.div
                key={book.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="bg-[#FAF1E2] p-3 flex items-center justify-center h-36">
                  <img src={book.image} alt={book.title} className="h-full w-auto object-contain" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-serif text-[#4A2C2C] font-medium mb-0.5">{book.title}</h3>
                  <p className="text-xs text-[#7B4B3A]">{book.author}</p>
                  {book.series && <p className="text-[10px] text-[#C4A35A] mt-0.5">{book.series}</p>}
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* HORROR */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10"
        >
          <h2 className="text-xl font-serif text-[#4A2C2C] mb-3">Horror</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {horrorBooks.map((book) => (
              <Motion.div
                key={book.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="bg-[#FAF1E2] p-3 flex items-center justify-center h-36">
                  <img src={book.image} alt={book.title} className="h-full w-auto object-contain" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-serif text-[#4A2C2C] font-medium mb-0.5">{book.title}</h3>
                  <p className="text-xs text-[#7B4B3A]">{book.author}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* Reading Corner Note */}
        <div className="mt-10 p-5 bg-gradient-to-r from-[#4A2C2C] to-[#2C1A1A] rounded-xl text-center text-white">
          <span className="text-3xl mb-1 block">🪑</span>
          <h3 className="font-serif text-lg mb-1">The Reading Corner</h3>
          <p className="text-[#E8DCCC] text-xs max-w-2xl mx-auto">
            All books are available to read in our cafe. Grab your favorite, order a coffee, 
            and lose yourself in the pages.
          </p>
        </div>

        {/* Instagram Link */}
        <div className="text-center mt-5">
          <a 
            href="https://www.instagram.com/coffeebook.pk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C4A35A] hover:underline text-sm"
          >
            <span>📸</span> @coffeebook.pk
          </a>
        </div>

        {/* Optional: Show indicator when using mock data */}
        {error && (
          <p className="text-center text-xs text-[#C4A35A] mt-4">
            ℹ️ Using demo data (backend not connected)
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;