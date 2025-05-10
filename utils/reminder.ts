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
  startDate: string;
  lastDismissedDate?: string;
};

export function shouldShowReminder(
  settings: ReminderSettings,
  now = new Date()
): { show: boolean; popupStart: Date; popupEnd: Date } {
  const today = new Date(now.toISOString().slice(0, 19) + "Z");
  const start = parseISO(settings.startDate);

  if (today < start) {
    return { show: false, popupStart: start, popupEnd: start };
  }

  const monthsSinceStart = differenceInCalendarMonths(today, start);

  let interval: number;
  if (monthsSinceStart < 12) {
    interval = Math.floor(monthsSinceStart / 3) * 3;
  } else {
    interval = Math.floor(monthsSinceStart / 12) * 12;
  }

  if (interval === 0) {
    return { show: false, popupStart: start, popupEnd: start };
  }

  const cycleDate = addMonths(start, interval);

  const rawPopupStart = subDays(cycleDate, 4);
  const rawPopupEnd = cycleDate;

  const popupStart = new Date(
    rawPopupStart.getFullYear(),
    rawPopupStart.getMonth(),
    rawPopupStart.getDate()
  );
  const popupEnd = new Date(
    rawPopupEnd.getFullYear(),
    rawPopupEnd.getMonth(),
    rawPopupEnd.getDate()
  );

  const isInWindow = isWithinInterval(today, {
    start: popupStart,
    end: popupEnd,
  });

  if (!isInWindow) {
    return { show: false, popupStart, popupEnd };
  }

  const dayStart = startOfDay(today);
  const noon = addHours(dayStart, 12);
  const currentWindowStart = today < noon ? dayStart : noon;
  console.log("last dismissed date", settings.lastDismissedDate);

  if (settings.lastDismissedDate) {
    const dismissedAt = parseISO(settings.lastDismissedDate);
    if (isAfter(dismissedAt, currentWindowStart)) {
      return { show: false, popupStart, popupEnd };
    }
  }

  return { show: true, popupStart, popupEnd };
}
