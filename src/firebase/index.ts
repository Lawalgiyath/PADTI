'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
} {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app);

  // Firestore's default WebChannel transport gets silently blocked/aborted in
  // some network environments (proxies, sandboxes, certain firewalls) while
  // plain REST calls (like Auth) go through fine - writes then hang forever
  // with no error. Auto-detecting long-polling is the standard SDK-level fix.
  let db: Firestore;
  try {
    db = initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false });
  } catch {
    db = getFirestore(app);
  }

  return { app, auth, db };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './firestore/use-memo-firebase';
export * from './error-emitter';
export * from './errors';
