import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 shadow">
          <h1 className="text-2xl font-bold text-blue-400">Task Manager</h1>

          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-400">Register</Link>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout
</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;