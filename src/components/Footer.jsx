import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-32 pb-12 text-center opacity-30 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <GraduationCap size={16} />
                        <span>Empowering Language Learning</span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">
                    Made with ❤️ & AI
                </p>
            </div>
        </footer>
    );
};

export default Footer;
