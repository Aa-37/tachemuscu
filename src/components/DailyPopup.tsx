import React from 'react';
import { Task } from '../types';
import { X } from 'lucide-react';

interface DailyPopupProps {
  onStart: () => void;
  tasks: Task[];
}

export default function DailyPopup({ onStart, tasks }: DailyPopupProps) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  const workoutZone = (() => {
    switch (dayOfWeek) {
      case 1: return "Haut du corps + Abdos";
      case 2: return "Bas du corps + Cardio";
      case 3: return "Repos actif (marche, étirements)";
      case 4: return "Haut du corps + Abdos";
      case 5: return "Bas du corps + Cardio";
      case 6: return "Circuit complet";
      default: return "Repos complet";
    }
  })();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Résumé de la Journée</h2>
          <button
            onClick={onStart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Date</h3>
            <p className="text-lg">{today.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Objectifs du Jour</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Hydratation: 2.5-3L d'eau</li>
              <li>Sommeil: Coucher 23h - Lever 7h</li>
              <li>Zone d'entraînement: {workoutZone}</li>
            </ul>
          </div>

          {tasks.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tâches en attente</h3>
              <ul className="list-disc list-inside space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="text-gray-600">
                    {task.title}
                    {task.priority === 'high' && (
                      <span className="ml-2 text-red-500 text-sm">(Urgent)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={onStart}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Commencer ma journée
          </button>
        </div>
      </div>
    </div>
  );
}
