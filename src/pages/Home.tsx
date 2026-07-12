import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Sparkles, ChevronDown, Flame, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { statsData } from '../data';

export default function Home() {
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Premium Parallax Effect Transforms
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const yText = useTransform(scrollY, [0, 800], [0, -100]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.35]);
  const scaleBg = useTransform(scrollY, [0, 800], [1.02, 1.12]);
  const opacityScrollIndicator = useTransform(scrollY, [0, 150], [1, 0]);

  // Motion variants for staggered enter animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <PageTransition>
      {/* Responsive Hero Section */}
      <div className="relative w-full min-h-screen lg:h-screen lg:min-h-[750px] flex items-center justify-center overflow-hidden bg-matte py-24 sm:py-32 lg:py-0">
        
        {/* Parallax Background Image with Zoom & Dark Overlay */}
        <motion.div
          style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Main Hero Background */}
          {/* TODO: REPLACE_HERO_IMAGE (Main Homepage Hero Background) */}
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Matte Black and Gold Ganesha Fitness Gym"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Radial & Linear Overlays to emphasize gold text & lock down contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-matte via-matte/60 to-matte/30" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_80%)]" />
        </motion.div>

        {/* Outer Grid Accent Lines */}
        <div className="absolute inset-0 border-x border-gold-500/5 max-w-7xl mx-auto pointer-events-none hidden md:block" />

        {/* Content Container (Parallaxing Text layer on Desktop) */}
        <motion.div
          style={{ y: isDesktop ? yText : 0 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center h-full"
        >
          {/* Floating Premium Badges */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
            {/* Top Left Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                x: { duration: 0.8, delay: 0.5 },
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
              }}
              className="absolute left-[8%] top-[25%] flex items-center gap-2.5 px-4 py-2.5 bg-charcoal/85 backdrop-blur-md border border-gold-500/25 rounded-md text-white shadow-2xl"
            >
              <Trophy className="w-4 h-4 text-gold-500" />
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                SHIKRAPUR'S CHAMPION CLUB
              </span>
            </motion.div>

            {/* Bottom Right Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{
                x: { duration: 0.8, delay: 0.7 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' }
              }}
              className="absolute right-[8%] bottom-[32%] flex items-center gap-2.5 px-4 py-2.5 bg-charcoal/85 backdrop-blur-md border border-gold-500/25 rounded-md text-white shadow-2xl"
            >
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                100% PERSONALIZED RESULTS
              </span>
            </motion.div>
          </div>

          {/* Main Headline Content Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center w-full max-w-4xl"
          >
            {/* Brand Kickoff Sub-badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-gold-500/10 border border-gold-500/20 mb-5 sm:mb-6"
            >
              <Flame className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-gold-400 uppercase font-semibold">
                ELITE TRAINING HAVEN
              </span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(1.85rem,6.5vw,5.5rem)] font-display font-black tracking-tight uppercase leading-[1.0] text-white mb-5 sm:mb-6"
            >
              FORGE YOUR <br />
              <span className="text-gradient-gold drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)]">
                ULTIMATE LEGACY
              </span>
            </motion.h1>

            {/* Luxury Tagline description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-xs sm:text-base lg:text-lg max-w-2xl mb-8 sm:mb-10 leading-relaxed font-sans font-normal px-2 sm:px-0"
            >
              Experience Shikrapur's premium fitness sanctuary. Outfitted with masterwork biomechanical strength lines, customized nutrition counseling, and expert-level athletic coaching.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-3.5 sm:py-4">
                  Join Now
                </Button>
              </Link>
              <Link to="/plans" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-3.5 sm:py-4">
                  View Plans
                </Button>
              </Link>
            </motion.div>

            {/* Responsive Statistics Grid (Staggered Counter Cards) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 w-full max-w-5xl border-t border-gold-500/15 pt-8 sm:pt-10 px-2 sm:px-0"
            >
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-3.5 sm:p-5 lg:p-6 bg-charcoal/40 backdrop-blur-sm border border-gold-500/5 rounded-md hover:border-gold-500/20 transition-colors duration-300"
                >
                  <div className="flex items-baseline">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-xl sm:text-3xl lg:text-4xl text-gold-500 font-display font-black" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono text-gray-400 uppercase mt-1.5 sm:mt-2 tracking-widest font-semibold text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll mouse indicator at bottom */}
        <motion.div
          style={{ opacity: opacityScrollIndicator }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 hidden lg:flex"
        >
          <span className="text-[9px] font-mono tracking-[0.25em] text-gold-500/80 uppercase font-bold">
            Scroll Down
          </span>
          <div className="w-[18px] h-[30px] border-2 border-gold-500/40 rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-1.5 bg-gold-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
