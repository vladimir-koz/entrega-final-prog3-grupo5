import { Plus, Trash2 } from "lucide-react";
import { createEmptyExerciseLine, updateExerciseLine } from "../../utils/exerciseLineUtils";

function ExerciseLineTable({
  lines,
  exercises,
  onChange,
  weightLabel = "Peso (kg)",
  addLabel = "Agregar serie",
  showIntensity = false,
}) {
  function updateLine(index, field, value) {
    onChange(updateExerciseLine(lines, index, field, value));
  }

  function removeLine(index) {
    onChange(lines.filter((_, lineIndex) => lineIndex !== index));
  }

  function addLine() {
    onChange([...lines, createEmptyExerciseLine()]);
  }

  const rowClassName = `set-row${showIntensity ? " with-intensity" : ""}`;

  return (
    <>
      <div className="set-table">
        <div className={`${rowClassName} set-header`}>
          <span>Ejercicio</span>
          <span>Repeticiones</span>
          <span>{weightLabel}</span>
          {showIntensity && <span>RIR</span>}
          {showIntensity && <span>RPE</span>}
          <span />
        </div>

        {lines.map((line, index) => (
          <div className={rowClassName} key={line.id ?? index}>
            <select
              aria-label={`Ejercicio ${index + 1}`}
              value={line.exerciseId}
              onChange={(event) => updateLine(index, "exerciseId", event.target.value)}
              required
            >
              <option value="">Seleccionar ejercicio</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.nombre}
                </option>
              ))}
            </select>

            <input
              aria-label={`Repeticiones ${index + 1}`}
              type="number"
              min="1"
              value={line.repeticiones}
              onChange={(event) => updateLine(index, "repeticiones", event.target.value)}
              required
            />

            <input
              aria-label={`Peso ${index + 1}`}
              type="number"
              min="0"
              step="0.1"
              value={line.peso}
              onChange={(event) => updateLine(index, "peso", event.target.value)}
              required
            />

            {showIntensity && (
              <input
                aria-label={`RIR ${index + 1}`}
                title="Repeticiones que sentías que todavía podías realizar"
                type="number"
                min="0"
                max="10"
                value={line.rir}
                onChange={(event) => updateLine(index, "rir", event.target.value)}
                placeholder="Opcional"
              />
            )}

            {showIntensity && (
              <input
                aria-label={`RPE ${index + 1}`}
                title="Esfuerzo percibido de 1 a 10"
                type="number"
                min="1"
                max="10"
                step="0.5"
                value={line.rpe}
                onChange={(event) => updateLine(index, "rpe", event.target.value)}
                placeholder="Opcional"
              />
            )}

            <button
              className="icon-button danger"
              type="button"
              title="Quitar serie"
              disabled={lines.length === 1}
              onClick={() => removeLine(index)}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>

      <button className="secondary-button" type="button" onClick={addLine}>
        <Plus size={17} />
        {addLabel}
      </button>
    </>
  );
}

export default ExerciseLineTable;
