import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [member, setMember] = useState("");

  const { user } = useContext(AuthContext);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return alert("Enter project name");

    await API.post("/projects", {
      name,
      members: member ? [member] : []
    });

    setName("");
    setMember("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Projects</h1>

     
      {user?.role === "admin" && (
        <div className="flex gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="border p-2 flex-1 rounded"
          />

          <input
            value={member}
            onChange={(e) => setMember(e.target.value)}
            placeholder="Member email"
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={createProject}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>
      )}

      {/* Project List */}
      {projects.map((p) => (
        <div key={p._id} className="bg-white p-5 rounded-2xl shadow mb-4">
          <h2 className="font-semibold text-lg">{p.name}</h2>

          <p className="text-sm text-gray-500 mt-2">
            Members: {p.members?.join(", ") || "None"}
          </p>
        </div>
      ))}

    </div>
  );
}