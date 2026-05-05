import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title) return alert("Enter task title");
    if (!assignedTo) return alert("Enter assigned email");

    await API.post("/tasks", {
      title,
      assignedTo
    });

    setTitle("");
    setAssignedTo("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

    
      {user?.role === "admin" && (
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="border p-2 flex-1 rounded"
          />

          <input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assign to (email)"
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={createTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>
      )}

     
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-5 rounded-2xl shadow mb-4">
          
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">{task.title}</h2>

            <span className={`px-3 py-1 rounded-full text-sm ${
              task.status === "Done" ? "bg-green-100 text-green-600" :
              task.status === "In Progress" ? "bg-yellow-100 text-yellow-600" :
              "bg-gray-200 text-gray-600"
            }`}>
              {task.status}
            </span>
          </div>

          
          <p className="text-sm text-gray-500 mt-1">
            Assigned to: {task.assignedTo || "Unassigned"}
          </p>

          
          <div className="mt-3">
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              disabled={
                user?.role === "member" && task.assignedTo !== user.email
              }
              className="border p-2 rounded w-full"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

        </div>
      ))}

    </div>
  );
}