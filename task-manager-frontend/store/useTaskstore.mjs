import { create } from 'zustand';

const API_URL = 'http://localhost:4000';

const useTaskStore = create((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    set({ tasks: data });
  },

  addTask: async (title) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    set({ tasks: [...get().tasks, data] });
  },

  toggleTask: async (id, completed) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    set({
      tasks: get().tasks.map((t) => (t.id === id ? { ...t, completed } : t)),
    });
  },

  deleteTask: async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    set({ tasks: get().tasks.filter((t) => t.id !== id) });
  },
}));

export default useTaskStore;
