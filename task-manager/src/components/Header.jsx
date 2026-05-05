import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-gray-700">Welcome, {user?.email}</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {user?.role}
        </span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
