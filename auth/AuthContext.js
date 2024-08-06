import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        setUser(user);
        localStorage.setItem('guest', 'false');
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    if (localStorage.getItem('guest') === 'true') {
      localStorage.removeItem('guest');
      setUser(null);
      console.log('Guest user has been logged out');
    } else {
      signOut(auth)
        .then(() => {
          localStorage.setItem('guest', 'false');
          setUser(null);
          console.log('User has been logged out');
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};