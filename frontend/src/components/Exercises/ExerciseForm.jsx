function ExerciseForm({ form, groups, editing, onChange, onSubmit }) {
  function updateField(field, value) {
    onChange({ ...form, [field]: value });
  }

  function toggleMuscleGroup(groupId) {
    const selected = form.muscleGroupIds.includes(groupId);
    updateField(
      "muscleGroupIds",
      selected
        ? form.muscleGroupIds.filter((id) => id !== groupId)
        : [...form.muscleGroupIds, groupId],
    );
  }

  return (
    <form className="content-section editor-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <h2>{editing ? "Editar ejercicio" : "Crear ejercicio"}</h2>
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
          Dificultad
          <select
            value={form.dificultad}
            onChange={(event) => updateField("dificultad", event.target.value)}
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
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
      <label>
        URL de imagen
        <input
          type="url"
          value={form.imagen}
          onChange={(event) => updateField("imagen", event.target.value)}
          placeholder="https://..."
        />
      </label>
      <fieldset className="check-grid">
        <legend>Grupos musculares</legend>
        {groups.map((group) => (
          <label className="check-option" key={group.id}>
            <input
              type="checkbox"
              checked={form.muscleGroupIds.includes(group.id)}
              onChange={() => toggleMuscleGroup(group.id)}
            />
            {group.nombre}
          </label>
        ))}
      </fieldset>
      <div className="form-actions">
        <span />
        <button className="primary-button">
          {editing ? "Guardar cambios" : "Crear ejercicio"}
        </button>
      </div>
    </form>
  );
}

export default ExerciseForm;
