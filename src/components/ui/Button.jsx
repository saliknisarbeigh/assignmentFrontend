import React from 'react';

const variants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  outline: 'bg-transparent border border-gray-600 hover:bg-gray-800 text-gray-200',
  ghost: 'bg-transparent hover:bg-gray-800 text-gray-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-lg font-medium
        transition-colors duration-200 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-5 h-5 mr-2" />}
      {children}
      {RightIcon && <RightIcon className="w-5 h-5 ml-2" />}
    </button>
  );
};

export default Button;
