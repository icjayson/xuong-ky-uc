"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import InformationFormInput from "./information-form-input";
import Image from "next/image";

type InformationFormItemProps = {
  title?: string;
  name?: string;
  nickname?: string;
  dob?: Date;
  zodiac?: string;
  description?: string;
  avatar?: File | string;
  onNameChange?: (name: string) => void;
  onNicknameChange?: (nickname: string) => void;
  onDobChange?: (dob: Date) => void;
  onZodiacChange?: (zodiac: string) => void;
  onDescriptionChange?: (description: string) => void;
  onAvatarChange?: (avatar: File) => void;
};

const InformationFormItem = ({
  title,
  name,
  nickname,
  dob,
  zodiac,
  description,
  avatar,
  onNameChange,
  onNicknameChange,
  onDobChange,
  onZodiacChange,
  onDescriptionChange,
  onAvatarChange
}: InformationFormItemProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>("");

  React.useEffect(() => {
    if (avatar instanceof File) {
      const objectUrl = URL.createObjectURL(avatar);
      setAvatarUrl(objectUrl);
    } else {
      setAvatarUrl(avatar || "");
    }
  }, [avatar]);

  return (
    <div>
      <div
        className={cn(
          "text-black-80 text-xl font-medium mb-3",
          "max-sm:text-xs"
        )}
      >
        {title}
      </div>

      <div className={cn("flex items-center gap-7", "max-sm:gap-2")}>
        <div className="flex flex-col gap-3 relative">
          <div
            className={cn(
              "text-xs text-black-80 font-medium",
              "max-sm:text-[10px]"
            )}
          >
            Ảnh đại diện
          </div>
          <div
            className={cn(
              "w-[156px] h-[156px] rounded-lg bg-image-placeholder overflow-hidden",
              "max-sm:w-[128px] max-sm:h-[128px]"
            )}
          >
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={156}
                height={156}
                className="object-cover w-full h-full"
              />
            )}
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
            className="absolute top-0 left-0 opacity-0"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onAvatarChange?.(file);
              }
            }}
          />
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <InformationFormInput
            title="Họ tên"
            placeholder="Họ tên"
            value={name}
            onChange={(value) => onNameChange?.(value as string)}
          />
          <InformationFormInput
            title="Biệt danh"
            placeholder="Biệt danh"
            value={nickname}
            onChange={(value) => onNicknameChange?.(value as string)}
          />
          <InformationFormInput
            title="Ngày sinh"
            placeholder="DD/MM/YYYY"
            type="date"
            value={dob}
            onChange={(value) => onDobChange?.(value as Date)}
          />
          <InformationFormInput
            title="Cung hoàng đạo"
            placeholder="Cung hoàng đạo"
            value={zodiac}
            onChange={(value) => onZodiacChange?.(value as string)}
          />
          <InformationFormInput
            title="Khác"
            placeholder="Mọi thứ bạn muốn"
            value={description}
            onChange={(value) => onDescriptionChange?.(value as string)}
          />
        </div>
      </div>
    </div>
  );
};

export default InformationFormItem;
