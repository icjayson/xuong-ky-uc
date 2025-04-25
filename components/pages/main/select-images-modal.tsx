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
  const { memories } = React.useContext(MainPageContext);

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
      <DialogContent className="bg-memory-frame-background !rounded-[32px] w-full !max-w-[776px]">
        <DialogTitle className="text-2xl text-black-80 leading-none font-semibold text-center">
          Tải xuống nhật ký
        </DialogTitle>
        <DialogDescription />
        <div className="mt-5">
          <div className="text-center text-base text-black-80 leading-none">
            Chọn 6 ảnh bất kỳ
          </div>

          <div
            className={cn(
              "mt-5 grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-4 place-items-center max-h-[728px] overflow-y-auto",
              "max-lg:grid-cols-[repeat(2,_minmax(150px,_1fr))] max-lg:max-h-[500px]",
              "max-sm:grid-cols-[repeat(2,_minmax(100px,_1fr))] max-sm:max-h-[300px]"
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
                    "absolute top-3 left-3 bg-switch-active text-white w-5 h-5 rounded-full hidden items-center justify-center text-xs",
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
