import { Plus, X } from "lucide-react";
import ErrorNotice from "../components/Feedback/ErrorNotice";
import Layout from "../components/Layout/Layout";
import PageHeader from "../components/PageHeader/PageHeader";
import ProgramWeekForm from "../components/Planning/ProgramWeekForm";
import ScheduledWorkoutForm from "../components/Planning/ScheduledWorkoutForm";
import TrainingPlanWorkspace from "../components/Planning/TrainingPlanWorkspace";
import TrainingProgramForm from "../components/Planning/TrainingProgramForm";
import { useAuth } from "../context/useAuth";
import { useTrainingPlans } from "../hooks/useTrainingPlans";
import "../styles/app.css";

function Planes() {
  const { user } = useAuth();
  const planning = useTrainingPlans();

  return (
    <Layout>
      <PageHeader
        eyebrow="Planificación"
        title="Planes de entrenamiento"
        description="Organizá rutinas por semanas y adaptá cada sesión a tu calendario."
        action={
          <button
            className="primary-button"
            onClick={planning.programFormOpen ? planning.closeEditors : planning.openCreateProgram}
          >
            {planning.programFormOpen ? <X size={18} /> : <Plus size={18} />}
            {planning.programFormOpen ? "Cancelar" : "Crear plan"}
          </button>
        }
      />

      <ErrorNotice message={planning.error} />

      {planning.programFormOpen && (
        <TrainingProgramForm
          form={planning.programForm}
          onChange={planning.setProgramForm}
          editing={planning.editingProgram}
          onSubmit={planning.submitProgram}
          onCancel={planning.closeEditors}
        />
      )}

      {planning.weekFormOpen && (
        <ProgramWeekForm
          form={planning.weekForm}
          onChange={planning.setWeekForm}
          editing={planning.editingWeek}
          onSubmit={planning.submitWeek}
          onCancel={planning.closeEditors}
        />
      )}

      {planning.scheduledFormOpen && (
        <ScheduledWorkoutForm
          form={planning.scheduledForm}
          onChange={planning.setScheduledForm}
          routines={planning.routines}
          editing={planning.editingScheduledWorkout}
          onSubmit={planning.submitScheduledWorkout}
          onCancel={planning.closeEditors}
        />
      )}

      <TrainingPlanWorkspace
        programs={planning.programs}
        selectedProgram={planning.selectedProgram}
        userId={user.id}
        completedScheduledIds={planning.completedScheduledIds}
        loading={planning.loading}
        onSelectProgram={planning.selectProgram}
        onEditProgram={planning.openEditProgram}
        onDeleteProgram={planning.removeProgram}
        onAddWeek={planning.openCreateWeek}
        onEditWeek={planning.openEditWeek}
        onDeleteWeek={planning.removeWeek}
        onAddScheduledWorkout={planning.openCreateScheduledWorkout}
        onEditScheduledWorkout={planning.openEditScheduledWorkout}
        onDeleteScheduledWorkout={planning.removeScheduledWorkout}
      />
    </Layout>
  );
}

export default Planes;
