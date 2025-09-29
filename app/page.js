'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useTaskStore from '@/store/useTaskstore.mjs';

export default function Home() {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title);
    setTitle('');
  };

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Task Manager ✅</h1>
        <Link href='/github' className='text-gray-500 underline'>
          Github
        </Link>
      </div>

      <div className='flex gap-2 mb-4'>
        <input
          className='border p-2 flex-1'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter task...'
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className='space-y-2'>
        {tasks.map((task) => (
          <li
            key={task.id}
            className='flex justify-between items-center border p-2 rounded'>
            <span
              onClick={() => toggleTask(task.id, task.completed ? 0 : 1)}
              className={`cursor-pointer ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
              {task.title}
            </span>
            <button
              className='text-red-500'
              onClick={() => deleteTask(task.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
