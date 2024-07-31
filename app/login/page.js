"use client";
import GithubLogin from "../../auth/GithubLogin";



const LoginPage = () => {
  const handleGuestLogin = () => {
    localStorage.setItem('guest', 'true'); // Set guest login flag
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <GithubLogin />
        <button
          onClick={handleGuestLogin}
          className="w-full flex items-center justify-center mt-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Sign in as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;