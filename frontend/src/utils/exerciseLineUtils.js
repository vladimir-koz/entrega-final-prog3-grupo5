export function createEmptyExerciseLine() {
  return {
    exerciseId: "",
    repeticiones: "",
    peso: "",
    rir: "",
    rpe: "",
  };
}

export function updateExerciseLine(lines, index, field, value) {
  return lines.map((line, lineIndex) => (lineIndex === index ? { ...line, [field]: value } : line));
}

export function hydrateExerciseLines(lines) {
  return lines.map((line) => ({
    ...line,
    exerciseId: String(line.exerciseId),
    repeticiones: String(line.repeticiones),
    peso: String(line.peso ?? 0),
    rir: line.rir == null ? "" : String(line.rir),
    rpe: line.rpe == null ? "" : String(line.rpe),
  }));
}

export function serializeExerciseLines(lines) {
  return lines.map((line) => {
    const payload = {
      exerciseId: Number(line.exerciseId),
      repeticiones: Number(line.repeticiones),
      peso: Number(line.peso || 0),
    };

    if (line.rir !== "" && line.rir != null) payload.rir = Number(line.rir);
    if (line.rpe !== "" && line.rpe != null) payload.rpe = Number(line.rpe);

    return payload;
  });
}

export function hasIncompleteExerciseLines(lines) {
  return lines.some((line) => !line.exerciseId || !line.repeticiones || line.peso === "");
}
