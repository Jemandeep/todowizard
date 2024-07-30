"use client";
import GithubLogin from "../../auth/GithubLogin";



const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <GithubLogin />
      </div>
    </div>
  );
};

export default LoginPage;
