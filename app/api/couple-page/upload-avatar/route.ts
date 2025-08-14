import { getUser } from "@/utils/middlewares";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/s3-storage";

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const avatarNumber = formData.get("avatarNumber") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `avatars/${userId}/avatar-${avatarNumber}.${fileExt}`;

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

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("S3 upload error:", error.message || error);
    throw new Error("Không thể tải ảnh lên");
  }
}
