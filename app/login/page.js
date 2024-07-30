import GithubLogin from '../auth/GithubLogin';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <GithubLogin />
      </div>
    </div>
  );
};

export default LoginPage;
