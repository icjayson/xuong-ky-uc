import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  const userId = await getUser();

  if (!domain || !userId) {
    return NextResponse.json(
      { error: "Không tìm thấy domain" },
      { status: 400 }
    );
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .eq("domain", domain)
    .single();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Không tìm thấy domain" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
