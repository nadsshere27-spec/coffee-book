const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

// Force DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const MenuItem = require('./models/MenuItem');
const Book = require('./models/Book');

// ==================== ALL HOT COFFEE ITEMS (9) ====================
const hotCoffeeItems = [
  { name: 'Espresso', description: 'Strong and bold single shot', price: 350, category: 'hot', image: '/images/coffee/hot/hot-expresso.png', isAvailable: true, isFeatured: true, displayOrder: 1 },
  { name: 'Cappuccino', description: 'Equal parts espresso, steamed milk and foam', price: 450, category: 'hot', image: '/images/coffee/hot/hot-cappuccino.png', isAvailable: true, isFeatured: true, displayOrder: 2 },
  { name: 'Latte', description: 'Espresso with steamed milk and light foam', price: 470, category: 'hot', image: '/images/coffee/hot/hot-latte.png', isAvailable: true, isFeatured: true, displayOrder: 3 },
  { name: 'Caramel Latte', description: 'Espresso with caramel and steamed milk', price: 480, category: 'hot', image: '/images/coffee/hot/hot-caramel-latte.png', isAvailable: true, isFeatured: true, displayOrder: 4 },
  { name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 490, category: 'hot', image: '/images/coffee/hot/hot-mocha.png', isAvailable: true, isFeatured: false, displayOrder: 5 },
  { name: 'Flat White', description: 'Double espresso with silky microfoam', price: 470, category: 'hot', image: '/images/coffee/hot/109.png', isAvailable: true, isFeatured: false, displayOrder: 6 },
  { name: 'Americano', description: 'Espresso with hot water', price: 380, category: 'hot', image: '/images/coffee/hot/hot-americano.png', isAvailable: true, isFeatured: false, displayOrder: 7 },
  { name: 'Macchiato', description: 'Espresso with a dash of steamed milk', price: 420, category: 'hot', image: '/images/coffee/hot/33333.webp', isAvailable: true, isFeatured: false, displayOrder: 8 },
  { name: 'Affogato', description: 'Espresso poured over vanilla ice cream', price: 520, category: 'hot', image: '/images/coffee/hot/hot-affogato.png', isAvailable: true, isFeatured: false, displayOrder: 9 }
];

// ==================== ALL COLD COFFEE ITEMS (9) ====================
const coldCoffeeItems = [
  { name: 'Iced Caramel Latte', description: 'Espresso, caramel sauce, cold milk over ice', price: 675, category: 'cold', image: '/images/coffee/cold/ice-latte.png', isAvailable: true, isFeatured: true, displayOrder: 10 },
  { name: 'Cold Brew', description: '24-hour slow steeped, served on ice', price: 575, category: 'cold', image: '/images/coffee/cold/cold-brew.png', isAvailable: true, isFeatured: true, displayOrder: 11 },
  { name: 'Iced Vanilla Latte', description: 'Espresso, vanilla syrup, cold milk over ice', price: 650, category: 'cold', image: '/images/coffee/cold/iced-vanilla latte.jpg', isAvailable: true, isFeatured: false, displayOrder: 12 },
  { name: 'Iced Mocha', description: 'Espresso, chocolate sauce, cold milk over ice', price: 680, category: 'cold', image: '/images/coffee/cold/icedd-mocha.png', isAvailable: true, isFeatured: false, displayOrder: 13 },
  { name: 'Nitro Cold Brew', description: 'Smooth nitrogen-infused cold brew', price: 695, category: 'cold', image: '/images/coffee/cold/cold-nitro-brew.webp', isAvailable: true, isFeatured: false, displayOrder: 14 },
  { name: 'Iced Capachino', description: 'Chilled cappuccino with foam', price: 550, category: 'cold', image: '/images/coffee/cold/ice-capachino.png', isAvailable: true, isFeatured: false, displayOrder: 15 },
  { name: 'Iced Hazelnut Latte', description: 'Espresso, hazelnut syrup, cold milk over ice', price: 670, category: 'cold', image: '/images/coffee/cold/hazelnut-iced.webp', isAvailable: true, isFeatured: false, displayOrder: 16 },
  { name: 'Iced Coconut Latte', description: 'Espresso, coconut milk, served over ice', price: 690, category: 'cold', image: '/images/coffee/cold/iced-coconut-latte.webp', isAvailable: true, isFeatured: false, displayOrder: 17 },
  { name: 'Iced Matcha', description: 'Matcha green tea with milk over ice', price: 720, category: 'cold', image: '/images/coffee/cold/iced-matcha.jpg', isAvailable: true, isFeatured: false, displayOrder: 18 }
];

