'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  href?: string;
  download?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href,
  download,
  type = 'button',
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = 'relative inline-flex items-center gap-2 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 overflow-hidden group';
  
  const variants = {
    primary: disabled
      ? 'bg-[#242424] text-[#525252] cursor-not-allowed'
      : 'bg-[#f59e0b] text-[#050505] hover:bg-[#d97706]',
    secondary: disabled
      ? 'border border-[#1a1a1a] text-[#363636] cursor-not-allowed'
      : 'border border-[#242424] text-[#f5f5f5] hover:border-[#f59e0b] hover:text-[#f59e0b]',
    ghost: disabled
      ? 'text-[#363636] cursor-not-allowed'
      : 'text-[#a3a3a3] hover:text-[#f5f5f5]',
  };

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {!disabled && variant === 'primary' && (
        <motion.span
          className="absolute inset-0 bg-[#d97706]"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
      {!disabled && variant === 'secondary' && (
        <motion.span
          className="absolute inset-0 bg-white/5"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {buttonContent}
    </motion.button>
  );
}
