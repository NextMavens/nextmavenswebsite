'use client';

import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types/user';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          // If user doesn't exist in Firestore, create a new profile
          if (!userDoc.exists()) {
            const newUser = {
              email: firebaseUser.email!,
              name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
              role: 'customer' as const,
              createdAt: new Date().toISOString(),
              photoURL: firebaseUser.photoURL || undefined,
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser({ id: firebaseUser.uid, ...newUser });
          } else {
            setUser({ id: firebaseUser.uid, ...userDoc.data() } as UserProfile);
          }
          
          // Create session cookie
          const idToken = await firebaseUser.getIdToken();
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
        } else {
          setUser(null);
        }
      } catch (error: any) {
        console.error('Auth state error:', error);
        if (error.code === 'permission-denied') {
          console.error('Firestore permissions error. Please check security rules.');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    return { id: firebaseUser.uid, ...userDoc.data() } as UserProfile;
  };

  const signUp = async (email: string, password: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    const userProfile: Omit<UserProfile, 'id'> = {
      email: firebaseUser.email!,
      name: firebaseUser.displayName || email.split('@')[0],
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);
    return { id: firebaseUser.uid, ...userProfile };
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    await fetch('/api/auth/session', { method: 'DELETE' });
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
} 