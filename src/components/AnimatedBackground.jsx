import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Environment, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles component
function FloatingParticles({ count = 2000 }) {
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

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
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
          color="#60a5fa"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}

// Animated spheres with distortion
function DistortedSphere({ position, color, speed = 1 }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 100, 200]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

// Weather-themed floating elements
function WeatherElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50
      ],
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 6],
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  return (
    <>
      {elements.map((element, index) => (
        <DistortedSphere
          key={index}
          position={element.position}
          color={element.color}
          speed={element.speed}
        />
      ))}
    </>
  );
}

// Animated text in 3D space
function FloatingText() {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 2;
    }
  });

  return (
    <Center position={[0, 10, -20]}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={2}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        WEATHER
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.8} />
      </Text3D>
    </Center>
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
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <FloatingParticles count={3000} />
      <WeatherElements />
      
      {/* Central animated sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[3, 100, 200]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0}
            metalness={0.9}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>
      
      {/* Orbiting smaller spheres */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[0.5, 32, 32]} position={[
            Math.cos(i * Math.PI / 3) * 8,
            Math.sin(i * Math.PI / 3) * 2,
            Math.sin(i * Math.PI / 3) * 8
          ]}>
            <MeshDistortMaterial
              color={colors.secondary}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0}
              metalness={0.7}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
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

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      >
        {isLoaded && <AnimatedBackground weatherCondition={weatherCondition} />}
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.2) 50%, rgba(51, 65, 85, 0.3) 100%)'
        }}
      />
    </div>
  );
}
