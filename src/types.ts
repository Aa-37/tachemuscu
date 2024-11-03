export type Tab = 'workout' | 'tasks' | 'calendar' | 'dashboard';

export interface Task {
  id: string;
  title: string;
  priority: 'medium' | 'high';
  dueDate: string;
  completed: boolean;
}

export interface WorkoutProgress {
  hydration: boolean;
  sleep: boolean;
  workout: boolean;
  date: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  completed: boolean;
  notes?: string;
}

export interface WorkoutDay {
  title: string;
  description: string;
  exercises: Exercise[];
}
