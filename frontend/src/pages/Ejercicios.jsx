import { Plus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import ExerciseFilters from "../components/Exercises/ExerciseFilters";
import ExerciseForm from "../components/Exercises/ExerciseForm";
import ExerciseList from "../components/Exercises/ExerciseList";
import PageHeader from "../components/PageHeader/PageHeader";
import { useAuth } from "../context/useAuth";
import { useExercises } from "../hooks/useExercises";
import "../styles/app.css";

function Ejercicios() {
  const { user } = useAuth();
  const {
    exercises,
    groups,
    search,
    setSearch,
    difficulty,
    setDifficulty,
    groupId,
    setGroupId,
    selectedId,
    setSelectedId,
    editing,
    form,
    setForm,
    formOpen,
    openCreate,
    closeForm,
    openEdit,
    error,
    submitExercise,
    removeExercise,
  } = useExercises();

  return (
    <Layout>
      <PageHeader
        eyebrow="Biblioteca"
        title="Ejercicios"
        description="Usá los ejercicios globales y administrá los que creaste."
        action={
          <button className="primary-button" onClick={formOpen ? closeForm : openCreate}>
            {formOpen ? <X size={18} /> : <Plus size={18} />}
            {formOpen ? "Cancelar" : "Nuevo ejercicio"}
          </button>
        }
      />
      <ErrorNotice message={error} />
      {formOpen && (
        <ExerciseForm
          form={form}
          groups={groups}
          editing={editing}
          onChange={setForm}
          onSubmit={submitExercise}
        />
      )}
      <section className="content-section">
        <ExerciseFilters
          search={search}
          difficulty={difficulty}
          groupId={groupId}
          groups={groups}
          onSearchChange={setSearch}
          onDifficultyChange={setDifficulty}
          onGroupChange={setGroupId}
        />
        <ExerciseList
          exercises={exercises}
          userId={user.id}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onEdit={openEdit}
          onDelete={removeExercise}
        />
      </section>
    </Layout>
  );
}

export default Ejercicios;
