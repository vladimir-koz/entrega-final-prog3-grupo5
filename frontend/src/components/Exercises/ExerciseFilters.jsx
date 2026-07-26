import { Search } from "lucide-react";

function ExerciseFilters({
  search,
  difficulty,
  groupId,
  groups,
  onSearchChange,
  onDifficultyChange,
  onGroupChange,
}) {
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
      <select
        aria-label="Filtrar grupo muscular"
        value={groupId}
        onChange={(event) => onGroupChange(event.target.value)}
      >
        <option value="">Todos los grupos</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExerciseFilters;
