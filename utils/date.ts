export function formatDurationFrom(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);
  const pastDate = new Date(year, month - 1, day);
  const now = new Date();

  let years = now.getFullYear() - pastDate.getFullYear();
  let months = now.getMonth() - pastDate.getMonth();
  let days = now.getDate() - pastDate.getDate();
  let hours = now.getHours() - pastDate.getHours();

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours
  };
}
