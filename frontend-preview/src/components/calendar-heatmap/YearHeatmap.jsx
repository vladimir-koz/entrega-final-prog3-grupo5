import HeatmapCell from "./HeatmapCell";
import { formatDateKey, getDaysInYear, getStartOfWeek } from "./dateUtils";

const monthLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const weekDayLabels = ["", "Lun", "", "Mie", "", "Vie", ""];

function getWeeksForYear(year) {
  const firstDay = new Date(year, 0, 1);
  const start = getStartOfWeek(firstDay);
  const daysInYear = getDaysInYear(year);
  const lastDay = daysInYear[daysInYear.length - 1];
  const weeks = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());

  while (cursor <= lastDay || cursor.getDay() !== 1) {
    const week = [];

    for (let index = 0; index < 7; index += 1) {
      week.push(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()));
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

function getMonthMarkers(weeks, year) {
  const markers = [];
  let previousMonth = -1;

  weeks.forEach((week, index) => {
    const dayInYear = week.find((day) => day.getFullYear() === year);

    if (dayInYear && dayInYear.getMonth() !== previousMonth) {
      previousMonth = dayInYear.getMonth();
      markers.push({ label: monthLabels[previousMonth], column: index });
    }
  });

  return markers;
}

function YearHeatmap({ year, activityMap }) {
  const weeks = getWeeksForYear(year);
  const monthMarkers = getMonthMarkers(weeks, year);

  return (
    <div className="heatmap-scroll-container">
      <div className="year-heatmap" role="grid" aria-label={`Actividad del anio ${year}`}>
        <div className="year-month-row">
          <span className="year-weekday-spacer" />
          <div className="year-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}>
            {monthMarkers.map((marker) => (
              <span
                className="year-month-label"
                key={`${marker.label}-${marker.column}`}
                style={{ gridColumnStart: marker.column + 1 }}
              >
                {marker.label}
              </span>
            ))}
          </div>
        </div>

        <div className="year-grid-row">
          <div className="year-weekdays" aria-hidden="true">
            {weekDayLabels.map((label, index) => (
              <span key={`${label}-${index}`}>{label}</span>
            ))}
          </div>

          <div className="year-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}>
            {weeks.map((week, weekIndex) => (
              <div className="year-week" key={`week-${weekIndex}`}>
                {week.map((date) => {
                  const isCurrentYear = date.getFullYear() === year;
                  const count = isCurrentYear ? activityMap.get(formatDateKey(date)) ?? 0 : 0;

                  return (
                    <div className={!isCurrentYear ? "heatmap-outside-year" : ""} key={formatDateKey(date)}>
                      {isCurrentYear && <HeatmapCell date={date} count={count} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearHeatmap;
