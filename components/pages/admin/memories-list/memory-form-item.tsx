import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import MemoryFormInput from "./memory-form-input";
import { acceptFileExtensions, convertImage } from "@/utils/convert-image";

type MemoryFormItemProps = {
  isCreateMode?: boolean;
  location: string;
  date: Date;
  description: string;
  image: File | string;
  onImageChange: (image: File) => void;
  onSave: () => void;
  onLocationChange: (location: string) => void;
  onDateChange: (date: Date) => void;
  onDescriptionChange: (description: string) => void;
  onCancel: () => void;
};

const MemoryFormItem = ({
  isCreateMode = false,
  location,
  date,
  description,
  image,
  onImageChange,
  onSave,
  onLocationChange,
  onDateChange,
  onDescriptionChange,
  onCancel
}: MemoryFormItemProps) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      const objectUrl = await convertImage(image);
      setImageUrl(objectUrl || "");
    };

    fetchImage();
  }, [image]);

  return (
    <div>
      <div
        className={cn(
          "text-black-80 text-xl font-medium mb-3",
          "max-sm:text-xs"
        )}
      >
        {isCreateMode ? "Thêm kỷ niệm" : "Tùy chỉnh kỷ niệm"}
      </div>

      <div className={cn("flex gap-7", "max-sm:gap-2")}>
        <div className="flex flex-col relative">
          <div
            className={cn(
              "text-xs text-black-80 font-medium mb-2",
              "max-sm:text-[10px]"
            )}
          >
            Ảnh kỷ niệm
          </div>
          <div
            className={cn(
              "w-[156px] h-[156px] rounded-lg bg-image-placeholder overflow-hidden mb-[4px]",
              "max-sm:w-[128px] max-sm:h-[128px]"
            )}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="memory"
                width={156}
                height={156}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="text-[8px] text-black-80 flex flex-col items-center mb-2">
            <div>Dung lượng ảnh tải lên tối đa: 5MB</div>
            <div>Định dạng: PNG, JPEG, HEIC, HEIF</div>
          </div>
          <div>
            <Button
              className="h-6 text-[10px] px-2 rounded-[8px]"
              onClick={() => fileInputRef.current?.click()}
            >
              Tải ảnh lên
            </Button>
          </div>

          <input
            type="file"
            accept={acceptFileExtensions}
            className="absolute top-0 left-0 opacity-0"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageChange?.(file);
              }
            }}
          />
        </div>

        <div className="flex flex-col flex-1 justify-between gap-4">
          <div className={cn("flex flex-col gap-2 flex-1")}>
            <MemoryFormInput
              title="Địa điểm"
              placeholder="Địa điểm"
              value={location}
              onChange={(value) => {
                onLocationChange?.(value as string);
              }}
              limit={50}
            />
            <MemoryFormInput
              title="Ngày"
              placeholder="Ngày"
              value={date}
              type="date"
              onChange={(value) => {
                onDateChange?.(value as Date);
              }}
            />
            <MemoryFormInput
              title="Mô tả"
              placeholder="Mô tả"
              value={description}
              type="textarea"
              className="flex-1"
              onChange={(value) => {
                onDescriptionChange?.(value as string);
              }}
              limit={200}
            />
          </div>

          <div className={cn("flex justify-end gap-3")}>
            <Button
              className={cn("h-6 text-[10px] px-2 rounded-[8px]")}
              onClick={onCancel}
            >
              Hủy
            </Button>

            <Button
              className={cn("h-6 text-[10px] px-2 rounded-[8px]")}
              onClick={() => onSave()}
              disabled={!image || !location || !description}
            >
              Xong
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryFormItem;
