import { useState, useEffect } from 'react';
import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import ScrollReveal from '../components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { Image, ZoomIn, Eye, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = ['ALL', 'STRENGTH FLOOR', 'CARDIO ZONE', 'FUNCTIONAL RIG', 'RECOVERY LOUNGE'];

  const filteredItems = activeFilter === 'ALL'
    ? galleryData
    : galleryData.filter(item => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, filteredItems]);

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="THE VISUAL SPECTACLE"
          subtitle="INSIDE GANESHA FITNESS"
          description="A detailed photographic tour of Pune’s premium health and physical performance sanctuary. Meticulously clean layouts, high-end equipment configurations, and high-energy workout spaces."
          background="matte"
        >
          {/* Categories Horizontal Filter Nav */}
          <ScrollReveal direction="none" delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gold-500/10 pb-8 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedIdx(null);
                }}
                className={`font-mono text-[10px] sm:text-xs tracking-wider uppercase px-4 py-2 rounded-sm border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-gold text-matte border-gold-500 font-bold shadow-[0_4px_15px_rgba(212,175,55,0.2)]'
                    : 'bg-charcoal/50 text-gray-400 border-gold-500/10 hover:text-white hover:border-gold-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Gallery Filtered Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className="group relative aspect-square bg-charcoal border border-gold-500/5 rounded-sm overflow-hidden shadow-md cursor-pointer"
                >
                  {/* Photo background */}
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Overlay and Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300 pointer-events-none" />
                  
                  {/* Absolute details content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  {/* Top-right Icon Hover indicator */}
                  <div className="absolute top-4 right-4 p-2 bg-matte/80 border border-gold-500/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5 text-gold-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        {/* Full Screen Lightbox Modal */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-matte/95 backdrop-blur-md p-4 sm:p-6"
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gold-500 transition-colors duration-300 bg-charcoal/50 hover:bg-charcoal border border-gold-500/10 hover:border-gold-500/30 rounded-sm cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Central Lightbox Layout */}
              <div className="relative w-full max-w-4xl flex flex-col items-center">
                
                {/* Previous Control */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 p-2.5 rounded-sm bg-charcoal/80 border border-gold-500/15 text-gold-500 hover:text-white hover:bg-gold-500 hover:border-transparent transition-all duration-300 z-10 cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Main Lightbox Frame */}
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.97, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full bg-charcoal/80 border border-gold-500/10 rounded-sm overflow-hidden shadow-2xl flex flex-col"
                >
                  <div className="relative aspect-[3/2] sm:aspect-[16/10] w-full bg-black flex items-center justify-center">
                    <img
                      src={filteredItems[selectedIdx].image}
                      alt={filteredItems[selectedIdx].title}
                      className="w-full h-full object-contain max-h-[70vh]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Caption & Metadata bar */}
                  <div className="p-6 border-t border-gold-500/10 bg-charcoal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block font-semibold">
                        {filteredItems[selectedIdx].category}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
                        {filteredItems[selectedIdx].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-sans">
                        {filteredItems[selectedIdx].desc}
                      </p>
                    </div>
                    <div className="font-mono text-xs text-gray-500 tracking-widest shrink-0 self-end sm:self-center">
                      {(selectedIdx + 1).toString().padStart(2, '0')} / {filteredItems.length.toString().padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>

                {/* Next Control */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 p-2.5 rounded-sm bg-charcoal/80 border border-gold-500/15 text-gold-500 hover:text-white hover:bg-gold-500 hover:border-transparent transition-all duration-300 z-10 cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action callout section */}
        <Section
          title="VISIT US IN PERSON"
          subtitle="WALK-IN TOURS"
          background="charcoal"
        >
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center space-y-6">
            <Sparkles className="w-8 h-8 text-gold-500 mx-auto animate-pulse" />
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
              While photographs capture the sleek aesthetic, nothing compares to hearing the hum of our ventilators, seeing the metallic gold details, and testing the smooth pulley biomechanics in person. Get a free day pass to experience our premium training sanctuary.
            </p>
          </ScrollReveal>
        </Section>
      </div>
    </PageTransition>
  );
}

