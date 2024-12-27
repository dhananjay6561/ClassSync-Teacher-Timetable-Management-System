import React from 'react';

function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  const variantClasses = {
    primary: 'bg-primary hover:bg-opacity-90 focus:ring-primary',
    secondary: 'bg-secondary hover:bg-opacity-90 focus:ring-secondary',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
