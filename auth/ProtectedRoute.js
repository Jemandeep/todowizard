import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // Wait until the user state is determined
    if (!user) {
      router.push('/login'); // Redirect to login page if user is not authenticated
    }
  }, [user, router]);

  if (!user) {
    return null; // Render nothing until the user state is determined
  }

  return children;
};

export default ProtectedRoute;