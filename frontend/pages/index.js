import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      await api.put(`/tasks/${editingTask.id}`, {
        title,
        status: editingTask.status,
      });
      setEditingTask(null);
    } else {
      await api.post('/tasks', { title });
    }

    setTitle('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
  };

  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      status: task.status === 'pending' ? 'done' : 'pending',
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center">Mini Task Manager</h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingTask ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-200"
            >
              <div>
                <p
                  className={`text-lg font-medium ${
                    task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    task.status === 'done'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(task)}
                  className="hover:text-green-600 transition"
                  title="Toggle status"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="hover:text-blue-600 transition"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="hover:text-red-600 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
