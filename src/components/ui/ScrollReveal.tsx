import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BaseProps } from '../../types';

interface ScrollRevealProps extends BaseProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  scale?: number;
  once?: boolean;
  staggerChildren?: number;
  margin?: any;
  key?: any;
}

export default function ScrollReveal({
  children,
  className = '',
  id,
  direction = 'up',
  distance = 30,
  duration = 0.8,
  delay = 0,
  scale = 1,
  once = true,
  staggerChildren,
  margin = '-80px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  const getDirectionOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance };
      case 'right':
        return { y: 0, x: -distance };
      case 'none':
      default:
        return { y: 0, x: 0 };
    }
  };

  const offsets = getDirectionOffsets();

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: offsets.y,
      x: offsets.x,
      scale,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier easing
        when: 'beforeChildren',
        staggerChildren: staggerChildren || undefined,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
