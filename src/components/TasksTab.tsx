import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface TasksTabProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export default function TasksTab({ tasks, setTasks }: TasksTabProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      dueDate,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleAddTask} className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Nouvelle tâche"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priorité
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'medium' | 'high')}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="medium">Moyenne</option>
              <option value="high">Urgente</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'échéance
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus size={20} />
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Mes tâches</h2>
        
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                task.completed ? 'bg-gray-50' : 'bg-white'
              } border border-gray-200`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  {task.completed ? (
                    <CheckCircle2 size={24} className="fill-current" />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <div className={task.completed ? 'line-through text-gray-500' : ''}>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    Échéance: {new Date(task.dueDate).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
              
              {task.priority === 'high' && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-4">
                  Urgent
                </span>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Aucune tâche pour le moment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
