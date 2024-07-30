import { auth } from '../firebase/firebaseConfig';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const GithubLogin = () => {
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    if (process.env.NODE_ENV === 'development') {
      provider.setCustomParameters({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_LOCAL,
        redirect_uri: 'http://localhost:3000/auth/callback', // Ensure this matches the registered callback URL
      });
    } else {
      provider.setCustomParameters({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PRODUCTION,
        redirect_uri: 'https://your-vercel-app.vercel.app/auth/callback', // Ensure this matches the registered callback URL
      });
    }

    try {
      await signInWithPopup(auth, provider);
      console.log("GitHub authentication successful!");
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGithubLogin}
      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 .5a11.5 11.5 0 00-3.644 22.415c.575.105.785-.25.785-.555v-2.167c-3.176.694-3.843-1.53-3.843-1.53-.523-1.324-1.28-1.677-1.28-1.677-1.046-.715.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.028 1.768 2.693 1.257 3.35.96.103-.746.402-1.257.73-1.545-2.533-.287-5.2-1.267-5.2-5.638 0-1.247.45-2.267 1.185-3.067-.117-.287-.513-1.437.113-2.993 0 0 .97-.31 3.178 1.175a11.07 11.07 0 015.775 0C17.32 5.543 18.29 5.854 18.29 5.854c.626 1.556.23 2.706.113 2.993.736.8 1.185 1.82 1.185 3.067 0 4.38-2.667 5.35-5.207 5.63.41.354.774 1.047.774 2.11v3.137c0 .308.21.664.79.553A11.501 11.501 0 0012 .5z"
        />
      </svg>
      Click here to login using GitHub
    </button>
  );
};

export default GithubLogin;