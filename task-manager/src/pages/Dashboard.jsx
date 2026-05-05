import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/tasks");
      const tasks = res.data;

      const total = tasks.length;
      const completed = tasks.filter(t => t.status === "Done").length;
      const pending = total - completed;

      
      const overdue = tasks.filter(
        t =>
          t.deadline &&
          new Date(t.deadline) < new Date() &&
          t.status !== "Done"
      ).length;

      setStats({ total, completed, pending, overdue });
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">

       
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-3xl font-bold text-green-500">
            {stats.completed}
          </p>
        </div>

      
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {stats.pending}
          </p>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Overdue</h2>
          <p className="text-3xl font-bold text-red-500">
            {stats.overdue}
          </p>
        </div>

      </div>
    </div>
  );
}