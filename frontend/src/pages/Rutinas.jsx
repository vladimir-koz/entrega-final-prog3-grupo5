import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import PageHeader from "../components/PageHeader/PageHeader";
import RoutineForm from "../components/Routines/RoutineForm";
import RoutineList from "../components/Routines/RoutineList";
import { useAuth } from "../context/useAuth";
import { getExercises } from "../services/exerciseService";
import { addRoutineExercise, createRoutine, deleteRoutine, deleteRoutineExercise, getRoutineExercises, getRoutines, updateRoutine } from "../services/routineService";
import { createEmptyExerciseLine } from "../utils/exerciseLineUtils";
import { EMPTY_ROUTINE, routineFormToPayload, routineLinesToForm, routineToForm } from "../utils/routineUtils";
import "../styles/app.css";

function Rutinas() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]); const [exercises, setExercises] = useState([]);
  const [details, setDetails] = useState({}); const [expandedId, setExpandedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false); const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ROUTINE); const [lines, setLines] = useState([createEmptyExerciseLine()]); const [error, setError] = useState("");

  useEffect(() => { Promise.all([getRoutines(), getExercises()]).then(([routineData, exerciseData]) => { setRoutines(routineData); setExercises(exerciseData); }).catch((requestError) => setError(requestError.message)); }, []);
  async function expand(routine) { if (expandedId === routine.id) { setExpandedId(null); return; } setExpandedId(routine.id); if (!details[routine.id]) { try { const data = await getRoutineExercises(routine.id); setDetails((current) => ({ ...current, [routine.id]: data })); } catch (requestError) { setError(requestError.message); } } }
  function openCreate() { setEditingId(null); setForm(EMPTY_ROUTINE); setLines([createEmptyExerciseLine()]); setFormOpen(true); }
  async function openEdit(routine) { const routineLines = details[routine.id] || await getRoutineExercises(routine.id); setEditingId(routine.id); setForm(routineToForm(routine)); setLines(routineLinesToForm(routineLines)); setFormOpen(true); }

  async function submit(event) {
    event.preventDefault(); setError("");
    try {
      const payload = routineFormToPayload(form);
      const routine = editingId ? await updateRoutine(editingId, payload) : await createRoutine(payload);
      if (editingId) { for (const existing of details[editingId] || []) await deleteRoutineExercise(existing.id); }
      const savedLines = [];
      for (let index = 0; index < lines.length; index += 1) { const line = lines[index]; if (!line.exerciseId) continue; const savedLine = await addRoutineExercise({ workoutTemplateId: routine.id, exerciseId: Number(line.exerciseId), orden: index + 1, repeticiones: Number(line.repeticiones), peso: Number(line.peso || 0) }); savedLines.push({ ...savedLine, exercise: exercises.find((exercise) => exercise.id === Number(line.exerciseId)) }); }
      setRoutines((current) => editingId ? current.map((item) => item.id === editingId ? routine : item) : [...current, routine]); setDetails((current) => ({ ...current, [routine.id]: savedLines })); setFormOpen(false); setExpandedId(routine.id);
    } catch (requestError) { setError(requestError.message); }
  }
  async function remove(routine) { if (!window.confirm(`¿Eliminar ${routine.nombre}?`)) return; try { await deleteRoutine(routine.id); setRoutines((current) => current.filter((item) => item.id !== routine.id)); } catch (requestError) { setError(requestError.message); } }

  return <Layout>
    <PageHeader eyebrow="Planificación" title="Rutinas" description="Armá sesiones reutilizables y cargalas luego desde Actividad." action={<button className="primary-button" onClick={formOpen ? () => setFormOpen(false) : openCreate}>{formOpen ? <X size={18} /> : <Plus size={18} />}{formOpen ? "Cancelar" : "Crear rutina"}</button>} />
    <ErrorNotice message={error} />
    {formOpen && <RoutineForm form={form} onFormChange={setForm} lines={lines} onLinesChange={setLines} exercises={exercises} editing={Boolean(editingId)} onSubmit={submit} />}
    <RoutineList routines={routines} userId={user.id} expandedId={expandedId} details={details} onExpand={expand} onEdit={openEdit} onDelete={remove} />
  </Layout>;
}

export default Rutinas;