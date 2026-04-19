import React from 'react';

const Topbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 h-16 md:h-20 bg-[#10131a] flex justify-between items-center px-4 md:px-8 shadow-xl text-on-surface border-b border-white/5">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="font-headline font-black text-lg md:text-2xl bg-gradient-to-br from-[#b6a0ff] to-[#7e51ff] bg-clip-text text-transparent truncate tracking-tight">
          Lexicon AI
        </span>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20">
          <span className="material-symbols-outlined text-outline text-sm mr-2">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-40 text-on-surface-variant" 
            placeholder="Search words..." 
            type="text"
          />
        </div>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-outline-variant/20 active:scale-95 transition-transform flex-shrink-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB43MpN3OtzxQwFifkpW9BlXfa2mS3zvErI0G6esAUbouMTCSKEO5xcIarffbfPv460jFXDiMSRjvsdorF0BFO4SdN-ujRd80sfxNteT_pk4d7Iw5OwVdQx5UpXEQh4AAKhmOvSYGoxAoGWCQL_gCR_N20U2v4H_rIniaopJu5fatfYfgfmZ0HPUMNqtLhminhPAgIkoVFZKSqYt5bd1L4wRsd1mgWdctCWUT5yWECPpFO_RojTRvA-eyK6d9Fyel9KuaMaFE6p0V4" 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
