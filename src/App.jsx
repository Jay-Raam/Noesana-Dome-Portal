import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import Shared Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import { ToastProvider } from './components/Toast.jsx';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Technology = lazy(() => import('./pages/Technology.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const OrderStatus = lazy(() => import('./pages/OrderStatus.jsx'));
const Algorithms = lazy(() => import('./pages/Algorithms.jsx'));
const Sleep = lazy(() => import('./pages/Sleep.jsx'));
const Validation = lazy(() => import('./pages/Validation.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const ScienceBoard = lazy(() => import('./pages/ScienceBoard.jsx'));
const Press = lazy(() => import('./pages/Press.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const HardwareSpecs = lazy(() => import('./pages/HardwareSpecs.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Scroll to top helper component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-black text-slate-100 flex flex-col selection:bg-noesana-orange selection:text-black">
          {/* Helper to reset scroll on route transition */}
          <ScrollToTop />
          
          {/* Common Header */}
          <Navbar />

          {/* Dynamic Route Pages */}
          <main className="flex-grow">
            <Suspense fallback={
              <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-noesana-orange/20 border-t-noesana-orange rounded-full animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Loading Neural Logs...</span>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/hardware" element={<HardwareSpecs />} />
                <Route path="/technology/algorithms" element={<Algorithms />} />
                <Route path="/technology/sleep" element={<Sleep />} />
                <Route path="/technology/validation" element={<Validation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="/about" element={<About />} />
                <Route path="/science" element={<ScienceBoard />} />
                <Route path="/press" element={<Press />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Common Footer */}
          <Footer />

          {/* Global UI Components */}
          <ScrollToTopButton />
          <CookieConsent />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
