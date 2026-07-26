import { useEffect, useState } from "react";
import { getActivity, getSummary } from "../services/metricsService";
import { getWeekRange } from "../utils/dateUtils";

export function useDashboardMetrics() {
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const range = getWeekRange();

    Promise.all([getSummary(range), getActivity(range)])
      .then(([summaryData, activityData]) => {
        if (!active) return;
        setSummary(summaryData);
        setActivity(activityData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return { summary, activity, error };
}
