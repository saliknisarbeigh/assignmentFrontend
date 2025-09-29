import React from 'react';

const Input = ({
  label,
  id,
  error,
  className = '',
  labelClassName = '',
  containerClassName = '',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium text-gray-300 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          className={`
            block w-full rounded-lg border-0 bg-gray-800 text-white
            focus:ring-2 focus:ring-purple-500 focus:border-transparent
            placeholder-gray-500
            ${error ? 'border-red-500' : 'border-gray-700'}
            ${LeftIcon ? 'pl-10' : 'pl-4'}
            ${RightIcon ? 'pr-10' : 'pr-4'}
            py-2.5 text-sm
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <RightIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
