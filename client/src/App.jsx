import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import PageTransition from './components/ui/PageTransition';
import Loading from './components/ui/Loading';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CafeMenu = lazy(() => import('./pages/CafeMenu'));
const HotCoffee = lazy(() => import('./pages/HotCoffee'));
const ColdCoffee = lazy(() => import('./pages/ColdCoffee'));
const Breakfast = lazy(() => import('./pages/Breakfast'));
const Bakery = lazy(() => import('./pages/Bakery'));
const Books = lazy(() => import('./pages/Books'));
const Contact = lazy(() => import('./pages/Contact'));
const Reservation = lazy(() => import('./pages/Reservation'));

// Route transition variants
const routeVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

// Main routes component (no Router here!)
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Brewing your experience..." />}>
              <PageTransition variants={routeVariants}>
                <Home />
              </PageTransition>
            </Suspense>
          } />
          <Route path="cafe-menu" element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Loading menu..." />}>
              <PageTransition variants={routeVariants}>
                <CafeMenu />
              </PageTransition>
            </Suspense>
          } />
          <Route path="hot-coffee" element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Brewing hot coffee..." />}>
              <PageTransition variants={routeVariants}>
                <HotCoffee />
              </PageTransition>
            </Suspense>
          } />
          <Route path="cold-coffee" element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Chilling cold coffee..." />}>
              <PageTransition variants={routeVariants}>
                <ColdCoffee />
              </PageTransition>
            </Suspense>
          } />
          <Route path="breakfast" element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Preparing breakfast..." />}>
              <PageTransition variants={routeVariants}>
                <Breakfast />
              </PageTransition>
            </Suspense>
          } />
          <Route path="bakery" element={
            <Suspense fallback={<Loading fullScreen type="coffee" text="Fresh bakery items..." />}>
              <PageTransition variants={routeVariants}>
                <Bakery />
              </PageTransition>
            </Suspense>
          } />
          <Route path="books" element={
            <Suspense fallback={<Loading fullScreen type="book" text="Turning pages..." />}>
              <PageTransition variants={routeVariants}>
                <Books />
              </PageTransition>
            </Suspense>
          } />
          <Route path="contact" element={
            <Suspense fallback={<Loading fullScreen text="Opening contact..." />}>
              <PageTransition variants={routeVariants}>
                <Contact />
              </PageTransition>
            </Suspense>
          } />
          <Route path="reservation" element={
            <Suspense fallback={<Loading fullScreen text="Finding tables..." />}>
              <PageTransition variants={routeVariants}>
                <Reservation />
              </PageTransition>
            </Suspense>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return <AppRoutes />;
}

export default App;