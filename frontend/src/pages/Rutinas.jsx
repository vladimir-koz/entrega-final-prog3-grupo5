import { Plus, X } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import PageHeader from "../components/PageHeader/PageHeader";
import RoutineForm from "../components/Routines/RoutineForm";
import RoutineList from "../components/Routines/RoutineList";
import { useAuth } from "../context/useAuth";
import { useRoutines } from "../hooks/useRoutines";
import "../styles/app.css";

function Rutinas() {
  const { user } = useAuth();
  const {
    routines,
    exercises,
    details,
    expandedId,
    formOpen,
    editing,
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
  } = useRoutines();

  return (
    <Layout>
      <PageHeader
        eyebrow="Planificación"
        title="Rutinas"
        description="Armá sesiones reutilizables y cargalas luego desde Actividad."
        action={
          <button className="primary-button" onClick={formOpen ? closeForm : openCreate}>
            {formOpen ? <X size={18} /> : <Plus size={18} />}
            {formOpen ? "Cancelar" : "Crear rutina"}
          </button>
        }
      />
      <ErrorNotice message={error} />
      {formOpen && (
        <RoutineForm
          form={form}
          onFormChange={setForm}
          lines={lines}
          onLinesChange={setLines}
          exercises={exercises}
          editing={editing}
          onSubmit={submitRoutine}
        />
      )}
      <RoutineList
        routines={routines}
        userId={user.id}
        expandedId={expandedId}
        details={details}
        onExpand={expandRoutine}
        onEdit={openEdit}
        onDelete={removeRoutine}
      />
    </Layout>
  );
}

export default Rutinas;
