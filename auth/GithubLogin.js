import { auth } from '../../firebase/firebaseConfig';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const GithubLogin = () => {
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  return (
    <button onClick={handleGithubLogin} className="bg-gray-800 text-white px-4 py-2 rounded">
      Sign in with GitHub
    </button>
  );
};

export default GithubLogin;
