import HeatmapCell from "./HeatmapCell";
import { formatDateKey, getDaysInMonth } from "./dateUtils";

const weekDayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

function getMondayFirstIndex(date) {
  return (date.getDay() + 6) % 7;
}

function MonthHeatmap({ year, month, activityMap }) {
  const days = getDaysInMonth(year, month);
  const emptyCells = Array.from({ length: getMondayFirstIndex(days[0]) });

  return (
    <div className="month-heatmap" role="grid" aria-label="Actividad mensual">
      <div className="month-weekdays" aria-hidden="true">
        {weekDayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="month-grid">
        {emptyCells.map((_, index) => (
          <span className="month-empty-cell" key={`empty-${index}`} />
        ))}

        {days.map((date) => (
          <HeatmapCell
            count={activityMap.get(formatDateKey(date)) ?? 0}
            date={date}
            key={formatDateKey(date)}
            showDayNumber
            size="large"
          />
        ))}
      </div>
    </div>
  );
}

export default MonthHeatmap;
