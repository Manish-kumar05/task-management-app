import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl shadow-lg w-[400px]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 border border-slate-700 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;