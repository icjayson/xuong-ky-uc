import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import MemoryFormItem from "./memory-form-item";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { MemoryContext } from "@/contexts/contexts";
import { format } from "date-fns";
import { convertImage, heicToJpeg, validateFile } from "@/utils/convert-image";

type MemoryItemProps = {
  id: number;
  memory_id: string;
  location: string;
  memory_date: Date;
  image_url: File | string;
  description: string;
  is_visible: boolean;
};

const MemoryItem = ({
  id,
  memory_id,
  location,
  memory_date,
  image_url,
  description,
  is_visible
}: MemoryItemProps) => {
  const [imageUrl, setImageUrl] = React.useState<string | File>(image_url);
  const [editedLocation, setEditedLocation] = React.useState<string>(location);
  const [editedDate, setEditedDate] = React.useState<Date>(memory_date);
  const [editedDescription, setEditedDescription] =
    React.useState<string>(description);
  const [editedImage, setEditedImage] = React.useState<File | string>(
    image_url
  );
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(is_visible);
  const [isConfirmDelete, setIsConfirmDelete] = React.useState<boolean>(false);

  const { refetchMemories, setIsLoading } = React.useContext(MemoryContext);

  const handleSave = async (is_visible?: boolean) => {
    try {
      setIsLoading(true);

      let convertedFile;
      if (
        editedImage instanceof File &&
        (editedImage.type === "image/heic" ||
          editedImage.type === "image/heif" ||
          editedImage.type.endsWith(".heic") ||
          editedImage.type.endsWith(".heif"))
      ) {
        convertedFile = await heicToJpeg(editedImage);
      }
      const formData = new FormData();
      formData.append("file", convertedFile || editedImage);
      formData.append("memory_id", id.toString());
      formData.append("location", editedLocation);
      formData.append("memory_date", new Date(editedDate).toLocaleDateString());
      formData.append("description", editedDescription);
      formData.append(
        "is_visible",
        is_visible?.toString() || isVisible.toString()
      );

      const response = await fetch(`/api/couple-page/upload-memory`, {
        method: "PATCH",
        body: formData
      });

      if (response.ok) {
        setIsEditing(false);
        refetchMemories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("memory_id", memory_id.toString());

      const response = await fetch(`/api/couple-page/upload-memory`, {
        method: "DELETE",
        body: formData
      });

      if (response.ok) {
        refetchMemories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedLocation(location);
    setEditedDate(memory_date);
    setEditedDescription(description);
    setEditedImage(image_url);
  };

  React.useEffect(() => {
    const fetchImage = async () => {
      const objectUrl = await convertImage(image_url);
      setImageUrl(objectUrl || "");
    };

    fetchImage();
  }, [image_url]);

  if (isEditing) {
    return (
      <MemoryFormItem
        location={editedLocation}
        date={new Date(editedDate)}
        description={editedDescription}
        image={editedImage}
        onImageChange={(value) => {
          if (!validateFile(value)) {
            return;
          }

          setEditedImage(value);
        }}
        onLocationChange={(value) => {
          setEditedLocation(value);
        }}
        onDateChange={(value) => {
          setEditedDate(value);
        }}
        onDescriptionChange={(value) => {
          setEditedDescription(value);
        }}
        onSave={handleSave}
        onCancel={() => handleCancel()}
      />
    );
  }

  return (
    <div className={cn("flex justify-between items-center gap-2")}>
      <div className={cn("flex gap-3 max-w-[85%]")}>
        <div
          className={cn(
            "min-w-15 min-h-15 w-15 h-15 bg-image-placeholder overflow-hidden"
          )}
        >
          {imageUrl && (
            <Image
              src={imageUrl as string}
              alt="memory"
              width={60}
              height={60}
              className={cn("w-full h-full object-cover")}
            />
          )}
        </div>
        <div>
          <div
            className={cn(
              "text-black-80 text-base font-medium prevent-overflow-word",
              "max-sm:text-xs"
            )}
          >
            {location}
          </div>
          <div
            className={cn(
              "text-black-80 text-xs prevent-overflow-word",
              "max-sm:text-[10px]"
            )}
          >
            {format(memory_date ? memory_date : new Date(), "dd/MM/yyyy")}
          </div>
          <div
            className={cn(
              "text-black-80 text-xs prevent-overflow-word",
              "max-sm:text-[10px]"
            )}
          >
            {description}
          </div>
        </div>
      </div>

      <div className={cn("flex flex-col justify-end items-end pb-[7px] gap-1")}>
        <div className={cn("")}>
          <Switch
            checked={isVisible}
            onCheckedChange={(checked) => {
              setIsVisible(checked);
              handleSave(checked);
            }}
          />
        </div>

        <div className={cn("flex gap-3")}>
          <Button
            variant="primary"
            anomaly="ghost"
            className={cn(
              "px-0 h-3 text-xs text-black-80",
              "max-sm:text-[10px]"
            )}
            onClick={() => setIsConfirmDelete(true)}
          >
            Xóa
          </Button>

          <Button
            variant="primary"
            anomaly="ghost"
            className={cn(
              "px-0 h-3 text-xs text-black-80",
              "max-sm:text-[10px]"
            )}
            onClick={() => setIsEditing(true)}
          >
            Tùy chỉnh
          </Button>

          <Dialog open={isConfirmDelete} onOpenChange={setIsConfirmDelete}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xóa kỷ niệm</DialogTitle>
              </DialogHeader>

              <DialogDescription>
                Bạn có chắc chắn muốn xóa kỷ niệm này không?
              </DialogDescription>

              <DialogFooter>
                <Button
                  variant="primary"
                  onClick={() => setIsConfirmDelete(false)}
                >
                  Hủy
                </Button>

                <Button variant="primary" onClick={() => handleDelete()}>
                  Xóa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MemoryItem;
