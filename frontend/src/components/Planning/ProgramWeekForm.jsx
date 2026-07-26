function ProgramWeekForm({ form, onChange, editing, onSubmit, onCancel }) {
  function updateField(field, value) {
    onChange({ ...form, [field]: value });
  }

  return (
    <form className="content-section editor-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Semana</span>
          <h2>{editing ? "Editar semana" : "Agregar semana"}</h2>
        </div>
      </div>

      <div className="form-grid two-columns">
        <label>
          Número de semana
          <input
            type="number"
            min="1"
            value={form.numeroSemana}
            onChange={(event) => updateField("numeroSemana", event.target.value)}
            required
          />
        </label>

        <label>
          Nombre
          <input
            value={form.nombre}
            onChange={(event) => updateField("nombre", event.target.value)}
            placeholder="Semana 1"
          />
        </label>

        <label>
          Objetivo
          <input
            value={form.objetivo}
            onChange={(event) => updateField("objetivo", event.target.value)}
            placeholder="Adaptación, volumen, descarga..."
          />
        </label>

        <label className="check-option planning-check">
          <input
            type="checkbox"
            checked={form.esDescarga}
            onChange={(event) => updateField("esDescarga", event.target.checked)}
          />
          Semana de descarga
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
        <button className="primary-button">Guardar semana</button>
      </div>
    </form>
  );
}

export default ProgramWeekForm;
