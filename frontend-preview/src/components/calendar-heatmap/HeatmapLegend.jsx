import { getActivityLevel } from "./dateUtils";

const legendLevels = [0, 1, 2, 3, 6];

function HeatmapLegend() {
  return (
    <div className="heatmap-legend" aria-label="Leyenda de intensidad de actividad">
      <span>Menos</span>
      <div className="heatmap-legend-cells" aria-hidden="true">
        {legendLevels.map((count) => (
          <span
            className={`heatmap-legend-cell activity-level-${getActivityLevel(count)}`}
            key={count}
          />
        ))}
      </div>
      <span>Mas</span>
    </div>
  );
}

export default HeatmapLegend;
