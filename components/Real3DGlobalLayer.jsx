'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function ParticleField({ count = 140, spread = 8, color = '#ff6600', opacity = 0.38 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * spread;
      values[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
      values[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }

    return values;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.26) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.034} transparent opacity={opacity} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function PremiumCore({ compact = false }) {
  const groupRef = useRef(null);
  const ringRef = useRef(null);
  const accentRingRef = useRef(null);
  const cubeRef = useRef(null);

  const panels = compact
    ? [
        { position: [-1.25, -0.08, -0.28], rotation: [0.08, 0.38, -0.08], scale: [1.14, 0.68, 0.035] },
        { position: [1.24, 0.2, -0.44], rotation: [-0.07, -0.4, 0.08], scale: [1.08, 0.64, 0.035] }
      ]
    : [
        { position: [-2.05, -0.2, -0.46], rotation: [0.1, 0.58, -0.09], scale: [1.58, 0.9, 0.05] },
        { position: [2.02, 0.24, -0.58], rotation: [-0.08, -0.56, 0.08], scale: [1.52, 0.86, 0.05] },
        { position: [0.12, -1.32, -0.86], rotation: [-0.5, 0.04, 0.02], scale: [1.96, 0.58, 0.04] }
      ];

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.44 - groupRef.current.rotation.y) * 0.052;
      groupRef.current.rotation.x += (-pointer.y * 0.22 - groupRef.current.rotation.x) * 0.052;
      groupRef.current.position.y = Math.sin(time * 0.82) * 0.08;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.28;
      cubeRef.current.rotation.y = time * 0.36;
    }

    if (ringRef.current) ringRef.current.rotation.z = time * 0.28;
    if (accentRingRef.current) accentRingRef.current.rotation.z = -time * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.35} rotationIntensity={0.42} floatIntensity={0.42}>
        <mesh rotation={[0.52, 0.42, 0.12]}>
          <icosahedronGeometry args={[compact ? 0.9 : 1.28, 4]} />
          <meshPhysicalMaterial
            color="#ff6600"
            metalness={0.42}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.08}
            emissive="#4a1600"
            emissiveIntensity={0.22}
          />
        </mesh>
      </Float>

      <mesh ref={cubeRef} position={[compact ? -1.55 : -2.5, compact ? 1.02 : 1.32, -0.35]} scale={compact ? 0.42 : 0.56}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#fff8ee" metalness={0.24} roughness={0.2} clearcoat={1} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2.25, 0, 0]}>
        <torusGeometry args={[compact ? 1.45 : 2.18, 0.018, 18, 180]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.84} />
      </mesh>

      <mesh ref={accentRingRef} rotation={[Math.PI / 2.58, 0.24, 0.2]}>
        <torusGeometry args={[compact ? 1.78 : 2.74, 0.014, 18, 180]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.82} />
      </mesh>

      {panels.map((panel, index) => (
        <Float key={index} speed={1.15 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.28}>
          <mesh position={panel.position} rotation={panel.rotation} scale={panel.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color={index === 1 ? '#111111' : '#fff8ee'}
              metalness={0.12}
              roughness={0.22}
              clearcoat={1}
              transparent
              opacity={index === 1 ? 0.95 : 0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function Hero3DStage() {
  return (
    <div className="real3d-hero-stage" aria-hidden="true">
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6.2], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.55} />
        <directionalLight position={[4, 5, 6]} intensity={2.8} />
        <pointLight position={[-3, 2, 3]} intensity={1.55} color="#ff6600" />
        <pointLight position={[2.4, -2, 2.8]} intensity={0.9} color="#ffffff" />
        <ParticleField count={160} spread={6.1} opacity={0.58} />
        <PremiumCore />
      </Canvas>
      <div className="real3d-scanlines" />
      <div className="real3d-orbit-label top">Real 3D / WebGL</div>
      <div className="real3d-orbit-label bottom">Three.js Portfolio</div>
    </div>
  );
}

function GlobalDepthScene() {
  const rigRef = useRef(null);

  useFrame(({ clock, pointer }) => {
    if (!rigRef.current) return;
    const time = clock.getElapsedTime();
    rigRef.current.rotation.y = time * 0.05 + pointer.x * 0.1;
    rigRef.current.rotation.x = -0.18 + pointer.y * 0.05;
  });

  return (
    <group ref={rigRef} position={[2.25, 0.18, -0.8]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 4, 5]} intensity={1.3} />
      <ParticleField count={210} spread={9.5} opacity={0.3} />
      <PremiumCore compact />
    </group>
  );
}

export default function Real3DGlobalLayer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const targets = Array.from(
      document.querySelectorAll('.dx-hero-card, .dx-service-card, .dx-case-card, .dx-process-card, .dx-contact-card, .dx-about-card')
    );

    const cleanups = targets.map((target) => {
      target.classList.add('real3d-tilt-target');

      const onMove = (event) => {
        const rect = target.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        target.style.setProperty('--real3d-ry', `${relX * 12}deg`);
        target.style.setProperty('--real3d-rx', `${relY * -9}deg`);
        target.classList.add('real3d-tilting');
      };

      const onLeave = () => {
        target.style.setProperty('--real3d-ry', '0deg');
        target.style.setProperty('--real3d-rx', '0deg');
        target.classList.remove('real3d-tilting');
      };

      target.addEventListener('pointermove', onMove);
      target.addEventListener('pointerleave', onLeave);

      return () => {
        target.removeEventListener('pointermove', onMove);
        target.removeEventListener('pointerleave', onLeave);
        target.classList.remove('real3d-tilt-target', 'real3d-tilting');
        target.style.removeProperty('--real3d-ry');
        target.style.removeProperty('--real3d-rx');
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  if (!ready) return null;

  return (
    <div className="real3d-depth-layer" aria-hidden="true">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 7.8], fov: 44 }} gl={{ antialias: true, alpha: true }}>
        <GlobalDepthScene />
      </Canvas>
    </div>
  );
}
