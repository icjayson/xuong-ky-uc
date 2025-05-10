import { getUser } from "@/utils/middlewares";
import { shouldShowReminder } from "@/utils/reminder";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET() {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: reminder, error: reminderError } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (reminderError || !reminder) {
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 404 });
  }

  const showReminder = shouldShowReminder({
    startDate: reminder.start_date,
    lastDismissedDate: reminder.last_dismissed_at,
  });

  return NextResponse.json({ ...showReminder });
}

export async function PATCH() {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dateWithoutTimezone = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");

  const { error } = await supabase
    .from("reminders")
    .update({ last_dismissed_at: dateWithoutTimezone })
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { start_date, last_dismissed_at } = await req.json();

  const { data: reminder } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .single();

  let supabaseError = null;

  if (reminder) {
    const { error } = await supabase
      .from("reminders")
      .update({ last_dismissed_at, start_date })
      .eq("user_id", userId)
      .select()
      .single();

    supabaseError = error;
  } else {
    const { error } = await supabase
      .from("reminders")
      .insert({ user_id: userId, start_date })
      .select()
      .single();

    supabaseError = error;
  }

  if (supabaseError) {
    return NextResponse.json({ error: supabaseError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
