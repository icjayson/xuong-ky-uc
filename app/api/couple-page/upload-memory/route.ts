import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const memory_id = formData.get("memory_id") as string;
  const file = formData.get("file") as File;
  const description = formData.get("description") as string;
  const is_visible = formData.get("is_visible") === "true";
  const location = formData.get("location") as string;
  const memory_date = formData.get("memory_date") as string;

  if (!file || !memory_id) {
    return NextResponse.json(
      { error: "Missing file or memory_id" },
      { status: 400 }
    );
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/memories/${uuidv4()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("memories")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("memories").getPublicUrl(filePath);

  const { error: insertError } = await supabase.from("memory_images").insert({
    memory_id,
    image_url: publicUrl,
    description,
    is_visible,
    location,
    memory_date
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Tải ảnh lên thành công",
    url: publicUrl
  });
}

export async function PATCH(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const description = formData.get("description") as string;
  const is_visible = formData.get("is_visible");
  const location = formData.get("location") as string;
  const memory_date = formData.get("memory_date") as string;
  const memory_id = formData.get("memory_id") as string;

  const updates: Record<string, any> = {
    is_visible: is_visible === "true" ? true : false
  };
  if (description) updates.description = description;
  if (location) updates.location = location;
  if (memory_date) updates.memory_date = memory_date;
  if (typeof file !== "string") {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/memories/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("memories")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from("memories").getPublicUrl(filePath);

    updates.image_url = publicUrl;
  }

  const { error: updateError } = await supabase
    .from("memory_images")
    .update(updates)
    .eq("id", memory_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Cập nhật ảnh thành công",
    url: updates.image_url
  });
}

export async function DELETE(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const memory_id = formData.get("memory_id") as string;

  const { data: memory, error: memoryError } = await supabase
    .from("memory_images")
    .select("image_url")
    .eq("memory_id", memory_id)
    .single();

  if (memoryError) {
    return NextResponse.json(
      { error: "Không thể xóa ảnh kỷ niệm" },
      { status: 500 }
    );
  }

  const filePath = memory.image_url.split(
    "/storage/v1/object/public/memories/"
  )[1];

  const { error: deleteImagesError } = await supabase.storage
    .from("memories")
    .remove([filePath.toString()]);

  if (deleteImagesError) {
    return NextResponse.json(
      { error: "Không thể xóa ảnh kỷ niệm" },
      { status: 500 }
    );
  }

  const { error: deleteError } = await supabase
    .from("memory_images")
    .delete()
    .eq("memory_id", memory_id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Không thể xóa ảnh kỷ niệm" },
      { status: 500 }
    );
  }

  const { error: deleteMemoryError } = await supabase
    .from("memories")
    .delete()
    .eq("id", memory_id);

  if (deleteMemoryError) {
    return NextResponse.json(
      { error: "Không thể xóa kỷ niệm" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Xóa ảnh thành công" });
}
