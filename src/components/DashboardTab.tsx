import React, { useEffect, useRef } from 'react';
import { WorkoutProgress } from '../types';
import { Chart } from 'chart.js/auto';
import { Clock, Droplets, Dumbbell } from 'lucide-react';

interface DashboardTabProps {
  progress: WorkoutProgress;
  setProgress: (progress: WorkoutProgress) => void;
  onEndDay: () => void;
}

export default function DashboardTab({
  progress,
  setProgress,
  onEndDay
}: DashboardTabProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Hydratation', 'Sommeil', 'Entraînement'],
            datasets: [
              {
                label: 'Objectifs atteints',
                data: [
                  progress.hydration ? 100 : 0,
                  progress.sleep ? 100 : 0,
                  progress.workout ? 100 : 0
                ],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.5)',
                  'rgba(139, 92, 246, 0.5)',
                  'rgba(16, 185, 129, 0.5)'
                ],
                borderColor: [
                  'rgb(59, 130, 246)',
                  'rgb(139, 92, 246)',
                  'rgb(16, 185, 129)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [progress]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Hydratation</h3>
            <Droplets className="text-blue-500" size={24} />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="hydration"
              checked={progress.hydration}
              onChange={(e) =>
                setProgress({ ...progress, hydration: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="hydration" className="text-gray-600">
              2.5-3L d'eau aujourd'hui
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sommeil</h3>
            <Clock className="text-purple-500" size={24} />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="sleep"
              checked={progress.sleep}
              onChange={(e) =>
                setProgress({ ...progress, sleep: e.target.checked })
              }
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="sleep" className="text-gray-600">
              23h - 7h respecté
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Entraînement</h3>
            <Dumbbell className="text-emerald-500" size={24} />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="workout"
              checked={progress.workout}
              onChange={(e) =>
                setProgress({ ...progress, workout: e.target.checked })
              }
              className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="workout" className="text-gray-600">
              Séance terminée
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Progression hebdomadaire</h2>
        <canvas ref={chartRef} height="200"></canvas>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onEndDay}
          className="bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Terminer ma journée
        </button>
      </div>
    </div>
  );
}