// ==================== ALL BREAKFAST ITEMS (9) ====================
const breakfastItems = [
  { name: 'Mexican Omelette', description: 'Spicy chorizo, jalapeños, cheddar cheese, sour cream', price: 1495, category: 'breakfast', image: '/images/breakfast/mexican.jpeg', isAvailable: true, isFeatured: true, displayOrder: 19 },
  { name: 'Classic Waffles', description: 'Fresh fruit, maple syrup, whipped cream', price: 1395, category: 'breakfast', image: '/images/breakfast/waffles.jpeg', isAvailable: true, isFeatured: false, displayOrder: 20 },
  { name: 'Scrambled Eggs', description: 'Fluffy eggs, sourdough toast, cherry tomatoes', price: 1295, category: 'breakfast', image: '/images/breakfast/scramb.jpeg', isAvailable: true, isFeatured: false, displayOrder: 21 },
  { name: 'The Coffee BOOK Omelette', description: 'Stuffed with mushrooms, spinach, feta cheese', price: 1495, category: 'breakfast', image: '/images/breakfast/special.jpeg', isAvailable: true, isFeatured: true, displayOrder: 22 },
  { name: 'French Toast', description: 'Brioche, berries, maple syrup, powdered sugar', price: 1395, category: 'breakfast', image: '/images/breakfast/french-toast.jpg', isAvailable: true, isFeatured: false, displayOrder: 23 },
  { name: 'Avocado Toast', description: 'Sourdough, poached eggs, chili flakes, lemon', price: 1195, category: 'breakfast', image: '/images/breakfast/avacado.jpeg', isAvailable: true, isFeatured: false, displayOrder: 24 },
  { name: 'Pancake Stack', description: 'Fluffy pancakes, honey butter, fresh berries', price: 1350, category: 'breakfast', image: '/images/breakfast/pancake-stack.webp', isAvailable: true, isFeatured: false, displayOrder: 25 },
  { name: 'Eggs Benedict', description: 'Poached eggs, ham, hollandaise, English muffin', price: 1595, category: 'breakfast', image: '/images/breakfast/benedict2.jpeg', isAvailable: true, isFeatured: false, displayOrder: 26 },
  { name: 'Breakfast Burrito', description: 'Scrambled eggs, sausage, cheese, salsa, tortilla', price: 1450, category: 'breakfast', image: '/images/breakfast/555.jpeg', isAvailable: true, isFeatured: false, displayOrder: 27 }
];

// ==================== ALL BAKERY ITEMS (9) ====================
const bakeryItems = [
  { name: 'Macarons (Per Pc)', description: 'Delicate French style macarons with ganache, butter cream', price: 299, category: 'bakery', image: '/images/bakery/macroons.webp', isAvailable: true, isFeatured: true, displayOrder: 28 },
  { name: 'Tres Leches Cake Slice', description: 'Heavenly Tres Leches Cake Slice. Moist sponge', price: 900, category: 'bakery', image: '/images/bakery/tres-leches-cake.jpg', isAvailable: true, isFeatured: false, displayOrder: 29 },
  { name: 'Lotus Milk Cake Slice', description: 'A heavenly blend of moist cake with lotus caramel', price: 900, category: 'bakery', image: '/images/bakery/lotus-milk-cake.jpg', isAvailable: true, isFeatured: false, displayOrder: 30 },
  { name: 'Butter Croissant', description: 'Flaky, golden, French pastry made with pure butter', price: 350, category: 'bakery', image: '/images/bakery/Butter-Croissant.jpg', isAvailable: true, isFeatured: false, displayOrder: 31 },
  { name: 'Chocolate Chip Cookie', description: 'Soft-baked with Belgian dark chocolate chunks', price: 280, category: 'bakery', image: '/images/bakery/chocholatechip-cookies.jfif', isAvailable: true, isFeatured: false, displayOrder: 32 },
  { name: 'Cinnamon Roll', description: 'Swirled with brown sugar & cream cheese frosting', price: 420, category: 'bakery', image: '/images/bakery/Cinnamon-Roll.jpg', isAvailable: true, isFeatured: false, displayOrder: 33 },
  { name: 'Almond Danish', description: 'Buttery pastry with almond frangipane', price: 380, category: 'bakery', image: '/images/bakery/Almond-Danish.jfif', isAvailable: true, isFeatured: false, displayOrder: 34 },
  { name: 'Blueberry Muffin', description: 'Loaded with fresh blueberries, streusel topping', price: 320, category: 'bakery', image: '/images/bakery/Blueberry-Muffin.jfif', isAvailable: true, isFeatured: false, displayOrder: 35 },
  { name: 'Chocolate Brownie', description: 'Fudgy, rich, with walnuts', price: 300, category: 'bakery', image: '/images/bakery/Chocolate-Brownie.jfif', isAvailable: true, isFeatured: false, displayOrder: 36 }
];

