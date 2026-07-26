export function isToday(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function toInputDate(date) {
  return date.toISOString().slice(0, 10);
}

export function toApiDateRange(from, to) {
  return {
    from: new Date(`${from}T00:00:00`).toISOString(),
    to: new Date(`${to}T23:59:59`).toISOString(),
  };
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getWeekRange(referenceDate = new Date()) {
  const day = referenceDate.getDay() || 7;
  const from = new Date(referenceDate);
  from.setDate(referenceDate.getDate() - day + 1);
  from.setHours(0, 0, 0, 0);

  const to = new Date(from);
  to.setDate(from.getDate() + 6);
  to.setHours(23, 59, 59, 999);

  return { from: from.toISOString(), to: to.toISOString() };
}

export function getWeekDays(activity, referenceDate = new Date()) {
  const weekStart = new Date(getWeekRange(referenceDate).from);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return { date, data: activity.find((entry) => entry.date === key) };
  });
}
