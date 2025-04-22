import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const avatarNumber = formData.get("avatarNumber") as string;
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar-${avatarNumber}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    console.error("Upload error:", error.message);
    throw new Error("Không thể tải ảnh lên");
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
