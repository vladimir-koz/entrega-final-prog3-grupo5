import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import {
  addRoutineExercise,
  createRoutine,
  deleteRoutine,
  deleteRoutineExercise,
  getRoutineExercises,
  getRoutines,
  updateRoutine,
} from "../services/routineService";
import { createEmptyExerciseLine } from "../utils/exerciseLineUtils";
import {
  EMPTY_ROUTINE,
  routineFormToPayload,
  routineLinesToForm,
  routineToForm,
} from "../utils/routineUtils";

export function useRoutines() {
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [details, setDetails] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ROUTINE);
  const [lines, setLines] = useState([createEmptyExerciseLine()]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getRoutines(), getExercises()])
      .then(([routineData, exerciseData]) => {
        if (!active) return;
        setRoutines(routineData);
        setExercises(exerciseData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  async function getCachedDetails(routineId) {
    if (details[routineId]) return details[routineId];

    const routineLines = await getRoutineExercises(routineId);
    setDetails((current) => ({ ...current, [routineId]: routineLines }));
    return routineLines;
  }

  async function expandRoutine(routine) {
    if (expandedId === routine.id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(routine.id);
    try {
      await getCachedDetails(routine.id);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_ROUTINE);
    setLines([createEmptyExerciseLine()]);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  async function openEdit(routine) {
    try {
      const routineLines = await getCachedDetails(routine.id);
      setEditingId(routine.id);
      setForm(routineToForm(routine));
      setLines(routineLinesToForm(routineLines));
      setFormOpen(true);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function replaceRoutineLines(routineId) {
    if (editingId) {
      for (const existing of details[editingId] || []) {
        await deleteRoutineExercise(existing.id);
      }
    }

    const savedLines = [];
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (!line.exerciseId) continue;

      const savedLine = await addRoutineExercise({
        workoutTemplateId: routineId,
        exerciseId: Number(line.exerciseId),
        orden: index + 1,
        repeticiones: Number(line.repeticiones),
        peso: Number(line.peso || 0),
      });
      savedLines.push({
        ...savedLine,
        exercise: exercises.find((exercise) => exercise.id === Number(line.exerciseId)),
      });
    }

    return savedLines;
  }

  async function submitRoutine(event) {
    event.preventDefault();
    setError("");

    try {
      const payload = routineFormToPayload(form);
      const routine = editingId
        ? await updateRoutine(editingId, payload)
        : await createRoutine(payload);
      const savedLines = await replaceRoutineLines(routine.id);

      setRoutines((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? routine : item))
          : [...current, routine],
      );
      setDetails((current) => ({ ...current, [routine.id]: savedLines }));
      setFormOpen(false);
      setEditingId(null);
      setExpandedId(routine.id);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function removeRoutine(routine) {
    if (!window.confirm(`¿Eliminar ${routine.nombre}?`)) return;

    try {
      await deleteRoutine(routine.id);
      setRoutines((current) => current.filter((item) => item.id !== routine.id));
      setDetails((current) => {
        const nextDetails = { ...current };
        delete nextDetails[routine.id];
        return nextDetails;
      });
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return {
    routines,
    exercises,
    details,
    expandedId,
    formOpen,
    editing: Boolean(editingId),
    form,
    setForm,
    lines,
    setLines,
    error,
    expandRoutine,
    openCreate,
    closeForm,
    openEdit,
    submitRoutine,
    removeRoutine,
  };
}
