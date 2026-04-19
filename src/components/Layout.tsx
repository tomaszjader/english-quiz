import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNavigation from './BottomNavigation';

import { APP_STEP } from '../constants/app';
import type { AppStep } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentStep?: string;
  onNavigate?: (step: AppStep) => void;
}

const Layout = ({ children, currentStep = 'hub', onNavigate }: LayoutProps) => {
  const handleManualNavigate = (navId: string) => {
    if (!onNavigate) return;
    
    switch (navId) {
      case 'hub': onNavigate(APP_STEP.INPUT); break;
      case 'stories': onNavigate(APP_STEP.STORY); break;
      case 'quiz': onNavigate(APP_STEP.QUIZ); break;
      case 'settings': onNavigate(APP_STEP.SETUP); break;
    }
  };

  return (
    <div className="bg-surface min-h-screen flex text-on-surface selection:bg-primary/30">
      <Sidebar currentStep={currentStep} onNavigate={handleManualNavigate} />
      
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
        <Topbar />
        
        <div className="flex-1 mt-16 md:mt-20 p-4 md:p-12 pb-32 md:pb-12 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-6xl mx-auto w-full relative z-10">
            {children}
          </div>
        </div>
      </main>

      <BottomNavigation currentStep={currentStep} onNavigate={handleManualNavigate} />
    </div>
  );
};

export default Layout;
