'use client';

import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ text = 'Loading...', size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      {text && <p className="text-slate-600 text-sm font-medium">{text}</p>}
    </div>
  );
}
