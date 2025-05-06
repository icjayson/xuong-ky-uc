import {
  parseISO,
  addMonths,
  subDays,
  isWithinInterval,
  differenceInCalendarMonths,
  startOfDay,
  addHours,
  isAfter,
} from "date-fns";

export type ReminderSettings = {
  startDate: string; // 'YYYY-MM-DD'
  intervalMonths: number; // 1, 2, or 3
  lastDismissedDate?: string;
};

export function shouldShowReminder(
  settings: ReminderSettings,
  today = new Date()
): { show: boolean; popupStart: Date; popupEnd: Date } {
  const start = parseISO(settings.startDate);
  const interval = settings.intervalMonths;

  if (today < start) return { show: false, popupStart: start, popupEnd: start };

  const monthsSinceStart = differenceInCalendarMonths(today, start);
  const cyclesPassed = Math.floor(monthsSinceStart / interval);
  const cycleDate = addMonths(start, cyclesPassed * interval);

  const popupStart = subDays(cycleDate, 5);
  const popupEnd = cycleDate;

  const isInWindow = isWithinInterval(today, {
    start: popupStart,
    end: popupEnd,
  });

  if (!isInWindow) return { show: false, popupStart, popupEnd };

  const dayStart = startOfDay(today);
  const noon = addHours(dayStart, 12);
  const currentWindowStart = today < noon ? dayStart : noon;

  if (settings.lastDismissedDate) {
    const dismissedAt = parseISO(settings.lastDismissedDate);
    if (isAfter(dismissedAt, currentWindowStart)) {
      return { show: false, popupStart, popupEnd };
    }
  }

  return { show: true, popupStart, popupEnd };
}
