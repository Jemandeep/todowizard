import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect ,useState} from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false); // State for guest user

  useEffect(() => {
    const guest = localStorage.getItem('guest');
    console.log("Guest state from localStorage:", guest);
    if (guest === 'true') {
      setIsGuest(true);
    }
  }, []);

  useEffect(() => {
    console.log("User state:", user);
    console.log("Guest state:", isGuest);
    if (user === undefined && !isGuest) return; // Wait until user state is determined
    if (!user && !isGuest) {
      console.log("Redirecting to login...");
      router.push('/login'); // Redirect to login page if user is not authenticated
    }
  }, [user, isGuest, router]);

  if (!user && !isGuest) {
    console.log("Rendering nothing as user state is undefined and not guest");
    return null; // Render nothing until user state is determined
  }

  console.log("Rendering children as user is authenticated or guest");
  return children;
};

export default ProtectedRoute;