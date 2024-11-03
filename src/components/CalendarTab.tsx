import React from 'react';
import { Task } from '../types';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarTabProps {
  tasks: Task[];
}

export default function CalendarTab({ tasks }: CalendarTabProps) {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7h à 20h

  const getWorkoutForDay = (day: string) => {
    switch (day) {
      case 'Lundi': return 'Haut du corps + Abdos';
      case 'Mardi': return 'Bas du corps + Cardio';
      case 'Mercredi': return 'Repos actif';
      case 'Jeudi': return 'Haut du corps + Abdos';
      case 'Vendredi': return 'Bas du corps + Cardio';
      case 'Samedi': return 'Circuit complet';
      case 'Dimanche': return 'Repos';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Planning hebdomadaire</h2>
          <CalendarIcon size={24} className="text-emerald-600" />
        </div>

        <div className="grid grid-cols-8 gap-4">
          {/* Time column */}
          <div className="space-y-6">
            <div className="h-20"></div> {/* Header spacing */}
            {hours.map(hour => (
              <div key={hour} className="h-24 flex items-center justify-end pr-4">
                <span className="text-sm text-gray-500">{hour}:00</span>
              </div>
            ))}
          </div>

          {/* Days columns */}
          {days.map(day => (
            <div key={day} className="space-y-6">
              <div className="h-20 flex flex-col items-center justify-center bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">{day}</h3>
                <p className="text-xs text-emerald-600 mt-1">{getWorkoutForDay(day)}</p>
              </div>
              {hours.map(hour => {
                const dayTasks = tasks.filter(task => {
                  const taskDate = new Date(task.dueDate);
                  return taskDate.getHours() === hour;
                });

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-24 border border-gray-100 rounded-lg p-2"
                  >
                    {dayTasks.map(task => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded mb-1 ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
