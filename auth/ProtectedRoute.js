import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false); // Add state for guest user

  useEffect(() => {
    // Check if the user is a guest
    const guest = localStorage.getItem('guest');
    if (guest === 'true') {
      setIsGuest(true);
    }
  }, []);

  useEffect(() => {
    if (user === undefined && !isGuest) return; // Wait until the user state is determined
    if (!user && !isGuest) {
      router.push('/login'); // Redirect to login page if user is not authenticated
    }
  }, [user, isGuest, router]);

  if (!user && !isGuest) {
    return null; // Render nothing until the user state is determined
  }

  return children;
};

export default ProtectedRoute;