import { useRouter } from 'next/router';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const GithubLogin = () => {
  const router = useRouter(); // Make sure to initialize the router here

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGithubLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 flex items-center justify-center shadow-lg transition duration-200"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.261.82-.58 0-.29-.011-1.056-.017-2.074-3.338.726-4.042-1.607-4.042-1.607-.546-1.387-1.334-1.757-1.334-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.838 1.238 1.838 1.238 1.07 1.833 2.807 1.304 3.492.997.108-.775.419-1.304.762-1.604-2.666-.305-5.467-1.334-5.467-5.93 0-1.31.469-2.382 1.237-3.22-.124-.303-.536-1.527.117-3.18 0 0 1.01-.323 3.3 1.23a11.52 11.52 0 013.004-.404c1.02.004 2.047.138 3.004.404 2.287-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.877.12 3.18.77.838 1.237 1.91 1.237 3.22 0 4.61-2.807 5.623-5.481 5.92.43.37.823 1.1.823 2.217 0 1.6-.014 2.887-.014 3.28 0 .322.217.697.824.579C20.565 21.796 24 17.302 24 12c0-6.628-5.372-12-12-12z"
          clipRule="evenodd"
        />
      </svg>
      Sign in with GitHub
    </button>
  );
};

export default GithubLogin;
