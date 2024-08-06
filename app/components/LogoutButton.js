"use client";

import { useAuth } from '../../auth/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();
  
    return (
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    );
  };
  
  export default LogoutButton;
