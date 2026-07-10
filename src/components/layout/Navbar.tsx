import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Dumbbell, ArrowRight, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import QrPreviewModal from '../ui/QrPreviewModal';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Membership Plans', path: '/plans' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Trainers', path: '/trainers' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const { pathname } = useLocation();

  // Handle transparent to frosted glass styling shift on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile navigation drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile nav drawer when route pathname transitions
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-gold-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo Brand Title */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="relative flex items-center justify-center w-11 h-11 border border-gold-500/35 rounded-sm overflow-hidden bg-gradient-to-br from-charcoal to-matte group-hover:border-gold-500 transition-colors duration-500">
              <Dumbbell className="w-5 h-5 text-gold-500 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-[0.15em] text-white block leading-none">
                GANESHA
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase block mt-1 font-semibold">
                FITNESS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-display text-xs tracking-wider uppercase font-semibold relative py-2 transition-colors duration-300 group ${
                    isActive ? 'text-gold-500' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  
                  {/* Gold Active Indicator Pill */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    /* Elegant Animated Hover Underline */
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold-500/70 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call To Action */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              type="button"
              id="desktop-open-qr"
              onClick={() => setIsQrOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-charcoal border border-gold-500/20 hover:border-gold-500 hover:bg-gold-500/10 rounded-sm text-xs font-mono text-gold-500 transition-all duration-300 uppercase tracking-wider cursor-pointer"
              title="Scan QR Code to view on your smartphone"
            >
              <QrCode className="w-3.5 h-3.5" />
              Mobile Pass
            </button>
            <a
              href="tel:+917249323535"
              className="flex items-center gap-2 font-mono text-xs text-gray-400 hover:text-gold-500 transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              +91 72493 23535
            </a>
            <Link to="/contact">
              <Button variant="primary" size="sm" className="px-5 py-2.5">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-gold-500 transition-colors duration-300 relative z-50"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden bg-matte/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-[290px] sm:w-[320px] z-40 lg:hidden bg-charcoal border-l border-gold-500/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] pt-24 pb-8 px-6 flex flex-col justify-between"
            >
              <motion.div 
                initial="closed"
                animate="opened"
                variants={{
                  opened: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                  }
                }}
                className="flex flex-col gap-5 mt-4"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      variants={{
                        closed: { opacity: 0, x: 20 },
                        opened: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`font-display text-lg tracking-wide uppercase font-bold block py-1.5 transition-colors duration-300 ${
                          isActive 
                            ? 'text-gold-500 pl-3 border-l-2 border-gold-500' 
                            : 'text-gray-400 hover:text-white hover:translate-x-1 inline-block'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex flex-col gap-4 border-t border-gold-500/10 pt-6"
              >
                <button
                  type="button"
                  id="mobile-open-qr"
                  onClick={() => {
                    setIsOpen(false);
                    setIsQrOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-matte border border-gold-500/15 hover:border-gold-500 text-xs font-mono text-gold-500 rounded-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  Mobile Preview QR
                </button>
                <a
                  href="tel:+917249323535"
                  className="flex items-center justify-center gap-2 font-mono text-xs text-gray-400 hover:text-gold-500 transition-colors duration-300 py-2"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  +91 72493 23535
                </a>
                <Link to="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="md" fullWidth className="flex gap-2">
                    Get Membership
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QrPreviewModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </>
  );
}

