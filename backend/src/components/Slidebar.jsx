import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg ${
      pathname === path ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-60 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-6">Task Manager</h2>

      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link to="/projects" className={linkClass("/projects")}>Projects</Link>
        <Link to="/tasks" className={linkClass("/tasks")}>Tasks</Link>
      </nav>
    </div>
  );
}
