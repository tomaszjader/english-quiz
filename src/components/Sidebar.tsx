import React from 'react';

interface SidebarProps {
  currentStep: string;
  onNavigate?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate?.(id);
  };

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 py-8 bg-[#10131a]/80 backdrop-blur-2xl border-r border-white/10 z-40 tonal-layering font-['Manrope']">
      <div className="px-6 mb-12">
        <h1 className="font-headline font-extrabold text-xl text-[#b6a0ff] mb-1">Lexicon AI</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-body">Mastering Vocabulary</p>
      </div>

      <nav className="flex-1 space-y-1">
        <a 
          href="#hub" 
          onClick={(e) => handleNavClick(e, 'hub')}
          className={`px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
            currentStep === 'hub' 
              ? 'bg-gradient-to-r from-[#b6a0ff]/20 to-transparent text-[#b6a0ff] border-l-4 border-[#b6a0ff]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined transition-all" style={{ fontVariationSettings: currentStep === 'hub' ? "'FILL' 1" : "'FILL' 0" }}>hub</span>
          <span className="font-body text-sm font-medium">Hub</span>
        </a>
        <a 
          href="#stories" 
          onClick={(e) => handleNavClick(e, 'stories')}
          className={`px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
            currentStep === 'stories' 
              ? 'bg-gradient-to-r from-[#b6a0ff]/20 to-transparent text-[#b6a0ff] border-l-4 border-[#b6a0ff]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined transition-all" style={{ fontVariationSettings: currentStep === 'stories' ? "'FILL' 1" : "'FILL' 0" }}>history</span>
          <span className="font-body text-sm font-medium">Stories</span>
        </a>
        <a 
          href="#quiz" 
          onClick={(e) => handleNavClick(e, 'quiz')}
          className={`px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
            currentStep === 'quiz' 
              ? 'bg-gradient-to-r from-[#b6a0ff]/20 to-transparent text-[#b6a0ff] border-l-4 border-[#b6a0ff]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined transition-all" style={{ fontVariationSettings: currentStep === 'quiz' ? "'FILL' 1" : "'FILL' 0" }}>quiz</span>
          <span className="font-body text-sm font-medium">Quiz</span>
        </a>
        <a 
          href="#settings" 
          onClick={(e) => handleNavClick(e, 'settings')}
          className={`px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
            currentStep === 'settings' 
              ? 'bg-gradient-to-r from-[#b6a0ff]/20 to-transparent text-[#b6a0ff] border-l-4 border-[#b6a0ff]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined transition-all" style={{ fontVariationSettings: currentStep === 'settings' ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
          <span className="font-body text-sm font-medium">Settings</span>
        </a>
      </nav>

      <div className="px-6 mt-auto">
        <button 
          onClick={(e) => handleNavClick(e, 'hub')}
          className="w-full py-4 bg-gradient-to-r from-[#b6a0ff] to-[#7e51ff] rounded-xl text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
        >
          Start Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
