import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after short delay simulating content hydration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }} // Ultra-premium custom easeInOutExpo
          className="fixed inset-0 bg-[#070707] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient background glow inside the loader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center z-10"
          >
            {/* Pulsing logo and dynamic stroke-drawing circle */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 relative">
              <svg viewBox="0 0 512 512" className="w-full h-full">
                <defs>
                  <linearGradient id="loader-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF099" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8A640F" />
                  </linearGradient>
                </defs>
                
                {/* Background static circle */}
                <circle cx="256" cy="256" r="200" fill="none" stroke="url(#loader-gold)" strokeWidth="8" opacity="0.1" />
                
                {/* Dynamically drawing circle line */}
                <motion.circle
                  cx="256"
                  cy="256"
                  r="200"
                  fill="none"
                  stroke="url(#loader-gold)"
                  strokeWidth="12"
                  strokeDasharray="1256"
                  style={{ transformOrigin: '256px 256px' }}
                  initial={{ strokeDashoffset: 1256, rotate: -90 }}
                  animate={{ strokeDashoffset: [1256, 0, 1256], rotate: [-90, 270, 630] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
                
                {/* Center logo path */}
                <motion.path
                  d="M256,150 C210,150 185,180 185,220 C185,240 195,265 210,275 Q235,310 235,340 L235,370 C235,380 245,390 256,390 C267,390 277,380 277,370 L277,340 Q277,310 302,275 C317,265 327,240 327,220 C327,180 302,150 256,150 Z"
                  fill="url(#loader-gold)"
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.02, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '256px 256px' }}
                />
              </svg>
            </div>

            {/* Premium Gold Typography Text loading */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="font-display text-2xl sm:text-3xl font-extrabold text-gradient-gold uppercase"
            >
              GANESHA FITNESS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] text-white uppercase mt-2.5"
            >
              EST. 2025 • Shikrapur, Pune
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
