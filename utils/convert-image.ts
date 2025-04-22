import { IMAGE_FORMATS } from "@/const/constants";
import { MAX_IMAGE_SIZE_BYTES } from "@/const/constants";
import convert from "heic-convert";
import { toast } from "sonner";

export const convertImage = async (avatar: File | string | undefined) => {
  if (!avatar) return;

  if (avatar instanceof File) {
    if (
      avatar.type === "image/heic" ||
      avatar.type.endsWith(".heic") ||
      avatar.type === "image/heif" ||
      avatar.type.endsWith(".heif")
    ) {
      const buffer = Buffer.from(await avatar.arrayBuffer());
      const outputBuffer = await convert({
        buffer: buffer as unknown as ArrayBuffer,
        format: "JPEG",
        quality: 1
      });
      const blob = new Blob([outputBuffer], { type: "image/jpeg" });
      const objectUrl = URL.createObjectURL(blob);

      return objectUrl;
    } else {
      const objectUrl = URL.createObjectURL(avatar);
      return objectUrl;
    }
  } else {
    return avatar;
  }
};

export const heicToJpeg = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await convert({
    buffer: buffer as unknown as ArrayBuffer,
    format: "JPEG",
    quality: 1
  });
  const blob = new Blob([outputBuffer], { type: "image/jpeg" });
  const convertedFile = new File([blob], "image.jpg", {
    type: "image/jpeg"
  });
  return convertedFile;
};

export const validateFile = (file: File | string) => {
  if (typeof file === "string") {
    return true;
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    toast.error("Dung lượng ảnh tải lên tối đa: 5MB");
    return false;
  }

  if (!IMAGE_FORMATS.includes(file.type)) {
    toast.error("Định dạng ảnh không hợp lệ");
    return false;
  }

  return true;
};

export const acceptFileExtensions = ".png, .jpg, .jpeg, .heic, .heif";
