import React from 'react';

const Logo = ({ className = "w-12 h-12", ...props }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background Glow */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
      </defs>

      {/* Book/Brain Stylized Shape */}
      <path 
        d="M20 30C20 24.4772 24.4772 20 30 20H70C75.5228 20 80 24.4772 80 30V70C80 75.5228 75.5228 80 70 80H30C24.4772 80 20 75.5228 20 70V30Z" 
        fill="url(#logo-gradient)" 
        fillOpacity="0.1"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
      />
      
      {/* Central AI/Spark Element */}
      <path 
        d="M50 35L55 45H65L57 52L60 62L50 55L40 62L43 52L35 45H45L50 35Z" 
        fill="url(#logo-gradient)"
        filter="url(#glow)"
      />

      {/* Abstract Connections */}
      <circle cx="30" cy="30" r="3" fill="#00f5ff" />
      <circle cx="70" cy="70" r="3" fill="#ff00ff" />
      <circle cx="70" cy="30" r="2" fill="#00f5ff" opacity="0.5" />
      <circle cx="30" cy="70" r="2" fill="#ff00ff" opacity="0.5" />
      
      <path d="M30 30L50 50L70 70" stroke="url(#logo-gradient)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <path d="M70 30L50 50L30 70" stroke="url(#logo-gradient)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
};

export default Logo;
