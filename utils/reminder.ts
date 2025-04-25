import {
  parseISO,
  addMonths,
  subDays,
  isWithinInterval,
  differenceInCalendarMonths,
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

  // Show reminder from (cycleDate - 4 days) to (cycleDate), inclusive (5 days)
  const popupStart = subDays(cycleDate, 4);
  const popupEnd = cycleDate;

  const isInWindow = isWithinInterval(today, {
    start: popupStart,
    end: popupEnd,
  });

  if (!isInWindow) return { show: false, popupStart, popupEnd };

  if (settings.lastDismissedDate) {
    const dismissed = parseISO(settings.lastDismissedDate);
    if (dismissed >= popupStart && dismissed <= popupEnd) {
      return { show: false, popupStart, popupEnd };
    }
  }

  return { show: true, popupStart, popupEnd };
}
