import HeatmapCell from "./HeatmapCell";
import { formatDateKey, getActivityLevel, getDaysInWeek } from "./dateUtils";

const weekDayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

function WeekHeatmap({ selectedDate, activityMap }) {
  const days = getDaysInWeek(selectedDate);

  return (
    <div className="week-heatmap" role="grid" aria-label="Actividad semanal">
      {days.map((date, index) => {
        const count = activityMap.get(formatDateKey(date)) ?? 0;
        const level = getActivityLevel(count);

        return (
          <div className="week-day-card" key={formatDateKey(date)}>
            <span className="week-day-name">{weekDayLabels[index]}</span>
            <HeatmapCell date={date} count={count} showDayNumber size="week" />
            <span className="week-day-level">Nivel {level}</span>
            <span className="week-day-count">
              {count === 1 ? "1 actividad" : `${count} actividades`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default WeekHeatmap;
