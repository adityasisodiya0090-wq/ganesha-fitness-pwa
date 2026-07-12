import { motion } from 'framer-motion';
import { BaseProps } from '../../types';
import Container from './Container';

interface SectionProps extends BaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  background?: 'matte' | 'charcoal' | 'gradient';
  centered?: boolean;
}

export default function Section({
  children,
  className = '',
  id,
  title,
  subtitle,
  description,
  background = 'matte',
  centered = true,
}: SectionProps) {
  const bgStyles = {
    matte: 'bg-matte text-white',
    charcoal: 'bg-charcoal text-white border-y border-gold-500/5',
    gradient: 'bg-gradient-to-b from-matte to-charcoal text-white',
  };

  // Luxury Stagger Variants for Headings
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Ultra-smooth luxury expo easeOut
      },
    },
  };

  const dividerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 80,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id={id}
      className={`py-20 lg:py-28 relative overflow-hidden ${bgStyles[background]} ${className}`}
    >
      <Container>
        {(title || subtitle || description) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerVariants}
            className={`mb-12 lg:mb-16 max-w-3xl ${centered ? 'text-center mx-auto' : 'text-left'}`}
          >
            {subtitle && (
              <motion.span
                variants={itemVariants}
                className="text-xs font-mono tracking-widest text-gold-500 uppercase block mb-3 font-semibold"
              >
                {subtitle}
              </motion.span>
            )}
            {title && (
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight uppercase mb-4"
              >
                {title}
              </motion.h2>
            )}
            {title && (
              <motion.div
                variants={dividerVariants}
                className={`h-1 bg-gradient-gold rounded-full mb-6 ${centered ? 'mx-auto' : 'mr-auto'}`}
              />
            )}
            {description && (
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
