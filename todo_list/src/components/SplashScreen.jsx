import React, { useEffect, useState } from 'react';

export default function SplashScreen({ isDarkMode, onFinish }) {
  const [stage, setStage] = useState('entering');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only once on mount
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animDelay: Math.random() * 1,
      animDuration: Math.random() * 2 + 2,
    }));
    setParticles(newParticles);

    // Start exit animation after 2.5 seconds (matching the CSS delay provided)
    const exitTimer = setTimeout(() => {
      setStage('exiting');
    }, 2500);

    // Completely unmount after 3.0 seconds
    const unmountTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center font-sans overflow-hidden transition-colors duration-500
      ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} 
      ${stage === 'exiting' ? 'opacity-0 scale-105 transition-all duration-500 ease-in pointer-events-none' : 'opacity-100'}
    `}>
      
      {/* Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Procedurally generated particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-indigo-500/20 animate-float-up"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.animDelay}s`,
              animationDuration: `${p.animDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="z-20 flex flex-col items-center justify-center">
        {/* Logo Animation Container */}
        <div className="w-24 h-24 mb-6 transform scale-80 opacity-0 animate-pop-in relative">
          
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
            {/* Box Outline */}
            <rect 
              x="12" y="12" width="40" height="40" rx="12" 
              className="animate-draw-box"
              fill="rgba(99, 102, 241, 0.1)" 
              stroke="url(#boxGrad)" 
              strokeWidth="2.5" 
              style={{ strokeDasharray: 160, strokeDashoffset: 160 }}
            />
            
            {/* Flowing Checkmark */}
            <path 
              d="M 18 34 L 28 44 L 52 16" 
              className="animate-draw-check drop-shadow-[0_4px_6px_rgba(99,102,241,0.6)]"
              stroke="url(#checkGrad)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="boxGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="checkGrad" x1="18" y1="34" x2="52" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Text Animation */}
        <h1 className="text-4xl font-extrabold tracking-tight m-0 translate-y-2 opacity-0 animate-fade-up">
          Task<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Flow</span>
        </h1>
      </div>

      {/* Embedded CSS for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawBox {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes popInGlow {
          0% { transform: scale(0.8); opacity: 0; filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.2)); }
          100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)); }
        }
        @keyframes glowPulse {
          from { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.2)); }
          to { filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)); }
        }
        @keyframes fadeUpText {
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes floatUpParticle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        
        .animate-draw-box {
          animation: drawBox 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s forwards;
        }
        .animate-draw-check {
          animation: drawCheck 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
        }
        .animate-pop-in {
          animation: 
            popInGlow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            glowPulse 2s ease-in-out 1s infinite alternate !important;
        }
        .animate-fade-up {
          animation: fadeUpText 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
        }
        .animate-float-up {
          animation: floatUpParticle infinite linear;
        }
      `}} />
    </div>
  );
}
