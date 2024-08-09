import { useAuth } from '../../auth/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
