import { parseISO, addMonths, isBefore, isAfter } from "date-fns";

export type ReminderSettings = {
  startDate: string;
  intervalMonths: number;
  lastDismissedDate?: string;
};

export function shouldShowReminder(
  settings: ReminderSettings,
  today = new Date()
): boolean {
  const start = parseISO(settings.startDate);
  const interval = settings.intervalMonths;

  let reminderDate = addMonths(start, interval);

  while (isBefore(reminderDate, today)) {
    reminderDate = addMonths(reminderDate, interval);
  }

  const latestTriggerDate = addMonths(reminderDate, -interval);

  if (settings.lastDismissedDate) {
    const dismissed = parseISO(settings.lastDismissedDate);
    if (isAfter(dismissed, latestTriggerDate)) {
      return false;
    }
  }

  return true;
}
