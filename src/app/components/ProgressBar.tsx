'use client';

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  duration?: number;
  className?: string;
}

export default function ProgressBar({ duration = 5000, className = '' }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 30; // Update interval in ms
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}