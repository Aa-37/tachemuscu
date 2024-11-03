import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, CheckSquare, BarChart3 } from 'lucide-react';
import DailyPopup from './components/DailyPopup';
import WorkoutTab from './components/WorkoutTab';
import TasksTab from './components/TasksTab';
import CalendarTab from './components/CalendarTab';
import DashboardTab from './components/DashboardTab';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Tab, Task, WorkoutProgress } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('workout');
  const [showPopup, setShowPopup] = useState(true);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [progress, setProgress] = useLocalStorage<WorkoutProgress>('progress', {
    hydration: false,
    sleep: false,
    workout: false,
    date: new Date().toISOString(),
  });

  // Reset progress weekly
  useEffect(() => {
    const today = new Date();
    const progressDate = new Date(progress.date);
    const diffTime = Math.abs(today.getTime() - progressDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 7) {
      setProgress({
        hydration: false,
        sleep: false,
        workout: false,
        date: today.toISOString(),
      });
    }
  }, [progress, setProgress]);

  const handleStartDay = () => {
    setShowPopup(false);
  };

  const handleEndDay = () => {
    // Save progress and prepare for next day
    const today = new Date();
    setProgress({
      ...progress,
      date: today.toISOString(),
    });
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showPopup && (
        <DailyPopup
          onStart={handleStartDay}
          tasks={tasks.filter(task => !task.completed)}
        />
      )}

      <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-6">OrgaPlan</h1>
          <nav className="flex justify-center space-x-6">
            <button
              onClick={() => setActiveTab('workout')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'workout'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-emerald-700'
              }`}
            >
              <Activity size={20} />
              <span>Entraînement</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-emerald-700'
              }`}
            >
              <CheckSquare size={20} />
              <span>Tâches</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-emerald-700'
              }`}
            >
              <Calendar size={20} />
              <span>Calendrier</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-700'
                  : 'text-white hover:bg-emerald-700'
              }`}
            >
              <BarChart3 size={20} />
              <span>Tableau de Bord</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'workout' && <WorkoutTab progress={progress} setProgress={setProgress} />}
        {activeTab === 'tasks' && <TasksTab tasks={tasks} setTasks={setTasks} />}
        {activeTab === 'calendar' && <CalendarTab tasks={tasks} />}
        {activeTab === 'dashboard' && (
          <DashboardTab
            progress={progress}
            setProgress={setProgress}
            onEndDay={handleEndDay}
          />
        )}
      </main>
    </div>
  );
}

export default App;
