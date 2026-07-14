export interface WorkoutTemplateExerciseRequestBody {
  workoutTemplateId: number;
  exerciseId: number;
  orden: number;
  repeticiones: number;
  peso?: number;
}
