import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

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

  return isMobile;
}

// Optimized floating particles with reduced count for mobile
function OptimizedWeatherParticles({ count = 1000, weatherType = 'clear', isMobile = false }) {
  const mesh = useRef();
  const light = useRef();
  
  // Reduce particle count for mobile
  const particleCount = isMobile ? Math.min(count, 500) : count;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    if (mesh.current) {
      // Reduce animation complexity for mobile
      const speed = isMobile ? 0.02 : 0.05;
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * (speed * 1.5);
      
      // Add weather-specific movement (simplified for mobile)
      if (weatherType === 'rainy' && !isMobile) {
        mesh.current.position.y -= 0.1;
        if (mesh.current.position.y < -50) mesh.current.position.y = 50;
      } else if (weatherType === 'snowy' && !isMobile) {
        mesh.current.position.y -= 0.02;
        mesh.current.position.x += Math.sin(state.clock.elapsedTime) * 0.01;
        if (mesh.current.position.y < -50) mesh.current.position.y = 50;
      }
    }
    if (light.current) {
      const speed = isMobile ? 0.5 : 1;
      light.current.position.x = Math.sin(state.clock.elapsedTime * speed) * 20;
      light.current.position.z = Math.cos(state.clock.elapsedTime * speed) * 20;
    }
  });

  const getParticleColor = (weatherType) => {
    const colors = {
      clear: '#60a5fa',
      cloudy: '#9ca3af',
      rainy: '#3b82f6',
      snowy: '#f8fafc',
      stormy: '#6b7280'
    };
    return colors[weatherType] || colors.clear;
  };

  return (
    <>
      <pointLight ref={light} position={[0, 0, 0]} intensity={isMobile ? 0.5 : 1} color="#4f46e5" />
      <Points ref={mesh} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={getParticleColor(weatherType)}
          size={weatherType === 'snowy' ? 0.1 : 0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

// Simplified interactive spheres (fewer for mobile)
function OptimizedInteractiveSphere({ position, color, speed = 1, weatherType = 'clear', isMobile = false }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
      const animSpeed = isMobile ? speed * 0.5 : speed;
      mesh.current.rotation.x = state.clock.elapsedTime * animSpeed;
      mesh.current.rotation.y = state.clock.elapsedTime * animSpeed * 0.5;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * animSpeed) * 2;
      
      // Scale animation on hover (disabled for mobile)
      if (!isMobile) {
        mesh.current.scale.setScalar(hovered ? 1.2 : 1);
      }
    }
  });

  const getDistortion = (weatherType) => {
    const distortions = {
      clear: 0.4,
      cloudy: 0.6,
      rainy: 0.8,
      snowy: 0.2,
      stormy: 1.0
    };
    return isMobile ? distortions[weatherType] * 0.5 : distortions[weatherType];
  };

  return (
    <Float speed={speed} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
      <Sphere 
        ref={mesh} 
        args={[1, isMobile ? 32 : 100, isMobile ? 32 : 200]} 
        position={position}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => !isMobile && setHovered(false)}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={getDistortion(weatherType)}
          speed={isMobile ? 1 : 2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={hovered ? 0.9 : 0.6}
        />
      </Sphere>
    </Float>
  );
}

// Optimized weather elements
function OptimizedWeatherElements({ weatherType = 'clear', isMobile = false }) {
  const elements = useMemo(() => {
    const baseCount = isMobile ? 4 : 8;
    const baseElements = Array.from({ length: baseCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50
      ],
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 6],
      speed: 0.5 + Math.random() * 1.5
    }));

    // Add weather-specific elements (fewer for mobile)
    if (weatherType === 'rainy' && !isMobile) {
      return [...baseElements, ...Array.from({ length: 3 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 60,
          Math.random() * 40 + 20,
          (Math.random() - 0.5) * 60
        ],
        color: '#1e40af',
        speed: 2 + Math.random() * 2
      }))];
    } else if (weatherType === 'snowy' && !isMobile) {
      return [...baseElements, ...Array.from({ length: 5 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 80,
          Math.random() * 50 + 10,
          (Math.random() - 0.5) * 80
        ],
        color: '#f8fafc',
        speed: 0.2 + Math.random() * 0.5
      }))];
    }

    return baseElements;
  }, [weatherType, isMobile]);

  return (
    <>
      {elements.map((element, index) => (
        <OptimizedInteractiveSphere
          key={index}
          position={element.position}
          color={element.color}
          speed={element.speed}
          weatherType={weatherType}
          isMobile={isMobile}
        />
      ))}
    </>
  );
}

