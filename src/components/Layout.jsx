import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-0 left-0 w-full h-full bg-radial-blur opacity-50" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-magenta-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
