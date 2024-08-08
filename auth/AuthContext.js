import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; 
import { onAuthStateChanged, signOut,GithubAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          type: 'github',
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        });
        localStorage.setItem('guest', 'false');
      } else if (localStorage.getItem('guest') === 'true') {
        setUser({ type: 'guest' });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  const logout = () => {
    if (auth.currentUser) {
      signOut(auth);
    }
    localStorage.removeItem('guest');
    setUser(null);
    router.push('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, logout, handleGithubLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};