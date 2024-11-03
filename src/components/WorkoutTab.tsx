import React from 'react';
import { WorkoutProgress, Exercise, WorkoutDay } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface WorkoutTabProps {
  progress: WorkoutProgress;
  setProgress: (progress: WorkoutProgress) => void;
}

const workoutSchedule: { [key: number]: WorkoutDay } = {
  1: {
    title: "Haut du corps + Abdos",
    description: "Focus sur le développement de la force et de la masse musculaire du haut du corps",
    exercises: [
      {
        name: "Élévations latérales avec haltères",
        sets: 4,
        reps: 15,
        rest: 45,
        completed: false,
        notes: "2 sec montée, 3 sec descente"
      },
      {
        name: "Pompes avec haltères",
        sets: 3,
        reps: 20,
        rest: 60,
        completed: false,
        notes: "3 sec descente, 1 sec montée"
      },
      {
        name: "Row incliné",
        sets: 4,
        reps: 12,
        rest: 60,
        completed: false,
        notes: "2 sec tirage, 2 sec relâchement"
      },
      {
        name: "Curls marteau",
        sets: 4,
        reps: 15,
        rest: 45,
        completed: false,
        notes: "2 sec montée, 2 sec descente"
      },
      {
        name: "Russian Twist",
        sets: 3,
        reps: 20,
        rest: 30,
        completed: false,
        notes: "10 reps par côté"
      },
      {
        name: "Toe Touch avec poids",
        sets: 3,
        reps: 15,
        rest: 30,
        completed: false,
        notes: "1 sec toucher, 2 sec descente"
      }
    ]
  },
  2: {
    title: "Bas du corps + Cardio",
    description: "Développement des jambes et amélioration de l'endurance cardiovasculaire",
    exercises: [
      {
        name: "Squats bulgares",
        sets: 4,
        reps: 12,
        rest: 60,
        completed: false,
        notes: "6kg supplémentaires, 3 sec descente, 1 sec montée"
      },
      {
        name: "Jumping Jacks",
        sets: 3,
        reps: 50,
        rest: 30,
        completed: false,
        notes: "Rythme rapide et constant"
      },
      {
        name: "Corde à sauter",
        sets: 4,
        reps: 0,
        rest: 30,
        completed: false,
        notes: "1 minute par série"
      },
      {
        name: "Planche",
        sets: 3,
        reps: 0,
        rest: 30,
        completed: false,
        notes: "45 secondes par série"
      }
    ]
  }
  // ... autres jours similaires
};

export default function WorkoutTab({ progress, setProgress }: WorkoutTabProps) {
  const today = new Date().getDay();
  const workout = workoutSchedule[today];

  const toggleExercise = (index: number) => {
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[index].completed = !updatedWorkout.exercises[index].completed;
    
    // Update progress if all exercises are completed
    const allCompleted = updatedWorkout.exercises.every(ex => ex.completed);
    if (allCompleted) {
      setProgress({ ...progress, workout: true });
    }
  };

  if (!workout) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Jour de repos</h2>
        <p className="text-gray-600">
          Aujourd'hui est un jour de récupération. Profitez-en pour vous étirer et vous reposer.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{workout.title}</h2>
        <p className="text-gray-600 mb-6">{workout.description}</p>
        
        <div className="space-y-6">
          {workout.exercises.map((exercise, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleExercise(index)}
                      className="text-emerald-600 hover:text-emerald-700 mr-3"
                    >
                      {exercise.completed ? (
                        <CheckCircle2 size={24} className="fill-current" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exercise.name}
                    </h3>
                  </div>
                  <div className="ml-9 mt-2 text-sm text-gray-600">
                    <p>Séries: {exercise.sets} × {exercise.reps} {exercise.reps ? 'répétitions' : ''}</p>
                    <p>Repos: {exercise.rest} secondes</p>
                    {exercise.notes && <p className="text-emerald-600 mt-1">{exercise.notes}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
