import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import ExerciseFilters from "../components/Exercises/ExerciseFilters";
import ExerciseForm from "../components/Exercises/ExerciseForm";
import ExerciseList from "../components/Exercises/ExerciseList";
import PageHeader from "../components/PageHeader/PageHeader";
import { createExercise, deleteExercise, getExercises, getMuscleGroups, updateExercise } from "../services/exerciseService";
import { useAuth } from "../context/useAuth";
import { EMPTY_EXERCISE, exerciseToForm, filterExercises } from "../utils/exerciseUtils";
import "../styles/app.css";

function Ejercicios() {
    const { user } = useAuth();
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
        Promise.all([getExercises(), getMuscleGroups()])
            .then(([exerciseData, groupData]) => { setExercises(exerciseData); setGroups(groupData); })
            .catch((requestError) => setError(requestError.message));
    }, []);

    function openCreate() { setEditingId(null); setForm(EMPTY_EXERCISE); setFormOpen(true); }
    function openEdit(exercise) {
        setEditingId(exercise.id);
        setForm(exerciseToForm(exercise));
        setFormOpen(true);
    }

    async function submit(event) {
        event.preventDefault(); setError("");
        try {
            const saved = editingId ? await updateExercise(editingId, form) : await createExercise(form);
            setExercises((current) => editingId ? current.map((item) => item.id === editingId ? saved : item) : [...current, saved]);
            setFormOpen(false); setEditingId(null); setSelectedId(saved.id);
        } catch (requestError) { setError(requestError.message); }
    }

    async function remove(exercise) {
        if (!window.confirm(`¿Eliminar ${exercise.nombre}?`)) return;
        try { await deleteExercise(exercise.id); setExercises((current) => current.filter((item) => item.id !== exercise.id)); }
        catch (requestError) { setError(requestError.message); }
    }

    const filtered = filterExercises(exercises, search, difficulty);

    return <Layout>
        <PageHeader eyebrow="Biblioteca" title="Ejercicios" description="Usá los ejercicios globales y administrá los que creaste." action={<button className="primary-button" onClick={formOpen ? () => setFormOpen(false) : openCreate}>{formOpen ? <X size={18} /> : <Plus size={18} />}{formOpen ? "Cancelar" : "Nuevo ejercicio"}</button>} />
        <ErrorNotice message={error} />
        {formOpen && <ExerciseForm form={form} groups={groups} editing={Boolean(editingId)} onChange={setForm} onSubmit={submit} />}
        <section className="content-section">
            <ExerciseFilters search={search} difficulty={difficulty} onSearchChange={setSearch} onDifficultyChange={setDifficulty} />
            <ExerciseList exercises={filtered} userId={user.id} selectedId={selectedId} onSelect={setSelectedId} onEdit={openEdit} onDelete={remove} />
        </section>
    </Layout>;
}

export default Ejercicios;