function TrainingProgramForm({ form, onChange, editing, onSubmit, onCancel }) {
  function updateField(field, value) {
    onChange({ ...form, [field]: value });
  }

  return (
    <form className="content-section editor-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Programa</span>
          <h2>{editing ? "Editar plan" : "Nuevo plan"}</h2>
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
          Objetivo
          <input
            value={form.objetivo}
            onChange={(event) => updateField("objetivo", event.target.value)}
            placeholder="Hipertrofia, fuerza, adaptación..."
          />
        </label>

        <label>
          Fecha de inicio
          <input
            type="date"
            value={form.fechaInicio}
            onChange={(event) => updateField("fechaInicio", event.target.value)}
          />
        </label>

        <label>
          Fecha de finalización
          <input
            type="date"
            value={form.fechaFin}
            onChange={(event) => updateField("fechaFin", event.target.value)}
          />
        </label>

        <label>
          Estado
          <select
            value={form.estado}
            onChange={(event) => updateField("estado", event.target.value)}
          >
            <option value="activo">Activo</option>
            <option value="pausado">Pausado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </label>
      </div>

      <label>
        Descripción
        <textarea
          value={form.descripcion}
          onChange={(event) => updateField("descripcion", event.target.value)}
        />
      </label>

      <div className="form-actions">
        <button className="ghost-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="primary-button">Guardar plan</button>
      </div>
    </form>
  );
}

export default TrainingProgramForm;
