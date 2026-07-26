import { useEffect, useState } from "react";
import { getRoutines } from "../services/routineService";
import { getWorkouts } from "../services/workoutService";
import {
  createProgramWeek,
  createScheduledWorkout,
  createTrainingProgram,
  deleteProgramWeek,
  deleteScheduledWorkout,
  deleteTrainingProgram,
  getTrainingProgram,
  getTrainingPrograms,
  updateProgramWeek,
  updateScheduledWorkout,
  updateTrainingProgram,
} from "../services/planningService";

const EMPTY_PROGRAM = {
  nombre: "",
  descripcion: "",
  objetivo: "",
  fechaInicio: "",
  fechaFin: "",
  estado: "activo",
};

const EMPTY_WEEK = {
  numeroSemana: "",
  nombre: "",
  objetivo: "",
  notas: "",
  esDescarga: false,
};

const EMPTY_SCHEDULED_WORKOUT = {
  workoutTemplateId: "",
  nombre: "",
  diaSemana: "",
  fechaProgramada: "",
  orden: "",
  notas: "",
};

function toDateInput(value) {
  return value ? String(value).slice(0, 10) : "";
}

export function useTrainingPlans() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [completedScheduledIds, setCompletedScheduledIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [programFormOpen, setProgramFormOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [programForm, setProgramForm] = useState(EMPTY_PROGRAM);

  const [weekFormOpen, setWeekFormOpen] = useState(false);
  const [editingWeekId, setEditingWeekId] = useState(null);
  const [weekForm, setWeekForm] = useState(EMPTY_WEEK);

  const [scheduledFormOpen, setScheduledFormOpen] = useState(false);
  const [editingScheduledId, setEditingScheduledId] = useState(null);
  const [scheduledWeekId, setScheduledWeekId] = useState(null);
  const [scheduledForm, setScheduledForm] = useState(EMPTY_SCHEDULED_WORKOUT);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [programData, routineData, workoutData] = await Promise.all([
          getTrainingPrograms(),
          getRoutines(),
          getWorkouts(),
        ]);

        if (!active) return;

        setPrograms(programData);
        setRoutines(routineData);
        setCompletedScheduledIds(
          new Set(
            workoutData
              .map((workout) => workout.scheduledWorkoutId)
              .filter((scheduledWorkoutId) => scheduledWorkoutId != null),
          ),
        );

        if (programData.length > 0) {
          const detail = await getTrainingProgram(programData[0].id);
          if (active) setSelectedProgram(detail);
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  async function selectProgram(programId) {
    setError("");
    try {
      setSelectedProgram(await getTrainingProgram(programId));
      closeEditors();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function reloadPrograms(preferredId) {
    const nextPrograms = await getTrainingPrograms();
    setPrograms(nextPrograms);

    const nextId =
      preferredId && nextPrograms.some((program) => program.id === preferredId)
        ? preferredId
        : nextPrograms[0]?.id;

    setSelectedProgram(nextId ? await getTrainingProgram(nextId) : null);
  }

  async function refreshSelectedProgram() {
    if (!selectedProgram) return;
    setSelectedProgram(await getTrainingProgram(selectedProgram.id));
  }

  function closeEditors() {
    setProgramFormOpen(false);
    setWeekFormOpen(false);
    setScheduledFormOpen(false);
  }

  function openCreateProgram() {
    closeEditors();
    setEditingProgramId(null);
    setProgramForm(EMPTY_PROGRAM);
    setProgramFormOpen(true);
  }

  function openEditProgram(program) {
    closeEditors();
    setEditingProgramId(program.id);
    setProgramForm({
      nombre: program.nombre,
      descripcion: program.descripcion || "",
      objetivo: program.objetivo || "",
      fechaInicio: toDateInput(program.fechaInicio),
      fechaFin: toDateInput(program.fechaFin),
      estado: program.estado || "activo",
    });
    setProgramFormOpen(true);
  }

  async function submitProgram(event) {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        ...programForm,
        fechaInicio: programForm.fechaInicio || undefined,
        fechaFin: programForm.fechaFin || undefined,
      };
      const saved = editingProgramId
        ? await updateTrainingProgram(editingProgramId, payload)
        : await createTrainingProgram(payload);

      await reloadPrograms(saved.id);
      setProgramFormOpen(false);
      setEditingProgramId(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function removeProgram(program) {
    if (!window.confirm(`¿Eliminar el plan ${program.nombre}?`)) return;

    try {
      await deleteTrainingProgram(program.id);
      await reloadPrograms();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function openCreateWeek() {
    closeEditors();
    const weeks = selectedProgram?.weeks || [];
    const nextWeek = Math.max(0, ...weeks.map((week) => week.numeroSemana)) + 1;

    setEditingWeekId(null);
    setWeekForm({ ...EMPTY_WEEK, numeroSemana: String(nextWeek) });
    setWeekFormOpen(true);
  }

  function openEditWeek(week) {
    closeEditors();
    setEditingWeekId(week.id);
    setWeekForm({
      numeroSemana: String(week.numeroSemana),
      nombre: week.nombre || "",
      objetivo: week.objetivo || "",
      notas: week.notas || "",
      esDescarga: Boolean(week.esDescarga),
    });
    setWeekFormOpen(true);
  }

  async function submitWeek(event) {
    event.preventDefault();
    if (!selectedProgram) return;
    setError("");

    try {
      const payload = {
        trainingProgramId: selectedProgram.id,
        numeroSemana: Number(weekForm.numeroSemana),
        nombre: weekForm.nombre,
        objetivo: weekForm.objetivo,
        notas: weekForm.notas,
        esDescarga: weekForm.esDescarga,
      };

      if (editingWeekId) {
        await updateProgramWeek(editingWeekId, payload);
      } else {
        await createProgramWeek(payload);
      }

      await refreshSelectedProgram();
      setWeekFormOpen(false);
      setEditingWeekId(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function removeWeek(week) {
    if (!window.confirm(`¿Eliminar la semana ${week.numeroSemana}?`)) return;

    try {
      await deleteProgramWeek(week.id);
      await refreshSelectedProgram();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function openCreateScheduledWorkout(week) {
    closeEditors();
    const sessions = week.scheduledWorkouts || [];
    const nextOrder = Math.max(0, ...sessions.map((session) => session.orden)) + 1;

    setEditingScheduledId(null);
    setScheduledWeekId(week.id);
    setScheduledForm({
      ...EMPTY_SCHEDULED_WORKOUT,
      workoutTemplateId: routines[0]?.id ? String(routines[0].id) : "",
      orden: String(nextOrder),
    });
    setScheduledFormOpen(true);
  }

  function openEditScheduledWorkout(week, scheduledWorkout) {
    closeEditors();
    setEditingScheduledId(scheduledWorkout.id);
    setScheduledWeekId(week.id);
    setScheduledForm({
      workoutTemplateId: String(scheduledWorkout.workoutTemplateId),
      nombre: scheduledWorkout.nombre,
      diaSemana: scheduledWorkout.diaSemana ? String(scheduledWorkout.diaSemana) : "",
      fechaProgramada: toDateInput(scheduledWorkout.fechaProgramada),
      orden: String(scheduledWorkout.orden),
      notas: scheduledWorkout.notas || "",
    });
    setScheduledFormOpen(true);
  }

  async function submitScheduledWorkout(event) {
    event.preventDefault();
    if (!scheduledWeekId) return;
    setError("");

    try {
      const payload = {
        programWeekId: scheduledWeekId,
        workoutTemplateId: Number(scheduledForm.workoutTemplateId),
        nombre: scheduledForm.nombre,
        diaSemana: scheduledForm.diaSemana ? Number(scheduledForm.diaSemana) : null,
        fechaProgramada: scheduledForm.fechaProgramada || undefined,
        orden: Number(scheduledForm.orden),
        notas: scheduledForm.notas,
      };

      if (editingScheduledId) {
        await updateScheduledWorkout(editingScheduledId, payload);
      } else {
        await createScheduledWorkout(payload);
      }

      await refreshSelectedProgram();
      setScheduledFormOpen(false);
      setEditingScheduledId(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function removeScheduledWorkout(scheduledWorkout) {
    if (!window.confirm(`¿Eliminar ${scheduledWorkout.nombre}?`)) return;

    try {
      await deleteScheduledWorkout(scheduledWorkout.id);
      await refreshSelectedProgram();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return {
    programs,
    selectedProgram,
    routines,
    completedScheduledIds,
    loading,
    error,
    programFormOpen,
    editingProgram: Boolean(editingProgramId),
    programForm,
    setProgramForm,
    weekFormOpen,
    editingWeek: Boolean(editingWeekId),
    weekForm,
    setWeekForm,
    scheduledFormOpen,
    editingScheduledWorkout: Boolean(editingScheduledId),
    scheduledForm,
    setScheduledForm,
    selectProgram,
    openCreateProgram,
    openEditProgram,
    submitProgram,
    removeProgram,
    openCreateWeek,
    openEditWeek,
    submitWeek,
    removeWeek,
    openCreateScheduledWorkout,
    openEditScheduledWorkout,
    submitScheduledWorkout,
    removeScheduledWorkout,
    closeEditors,
  };
}
