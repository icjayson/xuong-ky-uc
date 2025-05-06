import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

type SelectImagesModalProps = {
  isSelectImagesModalOpen: boolean;
  setIsSelectImagesModalOpen: (isOpen: boolean) => void;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  onClickNext: () => void;
};

const SelectImagesModal = ({
  isSelectImagesModalOpen,
  setIsSelectImagesModalOpen,
  selectedImages,
  setSelectedImages,
  onClickNext,
}: SelectImagesModalProps) => {
  const { memories, color } = React.useContext(MainPageContext);

  const handleClickSelectImage = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      return setSelectedImages((prev) => {
        return prev.filter((id) => id !== imageId);
      });
    }

    if (selectedImages.length >= 6) {
      toast.error("Bạn chỉ được chọn tối đa 6 ảnh");
      return;
    }

    setSelectedImages((prev) => [...prev, imageId]);
  };

  return (
    <Dialog
      open={isSelectImagesModalOpen}
      onOpenChange={(open) => {
        setSelectedImages([]);
        setIsSelectImagesModalOpen(open);
      }}
    >
      <DialogContent
        className="!rounded-[32px] max-h-screen w-full !max-w-[728px] m-2"
        style={{
          backgroundColor: color?.secondary1 || "rgba(238, 234, 223, 1)",
        }}
      >
        <DialogTitle
          className="text-2xl leading-none font-semibold text-center"
          style={{
            color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
          }}
        >
          Tải xuống nhật ký
        </DialogTitle>
        <DialogDescription />
        <div className="mt-5 h-full">
          <div
            className="text-center text-base leading-none"
            style={{
              color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
            }}
          >
            Chọn 6 ảnh bất kỳ
          </div>

          <div
            className={cn(
              "mt-5 grid grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto max-md:max-h-[40vh]"
            )}
          >
            {memories.map((image) => (
              <div
                className={cn("relative opacity-80", {
                  "opacity-100": selectedImages.includes(image.id.toString()),
                })}
                key={image.id}
              >
                <Avatar
                  squareBorder
                  className={cn("w-full h-full rounded-sm")}
                  onClick={() => handleClickSelectImage(image.id.toString())}
                >
                  <AvatarImage src={image.image_url} className="object-cover" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "absolute top-3 left-3 bg-primary text-black w-5 h-5 rounded-full hidden items-center justify-center text-xs",
                    {
                      " flex": selectedImages.includes(image.id.toString()),
                    }
                  )}
                >
                  {selectedImages.indexOf(image.id.toString()) + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              disabled={selectedImages.length !== 6}
              onClick={onClickNext}
              style={{
                backgroundColor: color?.primary,
                color: color?.secondary3,
              }}
            >
              Tiếp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectImagesModal;
