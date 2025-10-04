import React, { useState, useEffect } from 'react';

// Smooth entrance animation wrapper
export default function AnimatedWrapper({ children, delay = 0, direction = 'up', className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      case 'scale': return 'scale(0.9)';
      default: return 'translateY(30px)';
    }
  };

  return (
    <div
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : getTransform(),
      }}
    >
      {children}
    </div>
  );
}

// Staggered animation container
export function StaggeredContainer({ children, staggerDelay = 100, className = '' }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedWrapper key={index} delay={index * staggerDelay}>
          {child}
        </AnimatedWrapper>
      ))}
    </div>
  );
}

// Floating animation component
export function FloatingElement({ children, intensity = 1, speed = 1, className = '' }) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDuration: `${3 / speed}s`,
        animationDelay: `${Math.random() * 2}s`
      }}
    >
      {children}
    </div>
  );
}

// Pulse animation component
export function PulseElement({ children, intensity = 1, className = '' }) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        animationDuration: `${2 / intensity}s`
      }}
    >
      {children}
    </div>
  );
}

// Slide in animation component
export function SlideInElement({ children, direction = 'left', delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-100px)';
      case 'right': return 'translateX(100px)';
      case 'up': return 'translateY(100px)';
      case 'down': return 'translateY(-100px)';
      default: return 'translateX(-100px)';
    }
  };

  return (
    <div
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0) translateY(0)' : getInitialTransform(),
      }}
    >
      {children}
    </div>
  );
}

// Fade in animation component
export function FadeInElement({ children, delay = 0, duration = 1000, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Scale in animation component
export function ScaleInElement({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      }}
    >
      {children}
    </div>
  );
}

// Rotate in animation component
export function RotateInElement({ children, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.8)',
      }}
    >
      {children}
    </div>
  );
}
