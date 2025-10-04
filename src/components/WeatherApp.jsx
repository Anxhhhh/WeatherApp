import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import CitySearch from './CitySearch';
import OptimizedAnimatedBackground from './OptimizedAnimatedBackground';
import LoadingScreen from './LoadingScreen';
import AnimatedWrapper, { StaggeredContainer, FadeInElement, SlideInElement } from './AnimationComponents';

const WeatherApp = () => {
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate weather condition detection (you can integrate with real weather API)
  useEffect(() => {
    const conditions = ['clear', 'cloudy', 'rainy', 'snowy', 'stormy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // Simulate loading time
    setTimeout(() => {
      setWeatherCondition(randomCondition);
      setIsLoading(false);
    }, 3000);
  }, []);

  // Handle weather condition change
  const handleWeatherChange = (newCondition) => {
    setWeatherCondition(newCondition);
  };

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      {/* Optimized 3D Animated Background */}
      <OptimizedAnimatedBackground weatherCondition={weatherCondition} />
      
      {/* Enhanced Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      {/* Main content with smooth entrance animation */}
      <FadeInElement delay={isLoading ? 0 : 500} duration={1200}>
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-white" style={{
          backdropFilter: 'blur(3px)',
          background: 'rgba(0, 0, 0, 0.1)'
        }}>

        {/* Header */}
        <header className={`${isMobile ? 'mb-4' : 'mb-6 sm:mb-8 lg:mb-12'}`}>
          {/* Mobile Header */}
          <StaggeredContainer staggerDelay={200}>
            <div className="flex flex-col space-y-3 sm:hidden">
              <div className="flex justify-between items-center">
                <AnimatedWrapper direction="left" delay={1000}>
                  <h1 className={`font-bold tracking-wider ${isMobile ? 'text-lg' : 'text-xl'} animate-glow`}>SYNOPTIC</h1>
                </AnimatedWrapper>
                <AnimatedWrapper direction="right" delay={1200}>
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors hover:scale-110 transform duration-200">
                    <span className="material-icons text-lg">menu</span>
                  </button>
                </AnimatedWrapper>
              </div>
              <AnimatedWrapper direction="up" delay={1400}>
                <CitySearch />
              </AnimatedWrapper>
              <AnimatedWrapper direction="up" delay={1600}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button className="font-bold hover:scale-110 transition-transform duration-200">°C</button>
                    <span className="text-gray-400">|</span>
                    <button className="text-gray-400 hover:scale-110 transition-transform duration-200">°F</button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="font-medium hover:scale-110 transition-transform duration-200">EN</button>
                    <button className="text-gray-400 hover:scale-110 transition-transform duration-200">RU</button>
                  </div>
                </div>
              </AnimatedWrapper>
            </div>
          </StaggeredContainer>
          
          {/* Desktop Header */}
          <StaggeredContainer staggerDelay={150}>
            <div className="hidden sm:flex justify-between items-center">
              <AnimatedWrapper direction="left" delay={1000}>
                <h1 className="text-2xl font-bold tracking-wider animate-glow">SYNOPTIC</h1>
              </AnimatedWrapper>
              
              <AnimatedWrapper direction="up" delay={1200}>
                <div className="flex items-center space-x-4">
                  <CitySearch />
                  <div className="flex items-center space-x-2 text-lg">
                    <button className="font-bold hover:scale-110 transition-transform duration-200">°C</button>
                    <span className="text-gray-400">|</span>
                    <button className="text-gray-400 hover:scale-110 transition-transform duration-200">°F</button>
                  </div>
                </div>
              </AnimatedWrapper>
              
              <AnimatedWrapper direction="right" delay={1400}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button className="font-medium hover:scale-110 transition-transform duration-200">EN</button>
                    <button className="text-gray-400 hover:scale-110 transition-transform duration-200">RU</button>
                  </div>
                  <button className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                    <span className="font-medium hover:cursor-pointer">MENU</span>
                    <span className="material-icons hover:cursor-pointer">menu</span>
                  </button>
                </div>
              </AnimatedWrapper>
            </div>
          </StaggeredContainer>
        </header>

        {/* Main Content */}
        <StaggeredContainer staggerDelay={200}>
          <main className={`grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 ${isMobile ? 'mb-4' : 'mb-6 sm:mb-8 lg:mb-12'}`}>
            <AnimatedWrapper direction="left" delay={1800}>
              <CurrentWeather />
            </AnimatedWrapper>
            <AnimatedWrapper direction="right" delay={2000}>
              <HourlyForecast />
            </AnimatedWrapper>
          </main>

          {/* Weekly Forecast */}
          <AnimatedWrapper direction="up" delay={2200}>
            <WeeklyForecast />
          </AnimatedWrapper>
        </StaggeredContainer>
      </div>
      </FadeInElement>

    </div>
  );
};

export default WeatherApp;
