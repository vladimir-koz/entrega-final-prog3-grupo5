import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import { getRoutineExercises, getRoutines } from "../services/routineService";
import { createWorkout, deleteWorkout, getWorkouts } from "../services/workoutService";
import { isToday } from "../utils/dateUtils";
import {
  createEmptyExerciseLine,
  hasIncompleteExerciseLines,
  hydrateExerciseLines,
  serializeExerciseLines,
} from "../utils/exerciseLineUtils";

const DEFAULT_WORKOUT_NAME = "Entrenamiento libre";

export function useWorkoutActivity() {
  const [exercises, setExercises] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState(DEFAULT_WORKOUT_NAME);
  const [routineId, setRoutineId] = useState("");
  const [sets, setSets] = useState([createEmptyExerciseLine()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([getExercises(), getRoutines(), getWorkouts()])
      .then(([exerciseData, routineData, workoutData]) => {
        if (!active) return;
        setExercises(exerciseData);
        setRoutines(routineData);
        setWorkouts(workoutData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  function toggleForm() {
    setFormOpen((open) => !open);
  }

  function resetForm() {
    setFormOpen(false);
    setRoutineId("");
    setName(DEFAULT_WORKOUT_NAME);
    setSets([createEmptyExerciseLine()]);
  }

  async function selectRoutine(value) {
    setRoutineId(value);
    if (!value) return;

    try {
      const selected = routines.find((routine) => routine.id === Number(value));
      const routineSets = await getRoutineExercises(value);
      setName(selected?.nombre || "Entrenamiento de rutina");
      setSets(hydrateExerciseLines(routineSets));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function submitWorkout(event) {
    event.preventDefault();
    setError("");

    if (hasIncompleteExerciseLines(sets)) {
      setError("Completá ejercicio, repeticiones y peso en todas las series.");
      return;
    }

    setSaving(true);
    try {
      const workout = await createWorkout({
        nombre: name,
        workoutTemplateId: routineId ? Number(routineId) : undefined,
        series: serializeExerciseLines(sets),
      });
      setWorkouts((current) => [workout, ...current]);
      resetForm();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeWorkout(id) {
    if (!window.confirm("¿Eliminar este entrenamiento?")) return;

    try {
      await deleteWorkout(id);
      setWorkouts((current) => current.filter((workout) => workout.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return {
    exercises,
    routines,
    todayWorkouts: workouts.filter((workout) => isToday(workout.timestamp)),
    formOpen,
    toggleForm,
    name,
    setName,
    routineId,
    selectRoutine,
    sets,
    setSets,
    error,
    saving,
    submitWorkout,
    removeWorkout,
  };
}
