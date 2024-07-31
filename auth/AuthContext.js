import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // Initialize user state as undefined

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('guest', 'false'); // Clear guest login on auth change
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.setItem('guest', 'false'); // Clear guest login on logout
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);