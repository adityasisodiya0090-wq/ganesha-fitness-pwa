import { motion } from 'motion/react';
import { BaseProps } from '../../types';

export default function PageTransition({ children, className = '', id }: BaseProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={`w-full min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
}
