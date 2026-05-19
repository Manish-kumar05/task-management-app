import { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <h2 className="text-2xl">Please login first</h2>
      </div>
    );
  }

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(
        `/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-400 mb-8">
          Task Dashboard
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-6 rounded-2xl shadow-lg mb-8"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-semibold"
          >
            Add Task
          </button>
        </form>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg bg-slate-800 border border-slate-700 outline-none"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-slate-900 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-2">
                {task.title}
              </h3>

              <p className="text-slate-300 mb-4">{task.description}</p>

              <p className="mb-4">
                Status:{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {task.status}
                </span>
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-center text-slate-400 mt-8">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;