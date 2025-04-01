import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Không tìm thấy domain" },
      { status: 400 }
    );
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("domain", domain)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: "Không tìm thấy user" }, { status: 404 });
  }

  const { data, error: pageError } = await supabase
    .from("couple_pages")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (pageError || !data) {
    return NextResponse.json(
      { error: "Không tìm thấy trang" },
      { status: 404 }
    );
  }

  const { data: memories, error: memoriesError } = await supabase
    .from("memories")
    .select(
      `
      memory_images (
        id,
        image_url,
        description,
        memory_date,
        location,
        is_visible,
        created_at
      )
    `
    )
    .eq("page_id", data.id)
    .order("created_at", { ascending: true });

  if (memoriesError || !memories) {
    return NextResponse.json(
      { error: "Không tìm thấy nhật ký" },
      { status: 404 }
    );
  }

  const formattedMemories = memories
    .map((memory) => memory.memory_images[0])
    .filter((memory) => memory?.is_visible);

  const formattedData = {
    ...data,
    color_scheme: JSON.parse(data.color_scheme || "{}")
  };

  return NextResponse.json({
    data: formattedData,
    memories: formattedMemories
  });
}
