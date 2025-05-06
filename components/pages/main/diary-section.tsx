"use client";

import { Button } from "@/components/ui/button";
import DiaryCard from "@/components/ui/diary-card";
import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import SelectImagesModal from "./select-images-modal";
import PhotoFrameModal from "./photo-frame-modal";

type DiarySectionProps = {
  isEditMode?: boolean;
};

const DiarySection = ({ isEditMode = false }: DiarySectionProps) => {
  const { memories, color, data, colorKey } = React.useContext(MainPageContext);
  const [isSelectingImages, setIsSelectingImages] = React.useState(false);
  const [isPhotoFrameModalOpen, setIsPhotoFrameModalOpen] =
    React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

  const router = useRouter();

  const handleClickAddMemory = () => {
    router.push("/memory");
  };

  const handleDownloadDiary = () => {
    if (!isEditMode) return;

    setIsSelectingImages(true);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 w-4/5 mx-auto",
        "max-sm:gap-4"
      )}
      id="diary-section-title"
    >
      <div
        className={cn(
          "text-[32px] text-black-80 font-medium",
          "max-sm:text-base",
          "max-lg:text-lg",
          "max-xl:text-xl"
        )}
        style={{
          color:
            colorKey !== "custom"
              ? colorKey == "3"
                ? color?.secondary1
                : color?.secondary3
              : color?.secondary4 || undefined,
          fontFamily: data?.font || undefined,
        }}
      >
        Nhật ký tình yêu
      </div>

      <div
        className={cn(
          "grid grid-cols-4 gap-5",
          "max-sm:gap-4 max-sm:grid-cols-2",
          "max-lg:gap-4 max-lg:grid-cols-3"
        )}
      >
        {memories.map((memory) => (
          <DiaryCard key={memory.id} {...memory} />
        ))}

        {isEditMode && (
          <DiaryCard isEditMode={isEditMode} onClick={handleClickAddMemory} />
        )}
      </div>

      {isEditMode && (
        <>
          <div className="">
            <Button
              onClick={handleDownloadDiary}
              style={{
                backgroundColor: color?.primary,
                color: color?.secondary3,
              }}
            >
              Tải xuống nhật ký
            </Button>
          </div>

          <SelectImagesModal
            isSelectImagesModalOpen={isSelectingImages}
            selectedImages={selectedImages}
            setIsSelectImagesModalOpen={setIsSelectingImages}
            setSelectedImages={setSelectedImages}
            onClickNext={() => {
              setIsSelectingImages(false);
              setIsPhotoFrameModalOpen(true);
            }}
          />

          <PhotoFrameModal
            selectedImages={selectedImages}
            isPhotoFrameModalOpen={isPhotoFrameModalOpen}
            setIsPhotoFrameModalOpen={setIsPhotoFrameModalOpen}
            setSelectedImages={setSelectedImages}
            onClickBack={() => {
              setIsPhotoFrameModalOpen(false);
              setIsSelectingImages(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default DiarySection;
