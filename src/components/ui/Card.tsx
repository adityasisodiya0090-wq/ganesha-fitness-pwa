import { HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { BaseProps } from '../../types';

interface CardProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  key?: any;
}

export default function Card({
  children,
  className = '',
  id,
  hoverEffect = true,
  image,
  imageAlt,
  title,
  subtitle,
  ...props
}: CardProps) {
  // Named variants to allow parent hover state to drive child image scale state simultaneously
  const cardVariants = {
    initial: {
      y: 0,
      scale: 1,
      borderColor: 'rgba(212, 175, 55, 0.08)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      y: -10,
      scale: 1.015,
      borderColor: 'rgba(212, 175, 55, 0.25)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(212, 175, 55, 0.05)',
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.06 },
  };

  return (
    <motion.div
      id={id}
      initial={hoverEffect ? 'initial' : false}
      whileHover={hoverEffect ? 'hover' : undefined}
      variants={hoverEffect ? cardVariants : undefined}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
      className={`glass-card rounded-sm overflow-hidden flex flex-col border transition-all duration-300 ${className}`}
      {...props}
    >
      {image && (
        <div className="relative overflow-hidden aspect-video w-full bg-matte border-b border-gold-500/10">
          <motion.img
            src={image}
            alt={imageAlt || title || 'Ganesha Fitness'}
            variants={hoverEffect ? imageVariants : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matte to-transparent opacity-60" />
        </div>
      )}
      
      {(title || subtitle || children) && (
        <div className="p-6 sm:p-8 flex-1 flex flex-col gap-3">
          {subtitle && (
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-bold">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {title}
            </h3>
          )}
          <div className="flex-1 flex flex-col mt-1">
            {children}
          </div>
        </div>
      )}
    </motion.div>
  );
}
