import Layout from "../components/Layout/layout";
import CalendarHeatmap from "../components/calendar-heatmap/CalendarHeatmap";

const activityData = [
  { date: "2026-01-04", count: 1 },
  { date: "2026-01-05", count: 3 },
  { date: "2026-02-12", count: 2 },
  { date: "2026-03-20", count: 6 },
  { date: "2026-04-03", count: 4 },
  { date: "2026-05-10", count: 1 },
  { date: "2026-06-18", count: 5 },
  { date: "2026-07-01", count: 1 },
  { date: "2026-07-02", count: 3 },
  { date: "2026-07-03", count: 6 },
  { date: "2026-07-08", count: 2 },
  { date: "2026-07-15", count: 5 },
  { date: "2026-07-18", count: 4 },
  { date: "2026-08-06", count: 2 },
  { date: "2026-09-22", count: 7 },
  { date: "2026-10-11", count: 3 },
  { date: "2026-11-14", count: 1 },
  { date: "2026-12-02", count: 5 },
];

function Actividad() {
    return (
        <Layout>
            <CalendarHeatmap data={activityData} />
        </Layout>
    );
}

export default Actividad;
