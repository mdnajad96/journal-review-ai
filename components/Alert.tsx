'use client';

import React, { useState } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export default function Alert({
  type,
  title,
  message,
  onClose,
  dismissible = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✓',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      textColor: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '✕',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-800',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '!',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      textColor: 'text-yellow-800',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800',
    },
  };

  const config = typeConfig[type];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start space-x-4`}>
      <div className={`${config.iconBg} ${config.iconColor} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold`}>
        {config.icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold ${config.titleColor}`}>{title}</h3>
        <p className={`text-sm mt-1 ${config.textColor}`}>{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${config.iconColor} hover:opacity-75 transition`}
        >
          ✕
        </button>
      )}
    </div>
  );
}
