"use client";

import MemoriesList from "@/components/pages/admin/memories-list/memories-list";
import MemoryFormItem from "@/components/pages/admin/memories-list/memory-form-item";
import Preview from "@/components/pages/admin/preview";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import MemoryFrameSelector from "@/components/ui/memory-frame-selector";
import { MemoryContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { convertImage, heicToJpeg, validateFile } from "@/utils/convert-image";
import { useGetCookie } from "cookies-next";
import React from "react";

const MemoryPage = () => {
  const [memories, setMemories] = React.useState([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/couple-page/memory");
      const { memories } = await response.json();
      setMemories(memories);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchMemories = () => {
    fetchMemories();
  };

  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState<File | string>("");
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [isPreviewDesktop, setIsPreviewDesktop] = React.useState(false);
  const getCookie = useGetCookie();

  const handleSave = async () => {
    try {
      if (!image) return;

      setIsLoading(true);
      const page_id = getCookie("pageId");
      const response = await fetch("/api/couple-page/memory", {
        method: "POST",
        body: JSON.stringify({ page_id })
      });

      let convertedFile;
      if (
        image instanceof File &&
        (image.type === "image/heic" ||
          image.type === "image/heif" ||
          image.type.endsWith(".heic") ||
          image.type.endsWith(".heif"))
      ) {
        convertedFile = await heicToJpeg(image);
      }

      const data = await response.json();

      const formData = new FormData();
      formData.append("file", convertedFile || image);
      formData.append("memory_id", data.memory_id);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("is_visible", "true");
      formData.append("memory_date", new Date(date).toLocaleDateString());

      await fetch("/api/couple-page/upload-memory", {
        method: "POST",
        body: formData
      });

      refetchMemories();
      setIsCreating(false);
      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setLocation("");
    setDate(new Date());
    setDescription("");
    setImage("");
  };

  React.useEffect(() => {
    const fetchImage = async () => {
      const objectUrl = await convertImage(image);
      setPreviewImage(objectUrl || "");
    };

    fetchImage();
  }, [image]);

  React.useEffect(() => {
    fetchMemories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MemoryContext.Provider
      value={{ refetchMemories, setIsLoading, isCreating, setIsCreating }}
    >
      <div className={cn("w-full h-full flex")}>
        <div
          className={cn(
            "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10 pb-20 overflow-x-hidden",
            "max-sm:gap-3",
            "max-xl:w-full max-xl:border-none max-xl:px-6 max-xl:pt-6"
          )}
        >
          <div
            className={cn(
              "text-[32px] text-black-80 font-medium",
              "max-sm:text-xl"
            )}
          >
            Thông tin
          </div>

          <Card infoCard className="">
            <div
              className={cn(
                "text-black-80 text-2xl font-bold mb-6",
                "max-sm:text-base"
              )}
            >
              Tùy chọn nhật ký
            </div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn mẫu khung:
            </div>

            <MemoryFrameSelector />

            <Button
              className="w-full text-black-80 my-3"
              onClick={() => setIsCreating(!isCreating)}
            >
              Thêm kỷ niệm
            </Button>

            {isCreating && (
              <MemoryFormItem
                isCreateMode
                location={location}
                date={date}
                description={description}
                image={previewImage as string}
                onImageChange={(value) => {
                  if (!validateFile(value)) {
                    return;
                  }

                  setImage(value);
                }}
                onLocationChange={(value) => setLocation(value)}
                onDateChange={(value) => setDate(value)}
                onDescriptionChange={(value) => setDescription(value)}
                onSave={handleSave}
                onCancel={() => handleCancel()}
              />
            )}
          </Card>

          <Card infoCard className="">
            <div
              className={cn(
                "text-black-80 text-2xl font-bold mb-6",
                "max-sm:text-base"
              )}
            >
              Danh sách các kỷ niệm
            </div>

            <MemoriesList memories={memories} />
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              className={cn(
                "hidden h-10 px-4 text-base",
                "max-sm:h-8 max-sm:px-2 max-sm:text-xs",
                "max-xl:block"
              )}
              onClick={() => setIsPreviewDesktop(true)}
            >
              Xem trước
            </Button>
          </div>
        </div>

        <div className={cn("w-1/2 max-xl:hidden")}>
          <Preview
            isPreviewDesktop={isPreviewDesktop}
            setIsPreviewDesktop={setIsPreviewDesktop}
          />
        </div>
      </div>
    </MemoryContext.Provider>
  );
};

export default MemoryPage;
