import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import MemoryFormItem from "./memory-form-item";
import { MemoryContext } from "@/app/(admin)/memory/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type MemoryItemProps = {
  id: number;
  location: string;
  memory_date: Date;
  image_url: File | string;
  description: string;
  is_visible: boolean;
};

const MemoryItem = ({
  id,
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
      const formData = new FormData();
      formData.append("file", editedImage);
      formData.append("memory_id", id.toString());
      formData.append("location", editedLocation);
      formData.append("date", new Date(editedDate).toISOString());
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
      formData.append("memory_id", id.toString());

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

  React.useEffect(() => {
    if (image_url instanceof File) {
      const objectUrl = URL.createObjectURL(image_url);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(image_url || "");
    }
  }, [image_url]);

  if (isEditing) {
    return (
      <MemoryFormItem
        location={editedLocation}
        date={new Date(editedDate)}
        description={editedDescription}
        image={editedImage}
        onImageChange={(value) => {
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
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className={cn("flex justify-between")}>
      <div className={cn("flex gap-3")}>
        <div className={cn("w-15 h-15 bg-image-placeholder overflow-hidden")}>
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
              "text-black-80 text-base font-medium",
              "max-sm:text-xs"
            )}
          >
            {location}
          </div>
          <div className={cn("text-black-80 text-xs", "max-sm:text-[10px]")}>
            {memory_date.toString()}
          </div>
          <div className={cn("text-black-80 text-xs", "max-sm:text-[10px]")}>
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
