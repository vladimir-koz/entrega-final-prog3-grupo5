const WEEK_DAYS = [
  [1, "Lunes"],
  [2, "Martes"],
  [3, "Miércoles"],
  [4, "Jueves"],
  [5, "Viernes"],
  [6, "Sábado"],
  [7, "Domingo"],
];

function ScheduledWorkoutForm({ form, onChange, routines, editing, onSubmit, onCancel }) {
  function updateField(field, value) {
    onChange({ ...form, [field]: value });
  }

  return (
    <form className="content-section editor-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Sesión programada</span>
          <h2>{editing ? "Editar sesión" : "Agregar sesión"}</h2>
        </div>
      </div>

      <div className="form-grid two-columns">
        <label>
          Nombre
          <input
            value={form.nombre}
            onChange={(event) => updateField("nombre", event.target.value)}
            required
            minLength={2}
          />
        </label>

        <label>
          Rutina
          <select
            value={form.workoutTemplateId}
            onChange={(event) => updateField("workoutTemplateId", event.target.value)}
            required
          >
            <option value="">Seleccionar rutina</option>
            {routines.map((routine) => (
              <option key={routine.id} value={routine.id}>
                {routine.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Día de la semana
          <select
            value={form.diaSemana}
            onChange={(event) => updateField("diaSemana", event.target.value)}
          >
            <option value="">Sin día fijo</option>
            {WEEK_DAYS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha específica
          <input
            type="date"
            value={form.fechaProgramada}
            onChange={(event) => updateField("fechaProgramada", event.target.value)}
          />
        </label>

        <label>
          Orden
          <input
            type="number"
            min="1"
            value={form.orden}
            onChange={(event) => updateField("orden", event.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Notas
        <textarea
          value={form.notas}
          onChange={(event) => updateField("notas", event.target.value)}
        />
      </label>

      <div className="form-actions">
        <button className="ghost-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="primary-button">Guardar sesión</button>
      </div>
    </form>
  );
}

export default ScheduledWorkoutForm;
