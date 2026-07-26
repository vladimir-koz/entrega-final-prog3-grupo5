import ExerciseLineTable from "../ExerciseLineTable/ExerciseLineTable";

function RoutineForm({ form, onFormChange, lines, onLinesChange, exercises, editing, onSubmit }) {
  function updateField(field, value) {
    onFormChange({ ...form, [field]: value });
  }

  return (
    <form className="content-section editor-form" onSubmit={onSubmit}>
      <div className="section-heading"><h2>{editing ? "Editar rutina" : "Nueva rutina"}</h2></div>
      <div className="form-grid two-columns">
        <label>Nombre<input value={form.nombre} onChange={(event) => updateField("nombre", event.target.value)} required minLength={2} /></label>
        <label>Tipo<input value={form.tipo} onChange={(event) => updateField("tipo", event.target.value)} placeholder="Fuerza, hipertrofia..." /></label>
        <label>Grupo muscular<input value={form.grupoMuscularEtiqueta} onChange={(event) => updateField("grupoMuscularEtiqueta", event.target.value)} /></label>
        <label>Duración estimada (min)<input type="number" min="0" value={form.tiempoEstimado} onChange={(event) => updateField("tiempoEstimado", event.target.value)} /></label>
      </div>
      <label>Descripción<textarea value={form.descripcion} onChange={(event) => updateField("descripcion", event.target.value)} /></label>
      <ExerciseLineTable lines={lines} exercises={exercises} onChange={onLinesChange} weightLabel="Peso objetivo" addLabel="Ejercicio" />
      <div className="form-actions"><span /><button className="primary-button">Guardar rutina</button></div>
    </form>
  );
}

export default RoutineForm;