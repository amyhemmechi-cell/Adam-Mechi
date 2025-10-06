
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 tracking-widest text-sm uppercase">AI Strategist at Work</p>
    </div>
  );
};
