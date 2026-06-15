import { ExerciseDifficulty } from '../models/Exercise';

export interface ExerciseRequestBody {
  nombre: string;
  descripcion?: string;
  grupoMuscular: string;
  equipamiento?: string;
  dificultad?: ExerciseDifficulty;
}
