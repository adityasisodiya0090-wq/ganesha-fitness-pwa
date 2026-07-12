import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../types';

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  className = '',
  id,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-display font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-matte disabled:opacity-50 disabled:pointer-events-none tracking-wider uppercase btn-shine-overlay rounded-sm';
  
  const variants = {
    primary: 'bg-gradient-gold text-matte hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)] border border-transparent font-bold active:scale-[0.98]',
    secondary: 'border border-gold-500/70 text-gold-500 hover:bg-gradient-gold hover:text-matte hover:border-transparent hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] font-bold active:scale-[0.98]',
    danger: 'bg-accent-red hover:bg-accent-red-hover text-white hover:shadow-[0_8px_30px_rgba(139,0,0,0.35)] border border-transparent active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-4.5 py-2.5 gap-2',
    md: 'text-sm px-6 py-3.5 gap-2',
    lg: 'text-base px-8 py-4.5 gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

