import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Dynamically lazy-loaded pages for high performance code-splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Plans = lazy(() => import('./pages/Plans'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));

// Premium dynamic page transition spinner fallback
const SuspenseFallback = () => (
  <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-matte gap-4">
    <div className="relative flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-gold-500/10 border-t-gold-500 rounded-full animate-spin" />
      <div className="absolute inset-0 bg-gold-500/5 rounded-full blur-md" />
    </div>
    <span className="font-mono text-[9px] text-gold-500 tracking-[0.3em] uppercase font-bold animate-pulse">
      LOADING SANCTUARY...
    </span>
  </div>
);

export default function App() {
  useEffect(() => {
    // Preload heavy dynamic routes when browser is idle to enable instant navigation
    const handlePreload = () => {
      const routes = [
        () => import('./pages/About'),
        () => import('./pages/Facilities'),
        () => import('./pages/Plans'),
        () => import('./pages/Trainers'),
        () => import('./pages/Gallery'),
        () => import('./pages/Reviews'),
        () => import('./pages/Contact'),
      ];

      const runPreload = () => {
        routes.forEach((preload) => {
          try {
            preload();
          } catch (e) {
            console.warn('Preload failed', e);
          }
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          runPreload();
        });
      } else {
        setTimeout(runPreload, 2000);
      }
    };

    if (document.readyState === 'complete') {
      handlePreload();
    } else {
      window.addEventListener('load', handlePreload);
      return () => window.removeEventListener('load', handlePreload);
    }
  }, []);

  return (
    <HashRouter>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

