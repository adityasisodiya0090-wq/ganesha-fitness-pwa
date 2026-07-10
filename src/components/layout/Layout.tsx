import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Loader from '../ui/Loader';
import PWAHelper from '../ui/PWAHelper';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-matte text-white relative selection:bg-gold-500 selection:text-matte antialiased overflow-x-hidden">
      {/* Noise overlay for high-end aesthetic texture */}
      <div className="noise-overlay" />
      
      {/* App level loader */}
      <Loader />
      
      {/* PWA features helper (Install flow and connection states) */}
      <PWAHelper />
      
      {/* Scroll state reset on route swaps */}
      <ScrollToTop />
      
      {/* Header Sticky Navigation */}
      <Navbar />
      
      {/* Core Dynamic Content Hub */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer Branding Hub */}
      <Footer />
    </div>
  );
}
