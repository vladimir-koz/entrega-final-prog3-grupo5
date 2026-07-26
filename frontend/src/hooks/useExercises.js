import { useEffect, useState } from "react";
import {
  createExercise,
  deleteExercise,
  getExercises,
  getMuscleGroups,
  updateExercise,
} from "../services/exerciseService";
import { EMPTY_EXERCISE, exerciseToForm, filterExercises } from "../utils/exerciseUtils";

export function useExercises() {
  const [exercises, setExercises] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_EXERCISE);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getExercises(), getMuscleGroups()])
      .then(([exerciseData, groupData]) => {
        if (!active) return;
        setExercises(exerciseData);
        setGroups(groupData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_EXERCISE);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  function openEdit(exercise) {
    setEditingId(exercise.id);
    setForm(exerciseToForm(exercise));
    setFormOpen(true);
  }

  async function submitExercise(event) {
    event.preventDefault();
    setError("");

    try {
      const saved = editingId ? await updateExercise(editingId, form) : await createExercise(form);

      setExercises((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? saved : item))
          : [...current, saved],
      );
      setFormOpen(false);
      setEditingId(null);
      setSelectedId(saved.id);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function removeExercise(exercise) {
    if (!window.confirm(`¿Eliminar ${exercise.nombre}?`)) return;

    try {
      await deleteExercise(exercise.id);
      setExercises((current) => current.filter((item) => item.id !== exercise.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return {
    exercises: filterExercises(exercises, search, difficulty),
    groups,
    search,
    setSearch,
    difficulty,
    setDifficulty,
    selectedId,
    setSelectedId,
    editing: Boolean(editingId),
    form,
    setForm,
    formOpen,
    openCreate,
    closeForm,
    openEdit,
    error,
    submitExercise,
    removeExercise,
  };
}
