import { getUser } from "@/utils/middlewares";
import { s3 } from "@/utils/s3-storage";
import supabase from "@/utils/supabase";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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
  const filePath = `memories/${userId}/${uuidv4()}.${fileExt}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_PATHNAME || "",
        Key: filePath,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
        CacheControl: "no-cache, no-store, must-revalidate",
      })
    );

    const publicUrl = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_PATHNAME}/${filePath}`;

    const { error: insertError } = await supabase.from("memory_images").insert({
      memory_id,
      image_url: publicUrl,
      description,
      is_visible,
      location,
      memory_date,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Tải ảnh lên thành công",
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("S3 upload error:", error.message || error);
    return NextResponse.json(
      { error: "Không thể tải ảnh lên" },
      { status: 500 }
    );
  }
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
    is_visible: is_visible === "true" ? true : false,
  };
  if (description) updates.description = description;
  if (location) updates.location = location;
  if (memory_date) updates.memory_date = memory_date;
  if (typeof file !== "string") {
    try {
      const { data: oldRecord, error: fetchError } = await supabase
        .from("memory_images")
        .select("image_url")
        .eq("id", memory_id)
        .single();

      if (fetchError) {
        console.error("Error fetching old image:", fetchError.message);
      } else if (oldRecord?.image_url) {
        const url = new URL(oldRecord.image_url);
        const oldKey = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
        const key = oldKey.replace(/^xuongkyuc\//, "");

        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_PATHNAME || "",
              Key: key,
            })
          );
        } catch (deleteErr) {
          console.error("S3 delete error:", deleteErr);
        }
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `memories/${userId}/${uuidv4()}.${fileExt}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_PATHNAME || "",
          Key: filePath,
          Body: buffer,
          ContentType: file.type,
          ACL: "public-read",
          CacheControl: "no-cache, no-store, must-revalidate",
        })
      );

      const publicUrl = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_PATHNAME}/${filePath}`;
      updates.image_url = publicUrl;
    } catch (error: any) {
      console.error("S3 upload error:", error.message || error);
      return NextResponse.json(
        { error: "Không thể tải ảnh lên" },
        { status: 500 }
      );
    }
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
    url: updates.image_url,
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

  try {
    const url = new URL(memory.image_url);
    const filePath = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    const key = filePath.replace(/^xuongkyuc\//, "");

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_PATHNAME || "",
        Key: key,
      })
    );
  } catch (err: any) {
    console.error("S3 delete error:", err.message || err);
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
