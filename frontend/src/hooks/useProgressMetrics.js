import { useEffect, useState } from "react";
import { getExercises, getMuscleGroups } from "../services/exerciseService";
import { getActivity, getExerciseProgress, getSummary } from "../services/metricsService";
import { toApiDateRange, toInputDate } from "../utils/dateUtils";
import { filterExercisesByMuscleGroup } from "../utils/progressUtils";

function getDefaultFrom() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return toInputDate(date);
}

export function useProgressMetrics() {
  const [from, setFrom] = useState(getDefaultFrom);
  const [to, setTo] = useState(() => toInputDate(new Date()));
  const [exercises, setExercises] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState([]);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getExercises(), getMuscleGroups()])
      .then(([exerciseData, groupData]) => {
        if (!active) return;
        setExercises(exerciseData);
        setGroups(groupData);
        if (exerciseData[0]) setExerciseId(String(exerciseData[0].id));
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!from || !to) return undefined;

    let active = true;
    const range = toApiDateRange(from, to);

    Promise.all([
      getSummary(range),
      getActivity(range),
      exerciseId ? getExerciseProgress(exerciseId, range) : Promise.resolve({ progress: [] }),
    ])
      .then(([summaryData, activityData, progressData]) => {
        if (!active) return;
        setSummary(summaryData);
        setActivity(activityData);
        setProgress(progressData.progress);
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, [from, to, exerciseId]);

  function selectGroup(value) {
    setGroupId(value);
    setExerciseId("");
  }

  return {
    from,
    setFrom,
    to,
    setTo,
    groups,
    exercises: filterExercisesByMuscleGroup(exercises, groupId),
    groupId,
    selectGroup,
    exerciseId,
    setExerciseId,
    summary,
    activity,
    progress,
    error,
  };
}
