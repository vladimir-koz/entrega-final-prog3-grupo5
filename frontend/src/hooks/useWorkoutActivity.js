import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import { getDetailedTrainingPrograms } from "../services/planningService";
import { getRoutineExercises, getRoutines } from "../services/routineService";
import { createWorkout, deleteWorkout, getWorkouts } from "../services/workoutService";
import {
  createEmptyExerciseLine,
  hasIncompleteExerciseLines,
  hydrateExerciseLines,
  serializeExerciseLines,
} from "../utils/exerciseLineUtils";

const DEFAULT_WORKOUT_NAME = "Entrenamiento libre";

function flattenScheduledWorkouts(programs, workouts) {
  const completedIds = new Set(
    workouts
      .map((workout) => workout.scheduledWorkoutId)
      .filter((scheduledWorkoutId) => scheduledWorkoutId != null),
  );

  return programs.flatMap((program) =>
    (program.weeks || []).flatMap((week) =>
      (week.scheduledWorkouts || []).map((session) => ({
        ...session,
        label: `${program.nombre} · Semana ${week.numeroSemana} · ${session.nombre}`,
        completed: completedIds.has(session.id),
      })),
    ),
  );
}

export function useWorkoutActivity() {
  const [exercises, setExercises] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState(DEFAULT_WORKOUT_NAME);
  const [timestamp, setTimestamp] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [scheduledWorkoutId, setScheduledWorkoutId] = useState("");
  const [sets, setSets] = useState([createEmptyExerciseLine()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([getExercises(), getRoutines(), getWorkouts(), getDetailedTrainingPrograms()])
      .then(([exerciseData, routineData, workoutData, programData]) => {
        if (!active) return;
        setExercises(exerciseData);
        setRoutines(routineData);
        setWorkouts(workoutData);
        setScheduledWorkouts(flattenScheduledWorkouts(programData, workoutData));
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  function toggleForm() {
    if (formOpen) {
      resetForm();
      return;
    }

    setFormOpen(true);
  }

  function resetForm() {
    setFormOpen(false);
    setRoutineId("");
    setScheduledWorkoutId("");
    setName(DEFAULT_WORKOUT_NAME);
    setTimestamp("");
    setSets([createEmptyExerciseLine()]);
  }

  async function selectRoutine(value) {
    setScheduledWorkoutId("");
    setRoutineId(value);

    if (!value) {
      setName(DEFAULT_WORKOUT_NAME);
      setSets([createEmptyExerciseLine()]);
      return;
    }

    try {
      const selected = routines.find((routine) => routine.id === Number(value));
      const routineSets = await getRoutineExercises(value);
      setName(selected?.nombre || "Entrenamiento de rutina");
      setSets(hydrateExerciseLines(routineSets));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function selectScheduledWorkout(value) {
    setScheduledWorkoutId(value);

    if (!value) {
      setRoutineId("");
      setName(DEFAULT_WORKOUT_NAME);
      setSets([createEmptyExerciseLine()]);
      return;
    }

    try {
      const scheduledWorkout = scheduledWorkouts.find((session) => session.id === Number(value));

      if (!scheduledWorkout) return;

      const templateId = String(scheduledWorkout.workoutTemplateId);
      const routineSets = await getRoutineExercises(templateId);
      setRoutineId(templateId);
      setName(scheduledWorkout.nombre);
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
        timestamp: timestamp ? new Date(timestamp).toISOString() : undefined,
        workoutTemplateId: routineId ? Number(routineId) : undefined,
        scheduledWorkoutId: scheduledWorkoutId ? Number(scheduledWorkoutId) : undefined,
        series: serializeExerciseLines(sets),
      });
      setWorkouts((current) => [workout, ...current]);
      setScheduledWorkouts((current) =>
        current.map((session) =>
          session.id === workout.scheduledWorkoutId ? { ...session, completed: true } : session,
        ),
      );
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
      const removed = workouts.find((workout) => workout.id === id);
      const remainingWorkouts = workouts.filter((workout) => workout.id !== id);
      await deleteWorkout(id);
      setWorkouts(remainingWorkouts);

      if (removed?.scheduledWorkoutId) {
        const stillCompleted = remainingWorkouts.some(
          (workout) => workout.scheduledWorkoutId === removed.scheduledWorkoutId,
        );
        setScheduledWorkouts((current) =>
          current.map((session) =>
            session.id === removed.scheduledWorkoutId
              ? { ...session, completed: stillCompleted }
              : session,
          ),
        );
      }
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return {
    exercises,
    routines,
    scheduledWorkouts,
    recentWorkouts: workouts.slice(0, 10),
    formOpen,
    toggleForm,
    name,
    setName,
    timestamp,
    setTimestamp,
    routineId,
    selectRoutine,
    scheduledWorkoutId,
    selectScheduledWorkout,
    sets,
    setSets,
    error,
    saving,
    submitWorkout,
    removeWorkout,
  };
}
