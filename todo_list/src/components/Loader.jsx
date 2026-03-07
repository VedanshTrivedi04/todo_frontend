import React from 'react';

export default function Loader({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-[2px]',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-[4px]'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Ambient glow behind loader */}
        <div className={`absolute rounded-full bg-indigo-500/30 blur-md animate-pulse ${sizeClasses[size]}`} />
        
        {/* Subtle static track */}
        <div className={`absolute rounded-full border-indigo-100 dark:border-indigo-900/30 ${sizeClasses[size]}`} />
        
        {/* Spinning glowing ring */}
        <div className={`
          rounded-full border-t-indigo-600 border-r-indigo-500 border-b-transparent border-l-transparent 
          animate-spin drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]
          ${sizeClasses[size]}
        `} />
      </div>
    </div>
  );
}