// ==================== ALL BOOKS (12 books with correct categories) ====================
const books = [
  // International Bestsellers (3) — using 'fiction' for bestsellers
  { title: 'The Wrath Of The Fallen', author: 'Amber V. Nicole', genre: 'fiction', rating: 4.8, quote: 'The darkness within is the light you seek.', description: 'Gods & Monsters series', year: 2026, image: '/images/books/horror/The-Wrath-Of-The-Fallen.jfif', isFeatured: true, displayOrder: 1 },
  { title: 'Empire Of Flame And Thorns', author: 'Amber V. Nicole', genre: 'fiction', rating: 4.9, quote: 'Fire and shadow, power and pain.', description: 'Thorn: Flame And Thorns series', year: 2026, image: '/images/books/horror/Empire-Of-Flame-And-Thorns.jpg', isFeatured: true, displayOrder: 2 },
  { title: 'Isles Of The Emberdark', author: 'Brandon Sanderson', genre: 'fiction', rating: 4.9, quote: 'In darkness, find your light.', description: 'Cosmere Novel', year: 2026, image: '/images/books/horror/Isles-Of-The-Emberdark.png', isFeatured: true, displayOrder: 3 },

  // Fiction Section (3 books)
  { title: 'A Little Life', author: 'Hanya Yanagihara', genre: 'fiction', rating: 4.8, quote: 'A story of friendship and survival.', description: 'A modern literary masterpiece', year: 2015, image: '/images/books/fiction/A-Little-Life.jfif', isFeatured: true, displayOrder: 4 },
  { title: 'The Cruel Prince', author: 'Holly Black', genre: 'fiction', rating: 4.7, quote: 'Power is much easier to acquire than it is to hold.', description: 'The Folk Of The Air Series', year: 2018, image: '/images/books/fiction/The-Cruel-Prince.jfif', isFeatured: true, displayOrder: 5 },
  { title: 'Powerless', author: 'Lauren Roberts', genre: 'fiction', rating: 4.9, quote: 'The powerless become powerful.', description: 'The Powerless Series', year: 2023, image: '/images/books/fiction/Powerless.jfif', isFeatured: true, displayOrder: 6 },

  // Romance Section (3 books) — using 'fiction'
  { title: 'Before the coffee gets cold', author: 'Toshikazu Kawaguchi', genre: 'fiction', rating: 4.7, quote: 'Time travel through coffee.', description: 'A heartwarming tale', year: 2019, image: '/images/books/romance/Before the coffee gets cold.jfif', isFeatured: true, displayOrder: 7 },
  { title: 'Flame And Purple Of Thorns', author: 'Marion Blackwood', genre: 'fiction', rating: 4.6, quote: 'Love burns bright.', description: 'Romance fantasy', year: 2024, image: '/images/books/romance/Flame-And-Purple-Of-Thorns.jfif', isFeatured: false, displayOrder: 8 },
  { title: 'We Who Have No Gods', author: 'Unknown', genre: 'fiction', rating: 4.5, quote: 'Gods fall, love rises.', description: 'The Acheron Order', year: 2025, image: '/images/books/romance/We-Who-Have-No-Gods.jfif', isFeatured: false, displayOrder: 9 },

  // Horror Section (3 books) — using 'fiction'
  { title: 'The Wrath Of The Fallen', author: 'Amber V. Nicole', genre: 'fiction', rating: 4.8, quote: 'Fear is a weapon.', description: 'Horror fantasy', year: 2026, image: '/images/books/horror/The-Wrath-Of-The-Fallen.jfif', isFeatured: false, displayOrder: 10 },
  { title: 'Empire Of Flame And Thorns', author: 'Amber V. Nicole', genre: 'fiction', rating: 4.9, quote: 'Darkness consumes.', description: 'Horror series', year: 2026, image: '/images/books/horror/Empire-Of-Flame-And-Thorns.jpg', isFeatured: false, displayOrder: 11 },
  { title: 'Isles Of The Emberdark', author: 'Brandon Sanderson', genre: 'fiction', rating: 4.9, quote: 'Light in shadow.', description: 'Fantasy epic', year: 2026, image: '/images/books/horror/Isles-Of-The-Emberdark.png', isFeatured: false, displayOrder: 12 }
];

// ==================== MERGE ALL MENU ITEMS ====================
const allMenuItems = [...hotCoffeeItems, ...coldCoffeeItems, ...breakfastItems, ...bakeryItems];

// ==================== SEED FUNCTION ====================
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await MenuItem.deleteMany();
    await Book.deleteMany();
    console.log('🗑️ Cleared existing data');

    // Insert all menu items
    await MenuItem.insertMany(allMenuItems);
    console.log(`✅ Added ${allMenuItems.length} menu items`);

    // Insert all books
    await Book.insertMany(books);
    console.log(`✅ Added ${books.length} books`);

    console.log('\n🎉 SEED COMPLETED SUCCESSFULLY!');
    console.log(`📊 Total: ${allMenuItems.length + books.length} items added`);
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();