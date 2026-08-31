import React from 'react';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  as: Component = 'button',
  ...props
}, ref) => {
  
  // Base styles for every button
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-medium rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-[0.98]',
  ].join(' ');

  // Variant styles using your v4 custom primary colors
  const variantClasses = {
    primary: [
      'bg-primary-600 text-white',
      'hover:bg-primary-700',
      'focus:ring-primary-500',
      'dark:bg-primary-500 dark:hover:bg-primary-600',
    ].join(' '),
    
    secondary: [
      'bg-gray-200 text-gray-900',
      'hover:bg-gray-300',
      'focus:ring-gray-400',
      'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ].join(' '),
    
    outline: [
      'border-2 border-primary-600 text-primary-600 bg-transparent',
      'hover:bg-primary-50',
      'focus:ring-primary-500',
      'dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30',
    ].join(' '),
    
    ghost: [
      'text-primary-600 bg-transparent',
      'hover:bg-primary-50',
      'focus:ring-primary-500',
      'dark:text-primary-400 dark:hover:bg-primary-900/30',
    ].join(' '),
    
    danger: [
      'bg-red-600 text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'dark:bg-red-500 dark:hover:bg-red-600',
    ].join(' '),
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2.5 aspect-square',
  };

  // Merge all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const isButton = Component === 'button';
  
  return (
    <Component
      ref={ref}
      className={classes}
      {...(isButton ? { disabled: disabled || loading, type: 'button' } : {})}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;