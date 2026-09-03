'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Stylized articulated truck built from primitives + PBR materials.
 * Not a literal photogrammetry scan (no legally downloadable, web-optimized
 * scan of a real articulated truck was available) — this is the interim
 * hero asset. Swap for a real scan of PADTI's own training truck via
 * `useGLTF('/models/padti-truck.glb')` once one exists; the group below
 * is the drop-in point (see truck-scene.tsx).
 */

function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x -= delta * 3.2;
  });
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.42, 24]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.44, 12]} />
        <meshStandardMaterial color="#c7cdd3" roughness={0.25} metalness={0.9} />
      </mesh>
    </group>
  );
}

export const TruckModel = forwardRef<THREE.Group, JSX.IntrinsicElements['group']>(function TruckModel(props, ref) {
  return (
    <group {...props} ref={ref} dispose={null}>
      {/* Cab */}
      <group position={[2.1, 0.85, 0]}>
        <RoundedBox args={[1.7, 1.5, 1.9]} radius={0.12} smoothness={4} position={[0, 0.35, 0]} castShadow>
          <meshStandardMaterial color="#ff7a1a" roughness={0.28} metalness={0.35} />
        </RoundedBox>
        {/* windshield */}
        <mesh position={[0.75, 0.75, 0]} rotation={[0, 0, -0.28]}>
          <boxGeometry args={[0.08, 0.75, 1.6]} />
          <meshPhysicalMaterial color="#0a0e12" roughness={0.05} metalness={0.1} transmission={0.4} thickness={0.2} />
        </mesh>
        {/* grille */}
        <mesh position={[0.86, -0.05, 0]}>
          <boxGeometry args={[0.05, 0.6, 1.5]} />
          <meshStandardMaterial color="#111316" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* bumper */}
        <mesh position={[0.9, -0.55, 0]}>
          <boxGeometry args={[0.18, 0.28, 1.85]} />
          <meshStandardMaterial color="#d7dadd" roughness={0.15} metalness={0.95} />
        </mesh>
        {/* headlights */}
        <mesh position={[0.9, -0.15, 0.75]}>
          <boxGeometry args={[0.06, 0.22, 0.28]} />
          <meshStandardMaterial color="#fff7e6" emissive="#ffb347" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0.9, -0.15, -0.75]}>
          <boxGeometry args={[0.06, 0.22, 0.28]} />
          <meshStandardMaterial color="#fff7e6" emissive="#ffb347" emissiveIntensity={1.4} />
        </mesh>
        {/* exhaust stacks */}
        <mesh position={[0.1, 1.15, 0.85]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 12]} />
          <meshStandardMaterial color="#c7cdd3" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0.1, 1.15, -0.85]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 12]} />
          <meshStandardMaterial color="#c7cdd3" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* mirrors */}
        <mesh position={[0.95, 0.55, 0.95]}>
          <boxGeometry args={[0.06, 0.28, 0.16]} />
          <meshStandardMaterial color="#111316" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.95, 0.55, -0.95]}>
          <boxGeometry args={[0.06, 0.28, 0.16]} />
          <meshStandardMaterial color="#111316" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Chassis rail */}
      <mesh position={[-1.1, 0.28, 0]} castShadow>
        <boxGeometry args={[6.4, 0.18, 1.8]} />
        <meshStandardMaterial color="#1b1e22" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Trailer */}
      <group position={[-2.3, 1.1, 0]}>
        <RoundedBox args={[4.6, 2.1, 2.0]} radius={0.06} smoothness={2} castShadow receiveShadow>
          <meshStandardMaterial color="#f4f1ea" roughness={0.45} metalness={0.08} />
        </RoundedBox>
        {/* branding stripe */}
        <mesh position={[0, -0.55, 1.005]}>
          <boxGeometry args={[4.62, 0.35, 0.01]} />
          <meshStandardMaterial color="#ff7a1a" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.55, -1.005]}>
          <boxGeometry args={[4.62, 0.35, 0.01]} />
          <meshStandardMaterial color="#ff7a1a" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* rear doors seam */}
        <mesh position={[-2.31, 0, 0]}>
          <boxGeometry args={[0.01, 2.1, 2.0]} />
          <meshStandardMaterial color="#2a2d31" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>

      {/* Wheels */}
      <Wheel position={[2.2, 0.05, 1.0]} />
      <Wheel position={[2.2, 0.05, -1.0]} />
      <Wheel position={[0.9, 0.05, 1.0]} />
      <Wheel position={[0.9, 0.05, -1.0]} />
      <Wheel position={[-1.7, 0.05, 1.0]} />
      <Wheel position={[-1.7, 0.05, -1.0]} />
      <Wheel position={[-2.9, 0.05, 1.0]} />
      <Wheel position={[-2.9, 0.05, -1.0]} />
    </group>
  );
});

export function TruckScene({ scrollTriggerId }: { scrollTriggerId?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = groupRef.current;
    const idle = gsap.to(el.rotation, {
      y: `+=${Math.PI * 0.06}`,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    let st: ScrollTrigger | undefined;
    if (scrollTriggerId) {
      const trigger = document.getElementById(scrollTriggerId);
      if (trigger) {
        st = ScrollTrigger.create({
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            el.rotation.y = 0.55 + self.progress * Math.PI * 0.85;
            el.position.y = -0.1 - Math.sin(self.progress * Math.PI) * 0.12;
          },
        });
      }
    }

    return () => {
      idle.kill();
      st?.kill();
    };
  }, [scrollTriggerId]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.2}
        color="#fff4e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#7c97aa" />
      <Environment preset="city" />
      <TruckModel ref={groupRef} rotation={[0, 0.55, 0]} />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={12} blur={2.2} far={4} />
    </>
  );
}
