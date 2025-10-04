import React, { useState, useEffect } from 'react';

// Enhanced loading component with smooth animations
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content with delay for smooth entrance
    const showTimer = setTimeout(() => setShowContent(true), 100);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Loading text animation
    const textSequence = [
      'Initializing...',
      'Loading 3D Environment...',
      'Preparing Weather Data...',
      'Setting Up Animations...',
      'Almost Ready...'
    ];
    
    let textIndex = 0;
    const textInterval = setInterval(() => {
      setLoadingText(textSequence[textIndex]);
      textIndex = (textIndex + 1) % textSequence.length;
    }, 800);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatUp ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content with entrance animation */}
      <div className={`text-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Enhanced animated logo */}
        <div className="mb-12">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-ping"></div>
            
            {/* Main logo circle */}
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse shadow-2xl">
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-spin" style={{animationDuration: '3s'}}></div>
            </div>
            
            {/* Spinning border */}
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-transparent border-t-white animate-spin" style={{animationDuration: '2s'}}></div>
            
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>
        
        {/* Animated title with stagger effect */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            SYNOPTIC
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full animate-expandWidth" style={{animationDelay: '0.4s'}}></div>
        </div>
        
        {/* Dynamic loading text */}
        <div className="text-white text-lg mb-8 min-h-[1.5rem]">
          <span className="animate-fadeInOut">{loadingText}</span>
        </div>
        
        {/* Enhanced progress bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{width: `${Math.min(progress, 100)}%`}}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-300">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
        
        {/* Weather icons animation */}
        <div className="flex justify-center space-x-4">
          {['☀️', '☁️', '🌧️', '❄️', '⛈️'].map((icon, index) => (
            <div
              key={index}
              className="text-2xl animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandWidth {
          0% {
            width: 0;
          }
          100% {
            width: 8rem;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1s ease-out forwards;
        }
        
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
