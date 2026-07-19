export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  start.setDate(start.getDate() + diff);

  return start;
}

export function getEndOfWeek(date) {
  const end = getStartOfWeek(date);
  end.setDate(end.getDate() + 6);

  return end;
}

export function addDays(date, amount) {
  const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
}

export function getDaysInWeek(date) {
  const start = getStartOfWeek(date);

  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function getDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export function getDaysInYear(year) {
  const days = [];
  const date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export function getActivityLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;

  return 4;
}

export function formatFullDate(date) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function buildActivityMap(data) {
  return new Map(data.map((activityDay) => [activityDay.date, activityDay.count]));
}
