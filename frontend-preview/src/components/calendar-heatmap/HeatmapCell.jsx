import { formatFullDate, getActivityLevel } from "./dateUtils";

function getActivityText(count) {
  if (count <= 0) return "Sin actividad";
  if (count === 1) return "1 actividad";

  return `${count} actividades`;
}

function HeatmapCell({ date, count, showDayNumber = false, size = "compact" }) {
  const level = getActivityLevel(count);
  const fullDate = formatFullDate(date);
  const activityText = getActivityText(count);
  const label = `${fullDate}, ${activityText.toLowerCase()}`;
  const tooltip = count <= 0
    ? `Sin actividad el ${fullDate}`
    : `${activityText} el ${fullDate}`;

  return (
    <div
      className={`heatmap-cell heatmap-cell-${size} activity-level-${level}`}
      role="gridcell"
      aria-label={label}
      title={tooltip}
    >
      {showDayNumber && <span>{date.getDate()}</span>}
    </div>
  );
}

export default HeatmapCell;
