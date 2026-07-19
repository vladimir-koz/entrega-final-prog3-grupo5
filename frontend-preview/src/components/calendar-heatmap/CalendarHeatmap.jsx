import { useMemo, useState } from "react";

import "./CalendarHeatmap.css";
import HeatmapLegend from "./HeatmapLegend";
import MonthHeatmap from "./MonthHeatmap";
import WeekHeatmap from "./WeekHeatmap";
import YearHeatmap from "./YearHeatmap";
import { buildActivityMap, formatShortDate, getEndOfWeek, getStartOfWeek } from "./dateUtils";

const viewOptions = [
  { value: "year", label: "Anual" },
  { value: "month", label: "Mensual" },
  { value: "week", label: "Semanal" },
];

function getPeriodTitle(view, selectedDate) {
  if (view === "year") {
    return String(selectedDate.getFullYear());
  }

  if (view === "month") {
    return new Intl.DateTimeFormat("es-AR", {
      month: "long",
      year: "numeric",
    }).format(selectedDate);
  }

  return `${formatShortDate(getStartOfWeek(selectedDate))} - ${formatShortDate(getEndOfWeek(selectedDate))}`;
}

function movePeriod(date, view, direction) {
  const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (view === "year") {
    nextDate.setFullYear(nextDate.getFullYear() + direction);
  } else if (view === "month") {
    nextDate.setMonth(nextDate.getMonth() + direction);
  } else {
    nextDate.setDate(nextDate.getDate() + direction * 7);
  }

  return nextDate;
}

function CalendarHeatmap({ data }) {
  const [view, setView] = useState("year");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const activityMap = useMemo(() => buildActivityMap(data), [data]);
  const periodTitle = getPeriodTitle(view, selectedDate);

  const handleViewChange = (nextView) => {
    setView(nextView);
  };

  return (
    <section className="calendar-heatmap">
      <div className="heatmap-header">
        <div>
          <p className="heatmap-kicker">Resumen de entrenamiento</p>
          <h2>Actividad diaria</h2>
        </div>

        <div className="heatmap-view-tabs" role="tablist" aria-label="Cambiar vista del calendario">
          {viewOptions.map((option) => (
            <button
              aria-selected={view === option.value}
              className={view === option.value ? "active" : ""}
              key={option.value}
              onClick={() => handleViewChange(option.value)}
              role="tab"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="heatmap-period-controls">
        <button
          aria-label="Periodo anterior"
          className="heatmap-icon-button"
          onClick={() => setSelectedDate((currentDate) => movePeriod(currentDate, view, -1))}
          type="button"
        >
          ‹
        </button>
        <strong>{periodTitle}</strong>
        <button
          aria-label="Periodo siguiente"
          className="heatmap-icon-button"
          onClick={() => setSelectedDate((currentDate) => movePeriod(currentDate, view, 1))}
          type="button"
        >
          ›
        </button>
        <button
          aria-label="Volver al periodo actual"
          className="heatmap-today-button"
          onClick={() => setSelectedDate(new Date())}
          type="button"
        >
          Hoy
        </button>
      </div>

      {view === "year" && (
        <YearHeatmap activityMap={activityMap} year={selectedDate.getFullYear()} />
      )}

      {view === "month" && (
        <MonthHeatmap
          activityMap={activityMap}
          month={selectedDate.getMonth()}
          year={selectedDate.getFullYear()}
        />
      )}

      {view === "week" && (
        <WeekHeatmap activityMap={activityMap} selectedDate={selectedDate} />
      )}

      <HeatmapLegend />
    </section>
  );
}

export default CalendarHeatmap;
