import { Search } from "lucide-react";

function ExerciseFilters({ search, difficulty, onSearchChange, onDifficultyChange }) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <Search size={17} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar ejercicio"
        />
      </label>
      <select
        aria-label="Filtrar dificultad"
        value={difficulty}
        onChange={(event) => onDifficultyChange(event.target.value)}
      >
        <option value="">Todas las dificultades</option>
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
    </div>
  );
}

export default ExerciseFilters;