// Simplified weather icon
function OptimizedWeatherIcon({ weatherType = 'clear', position = [0, 15, -25], isMobile = false }) {
  const mesh = useRef();
  
  const getIconColor = (type) => {
    const colors = {
      clear: '#fbbf24',
      cloudy: '#9ca3af',
      rainy: '#3b82f6',
      snowy: '#f8fafc',
      stormy: '#ef4444'
    };
    return colors[type] || '#60a5fa';
  };

  useFrame((state) => {
    if (mesh.current) {
      const speed = isMobile ? 0.3 : 0.5;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.6) * 2;
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={1} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
      <Sphere ref={mesh} args={[2, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={getIconColor(weatherType)}
          attach="material"
          distort={0.3}
          speed={1}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

// Main optimized animated background
function OptimizedAnimatedBackground({ weatherCondition = 'clear' }) {
  const { camera } = useThree();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    camera.position.set(0, 0, 30);
  }, [camera]);

  // Dynamic colors based on weather
  const getWeatherColors = (condition) => {
    const colorSchemes = {
      clear: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#93c5fd' },
      cloudy: { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db' },
      rainy: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
      snowy: { primary: '#f8fafc', secondary: '#e2e8f0', accent: '#cbd5e1' },
      stormy: { primary: '#1f2937', secondary: '#374151', accent: '#6b7280' }
    };
    return colorSchemes[condition] || colorSchemes.clear;
  };

  const colors = getWeatherColors(weatherCondition);

  return (
    <>
      <Environment preset={weatherCondition === 'stormy' ? 'night' : 'sunset'} />
      <ambientLight intensity={weatherCondition === 'stormy' ? 0.1 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={weatherCondition === 'stormy' ? 0.5 : 1} />
      
      <OptimizedWeatherParticles 
        count={weatherCondition === 'snowy' ? 2000 : 1500} 
        weatherType={weatherCondition} 
        isMobile={isMobile}
      />
      <OptimizedWeatherElements weatherType={weatherCondition} isMobile={isMobile} />
      
      {/* Central animated sphere */}
      <Float speed={2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
        <Sphere args={[3, isMobile ? 32 : 100, isMobile ? 32 : 200]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={weatherCondition === 'stormy' ? 0.8 : 0.6}
            speed={weatherCondition === 'stormy' ? 5 : 3}
            roughness={0}
            metalness={0.9}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting smaller spheres (fewer for mobile) */}
      {Array.from({ length: isMobile ? 4 : (weatherCondition === 'stormy' ? 8 : 6) }, (_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
          <Sphere args={[0.5, 32, 32]} position={[
            Math.cos(i * Math.PI / (weatherCondition === 'stormy' ? 4 : 3)) * 8,
            Math.sin(i * Math.PI / (weatherCondition === 'stormy' ? 4 : 3)) * 2,
            Math.sin(i * Math.PI / (weatherCondition === 'stormy' ? 4 : 3)) * 8
          ]}>
            <MeshDistortMaterial
              color={colors.secondary}
              attach="material"
              distort={weatherCondition === 'stormy' ? 0.5 : 0.3}
              speed={weatherCondition === 'stormy' ? 3 : 2}
              roughness={0}
              metalness={0.7}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
      
      <OptimizedWeatherIcon weatherType={weatherCondition} isMobile={isMobile} />
    </>
  );
}

// Main component with performance optimizations
export default function OptimizedAnimatedBackgroundWrapper({ weatherCondition = 'clear' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getBackgroundGradient = (weatherType) => {
    const gradients = {
      clear: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      cloudy: 'linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%)',
      rainy: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
      snowy: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      stormy: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)'
    };
    return gradients[weatherType] || gradients.clear;
  };

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: getBackgroundGradient(weatherCondition) }}
        performance={{ min: 0.5 }} // Performance optimization
        dpr={isMobile ? 1 : 2} // Lower pixel ratio for mobile
      >
        {isLoaded && <OptimizedAnimatedBackground weatherCondition={weatherCondition} />}
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, ${weatherCondition === 'snowy' ? '0.1' : '0.3'}) 0%, rgba(30, 41, 59, ${weatherCondition === 'snowy' ? '0.05' : '0.2'}) 50%, rgba(51, 65, 85, ${weatherCondition === 'snowy' ? '0.1' : '0.3'}) 100%)`
        }}
      />
    </div>
  );
}

