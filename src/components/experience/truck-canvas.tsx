'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { TruckScene } from './truck-model';

export function TruckCanvas({ scrollTriggerId }: { scrollTriggerId?: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [9, 3.2, 8], fov: 26 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="!touch-none"
    >
      <Suspense fallback={null}>
        <TruckScene scrollTriggerId={scrollTriggerId} />
      </Suspense>
    </Canvas>
  );
}
