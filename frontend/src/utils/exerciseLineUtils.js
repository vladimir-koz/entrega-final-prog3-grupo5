export function createEmptyExerciseLine() {
  return { exerciseId: "", repeticiones: "", peso: "" };
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
  }));
}

export function serializeExerciseLines(lines) {
  return lines.map((line) => ({
    exerciseId: Number(line.exerciseId),
    repeticiones: Number(line.repeticiones),
    peso: Number(line.peso || 0),
  }));
}

export function hasIncompleteExerciseLines(lines) {
  return lines.some((line) => !line.exerciseId || !line.repeticiones || line.peso === "");
}
