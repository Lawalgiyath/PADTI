'use client';

import { useMemo, useRef } from 'react';

/**
 * A custom hook to stabilize Firestore references and queries.
 * It uses a ref to store the previous value and only updates it if the dependencies change.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<T>(null);
  const prevDeps = useRef<any[]>(null);

  const hasChanged = !prevDeps.current || deps.some((dep, i) => dep !== prevDeps.current![i]);

  if (hasChanged) {
    (ref as any).current = factory();
    (prevDeps as any).current = deps;
  }

  return ref.current!;
}
