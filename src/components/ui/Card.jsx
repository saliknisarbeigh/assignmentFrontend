import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-700/50 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-850/50 border-t border-gray-700/30 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardBody, CardFooter };
