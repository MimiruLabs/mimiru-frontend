import React from 'react';

interface FormErrorProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="w-full mb-2 px-3 py-2 bg-red-900/60 border border-red-700 text-red-200 rounded text-sm">
      {message}
    </div>
  );
}; 