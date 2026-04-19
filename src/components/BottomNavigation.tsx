import React from 'react';
import { motion } from 'framer-motion';

interface BottomNavigationProps {
  currentStep: string;
  onNavigate?: (step: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentStep, onNavigate }) => {
  const navItems = [
    { id: 'hub', icon: 'hub', label: 'Hub' },
    { id: 'stories', icon: 'history', label: 'Stories' },
    { id: 'quiz', icon: 'quiz', label: 'Quiz' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 md:hidden flex justify-around items-center px-4 pt-3 pb-8 bg-[#10131a]/80 backdrop-blur-2xl rounded-t-[24px] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] border-t border-white/5">
      {navItems.map((item) => {
        const isActive = currentStep === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`flex flex-col items-center justify-center py-2 px-3 min-w-[70px] transition-all relative ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span 
              className="material-symbols-outlined transition-all text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-['Inter'] text-[10px] font-bold tracking-tight uppercase mt-1">
              {item.label}
            </span>
            
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(182,160,255,0.8)]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
