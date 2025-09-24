import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  updateEmail,
  // type User
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import { getAuthErrorMessage } from '../utils/authErrors';

// User role types
export type UserRole = 'user' | 'instructor' | 'admin';

// Extended user interface
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role?: UserRole;
  createdAt?: Date;
  lastLoginAt?: Date;
}

// Authentication context interface
interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role?: UserRole) => Promise<void>;
  signInWithGoogle: (role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          role: userData?.role || 'user',
          createdAt: userData?.createdAt?.toDate(),
          lastLoginAt: new Date()
        };

        // Update last login time
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          lastLoginAt: new Date()
        }).catch(() => {
          // If user document doesn't exist, create it
          setDoc(doc(db, 'users', firebaseUser.uid), {
            role: 'user',
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            createdAt: new Date(),
            lastLoginAt: new Date()
          });
        });

        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName: string, role: UserRole = 'user'): Promise<void> => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(firebaseUser, { displayName });
      
      // Send email verification
      await sendEmailVerification(firebaseUser);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        role,
        displayName,
        email,
        photoURL: null,
        emailVerified: false,
        createdAt: new Date(),
        lastLoginAt: new Date()
      });
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google function
  const signInWithGoogle = async (role: UserRole = 'user'): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create user document for new Google sign-in user
        await setDoc(doc(db, 'users', user.uid), {
          role,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          lastLoginAt: new Date()
        });
      } else {
        // Update last login time for existing user
        await updateDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date()
        });
      }
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOutUser = async (): Promise<void> => {
    try {
      setLoading(true);
      // Optimistically clear user state
      setUser(null);
      await signOut(auth);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  // Send email verification function
  const sendEmailVerificationToUser = async (): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      await sendEmailVerification(currentUser);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  // Update user profile
  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      await updateProfile(currentUser, data);
      
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: new Date()
      });
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  // Update user password
  const updateUserPassword = async (newPassword: string): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      await updatePassword(currentUser, newPassword);
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  // Update user email
  const updateUserEmail = async (newEmail: string): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      await updateEmail(currentUser, newEmail);
      
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        email: newEmail,
        updatedAt: new Date()
      });
    } catch (error: unknown) {
      const errorCode = (error as { code?: string })?.code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };


  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut: signOutUser,
    resetPassword,
    sendEmailVerification: sendEmailVerificationToUser,
    updateUserProfile,
    updateUserPassword,
    updateUserEmail,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, type AuthContextType };
export default AuthContext;
