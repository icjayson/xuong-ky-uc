import { getUser } from "@/utils/middlewares";
import { shouldShowReminder } from "@/utils/reminder";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

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
    intervalMonths: reminder.interval_months,
    lastDismissedDate: reminder.last_dismissed_date,
  });

  return NextResponse.json({ ...showReminder });
}

export async function PATCH() {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("reminders")
    .update({ last_dismissed_at: new Date().toISOString() })
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

  const { start_date, interval_months, last_dismissed_at } = await req.json();

  const { data: reminder } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .single();

  let supabaseError = null;

  if (reminder) {
    const { error } = await supabase
      .from("reminders")
      .update({ last_dismissed_at, start_date, interval_months })
      .eq("user_id", userId)
      .select()
      .single();

    supabaseError = error;
  } else {
    const { error } = await supabase
      .from("reminders")
      .insert({ user_id: userId, start_date, interval_months })
      .select()
      .single();

    supabaseError = error;
  }

  if (supabaseError) {
    return NextResponse.json({ error: supabaseError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
