import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("email, domain, code, id")
    .eq("id", userId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
