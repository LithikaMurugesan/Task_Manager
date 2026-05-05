import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
  <h1 className="font-bold text-lg text-blue-600">Task Manager</h1>

  <div className="flex gap-4">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/projects">Projects</Link>
    <Link to="/tasks">Tasks</Link>
  </div>

  <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
    Logout
  </button>
</div>

}
