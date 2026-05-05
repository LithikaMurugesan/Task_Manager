import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Tasks</h1>

      {tasks.map(task => (
        <div key={task._id} className="border p-3 mb-2">
          <h2>{task.title}</h2>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
            className="border mt-2"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
