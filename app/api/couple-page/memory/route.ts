import { getUser } from "@/utils/middlewares";
import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { page_id } = await req.json();

  if (!page_id)
    return NextResponse.json({ error: "Missing page_id" }, { status: 400 });

  const { data, error } = await supabase
    .from("memories")
    .insert({ page_id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Tạo kỷ niệm thành công",
    memory_id: data.id
  });
}

export async function GET(req: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get("public") === "true";

  const { data: page, error: pageError } = await supabase
    .from("couple_pages")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (pageError || !page) {
    return NextResponse.json(
      { error: "Không tìm thấy trang của bạn" },
      { status: 404 }
    );
  }

  let query = supabase
    .from("memories")
    .select(
      `
      id,
      created_at,
      memory_images (
        id,
        memory_id,
        image_url,
        description,
        memory_date,
        location,
        is_visible,
        created_at
      )
    `
    )
    .eq("page_id", page.id)
    .order("created_at", { ascending: true });

  if (publicOnly) {
    query = query.eq("is_visible", true);
  }

  const { data: memories, error: memoriesError } = await query;

  if (memoriesError) {
    return NextResponse.json({ error: memoriesError.message }, { status: 500 });
  }

  const formatted = memories
    .map((memory) => memory.memory_images?.[0])
    .filter((image) => image);

  return NextResponse.json({ memories: formatted });
}

export async function PATCH(req: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, title, description, image_url, date } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Không tìm thấy kỷ niệm" },
      { status: 400 }
    );
  }

  const updates: Record<string, any> = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (image_url) updates.image_url = image_url;
  if (date) updates.date = date;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "Không có trường nào để cập nhật" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("memories")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Update error:", error.message);
    return NextResponse.json({ error: "Cập nhật thất bại" }, { status: 500 });
  }

  return NextResponse.json({ message: "Cập nhật kỷ niệm thành công" });
}

export async function DELETE(req: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Không tìm thấy kỷ niệm" },
      { status: 400 }
    );
  }

  const { data: page, error: pageError } = await supabase
    .from("couple_pages")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (pageError || !page) {
    return NextResponse.json(
      { error: "Không tìm thấy trang của bạn" },
      { status: 404 }
    );
  }

  const { data: memory, error: fetchError } = await supabase
    .from("memories")
    .select("id")
    .eq("id", id)
    .eq("page_id", page.id)
    .single();

  if (fetchError || !memory) {
    return NextResponse.json(
      { error: "Không tìm thấy kỷ niệm" },
      { status: 404 }
    );
  }

  const { data: memoryImages, error: memoryImagesError } = await supabase
    .from("memory_images")
    .select("image_url")
    .eq("memory_id", memory.id);

  if (memoryImagesError) {
    return NextResponse.json(
      { error: "Không thể xóa ảnh kỷ niệm" },
      { status: 500 }
    );
  }

  const { error: deleteError } = await supabase
    .from("memories")
    .delete()
    .eq("id", id)
    .eq("page_id", page.id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Không thể xóa kỷ niệm" },
      { status: 500 }
    );
  }

  const filePaths = memoryImages.map(
    (image) => image.image_url?.split("/storage/v1/object/public/")[1]
  );

  if (filePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("memories")
      .remove(filePaths);

    if (storageError) {
      console.warn(
        "Xóa kỷ niệm thành công, nhưng không thể xóa ảnh từ storage:",
        storageError.message
      );
    }
  }

  return NextResponse.json({ message: "Xóa kỷ niệm thành công" });
}
