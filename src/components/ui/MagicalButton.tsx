
import React from 'react';
import { motion } from 'framer-motion';

interface MagicalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MagicalButton: React.FC<MagicalButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = "font-lato font-medium rounded-lg transition-all duration-200 relative overflow-hidden";
  
  const variantClasses = {
    primary: "magical-gradient hover:opacity-90 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={!disabled ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagicalButton;
