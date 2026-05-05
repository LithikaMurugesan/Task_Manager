import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return  (
  <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
    <form className="bg-white p-8 rounded-2xl shadow-lg w-80"onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Welcome Back
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition" type="submit">
        Login
      </button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-medium">
          Register
        </Link>
      </p>
    </form>
  </div>
);

}
