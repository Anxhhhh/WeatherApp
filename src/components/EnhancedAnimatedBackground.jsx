import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced floating particles with weather effects
function WeatherParticles({ count = 2000, weatherType = 'clear' }) {
  const mesh = useRef();
  const light = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

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

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
      
      // Add weather-specific movement
      if (weatherType === 'rainy') {
        mesh.current.position.y -= 0.1;
        if (mesh.current.position.y < -50) mesh.current.position.y = 50;
      } else if (weatherType === 'snowy') {
        mesh.current.position.y -= 0.02;
        mesh.current.position.x += Math.sin(state.clock.elapsedTime) * 0.01;
        if (mesh.current.position.y < -50) mesh.current.position.y = 50;
      }
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 20;
      light.current.position.z = Math.cos(state.clock.elapsedTime) * 20;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 0, 0]} intensity={1} color="#4f46e5" />
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

// Interactive distorted spheres
function InteractiveSphere({ position, color, speed = 1, weatherType = 'clear' }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
      
      // Scale animation on hover
      mesh.current.scale.setScalar(hovered ? 1.2 : 1);
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
    return distortions[weatherType] || 0.4;
  };

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere 
        ref={mesh} 
        args={[1, 100, 200]} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={getDistortion(weatherType)}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={hovered ? 0.8 : 0.6}
        />
      </Sphere>
    </Float>
  );
}

// Weather-specific floating elements
function WeatherElements({ weatherType = 'clear' }) {
  const elements = useMemo(() => {
    const baseElements = Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50
      ],
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 6],
      speed: 0.5 + Math.random() * 1.5
    }));

    // Add weather-specific elements
    if (weatherType === 'rainy') {
      return [...baseElements, ...Array.from({ length: 5 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 60,
          Math.random() * 40 + 20,
          (Math.random() - 0.5) * 60
        ],
        color: '#1e40af',
        speed: 2 + Math.random() * 2
      }))];
    } else if (weatherType === 'snowy') {
      return [...baseElements, ...Array.from({ length: 10 }, (_, i) => ({
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
  }, [weatherType]);

  return (
    <>
      {elements.map((element, index) => (
        <InteractiveSphere
          key={index}
          position={element.position}
          color={element.color}
          speed={element.speed}
          weatherType={weatherType}
        />
      ))}
    </>
  );
}

// Floating weather icons as spheres
function WeatherIcon({ weatherType = 'clear', position = [0, 15, -25] }) {
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
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 2;
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={2}>
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

// Lightning effect for stormy weather
function LightningEffect() {
  const lightningRef = useRef();
  
  useFrame((state) => {
    if (lightningRef.current) {
      const time = state.clock.elapsedTime;
      lightningRef.current.position.x = Math.sin(time * 10) * 30;
      lightningRef.current.position.y = 20 + Math.sin(time * 15) * 10;
      lightningRef.current.visible = Math.random() > 0.7;
    }
  });

  return (
    <mesh ref={lightningRef} position={[0, 20, 0]}>
      <planeGeometry args={[2, 40]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
}

// Main animated background component
function AnimatedBackground({ weatherCondition = 'clear' }) {
  const { camera } = useThree();
  
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
      
      <WeatherParticles count={weatherCondition === 'snowy' ? 5000 : 3000} weatherType={weatherCondition} />
      <WeatherElements weatherType={weatherCondition} />
      
      {/* Central animated sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[3, 100, 200]} position={[0, 0, 0]}>
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
      
      {/* Orbiting smaller spheres */}
      {Array.from({ length: weatherCondition === 'stormy' ? 8 : 6 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
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
      
      <WeatherIcon weatherType={weatherCondition} />
      
      {weatherCondition === 'stormy' && <LightningEffect />}
    </>
  );
}

// Main component that renders the Canvas
export default function AnimatedBackgroundWrapper({ weatherCondition = 'clear' }) {
  const [isLoaded, setIsLoaded] = useState(false);

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
      >
        {isLoaded && <AnimatedBackground weatherCondition={weatherCondition} />}
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
