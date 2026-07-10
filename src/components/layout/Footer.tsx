import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Facebook, Youtube } from 'lucide-react';
import Container from '../ui/Container';
import { NAV_ITEMS } from './Navbar';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-gold-500/15 text-gray-400 font-sans relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Upper Content Section */}
      <div className="py-16 sm:py-24">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group self-start">
              <div className="relative flex items-center justify-center w-11 h-11 border border-gold-500/40 rounded-sm bg-matte group-hover:border-gold-500 transition-colors duration-500">
                <Dumbbell className="w-5 h-5 text-gold-500 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-[0.15em] text-white block leading-none">
                  GANESHA
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-gold-500 uppercase block mt-1 font-semibold">
                  FITNESS
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 font-sans">
              Shaping elite mindsets and powerful physiques in Shikrapur, Pune. Ganesha Fitness represents premium-tier athletic spaces, elite personal trainers, and high-performance equipment.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://www.instagram.com/shri_ganesha_fitness_crossfit/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-charcoal hover:bg-gradient-gold hover:text-matte text-gray-300 flex items-center justify-center border border-gold-500/10 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-charcoal hover:bg-gradient-gold hover:text-matte text-gray-300 flex items-center justify-center border border-gold-500/10 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-charcoal hover:bg-gradient-gold hover:text-matte text-gray-300 flex items-center justify-center border border-gold-500/10 hover:border-transparent transition-all duration-300 hover:scale-105 shadow-md"
                aria-label="Youtube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-xs border-l-2 border-gold-500 pl-3">
              Explore Gym
            </h3>
            <ul className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-sm font-sans font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-gold-500 hover:translate-x-1.5 inline-block transition-all duration-300 text-gray-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Operation Hours */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-xs border-l-2 border-gold-500 pl-3">
              Gym Hours
            </h3>
            <div className="flex flex-col gap-4 text-sm font-sans">
              <div className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white tracking-wide">Monday - Saturday</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">05:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white tracking-wide">Sunday</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-xs border-l-2 border-gold-500 pl-3">
              Location Info
            </h3>
            <div className="flex flex-col gap-4 text-sm font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400 text-xs sm:text-sm">
                  Gajanan Karyalaya, Pabal Rd, chowk, Shikrapur, Maharashtra 412208
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-gold-500 shrink-0" />
                <a href="tel:+917249323535" className="hover:text-gold-500 transition-colors duration-300 font-mono text-xs sm:text-sm">
                  +91 72493 23535
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4.5 h-4.5 text-gold-500 shrink-0" />
                <a
                  href="https://wa.me/917249323535"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold-500 transition-colors duration-300 text-xs sm:text-sm"
                >
                  WhatsApp Gym Chat
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-gold-500 shrink-0" />
                <a href="mailto:info@ganeshafitness.com" className="hover:text-gold-500 transition-colors duration-300 text-xs sm:text-sm">
                  info@ganeshafitness.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gold-500/5 py-6 bg-black">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Ganesha Fitness. All Rights Reserved.</p>
          <div className="flex gap-6 text-gray-500">
            <Link to="/contact" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
            <span className="text-gold-500/40">Premium Gym Experience</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
