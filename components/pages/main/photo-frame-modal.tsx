import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { useDeviceSize } from "@/utils/get-device-size";
import React from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";

type PhotoFrameModalProps = {
  isPhotoFrameModalOpen: boolean;
  setIsPhotoFrameModalOpen: (isOpen: boolean) => void;
  selectedImages: string[];
  onClickBack: () => void;
};

export type FramesList = {
  id: number;
  frame1: string;
  frame2?: string;
};

const frames: FramesList[] = [
  {
    id: 1,
    frame1: "/photo-frames/frame-1.png",
    frame2: undefined,
  },
  {
    id: 2,
    frame1: "/photo-frames/frame-2-1.png",
    frame2: "/photo-frames/frame-2-2.png",
  },
  {
    id: 3,
    frame1: "/photo-frames/frame-3.png",
    frame2: undefined,
  },
  {
    id: 4,
    frame1: "/photo-frames/frame-4.png",
    frame2: undefined,
  },
  {
    id: 5,
    frame1: "/photo-frames/frame-5.png",
    frame2: undefined,
  },
  {
    id: 6,
    frame1: "/photo-frames/frame-6.png",
    frame2: undefined,
  },
  {
    id: 7,
    frame1: "#fff",
    frame2: "/photo-frames/frame-7-8.png",
  },
  {
    id: 8,
    frame1: "#000",
    frame2: "/photo-frames/frame-7-8.png",
  },
  {
    id: 9,
    frame1: "/photo-frames/frame-9.png",
    frame2: undefined,
  },
  {
    id: 10,
    frame1: "/photo-frames/frame-10-1.png",
    frame2: "/photo-frames/frame-10-2.png",
  },
  {
    id: 11,
    frame1: "/photo-frames/frame-11.png",
    frame2: undefined,
  },
  {
    id: 12,
    frame1: "/photo-frames/frame-12.png",
    frame2: undefined,
  },
  {
    id: 13,
    frame1: "/photo-frames/frame-13.png",
    frame2: undefined,
  },
  {
    id: 14,
    frame1: "/photo-frames/frame-14.png",
    frame2: undefined,
  },
  {
    id: 15,
    frame1: "/photo-frames/frame-15.png",
    frame2: undefined,
  },
  {
    id: 16,
    frame1: "/photo-frames/frame-16.png",
    frame2: undefined,
  },
  {
    id: 17,
    frame1: "/photo-frames/frame-17.png",
    frame2: undefined,
  },
  {
    id: 18,
    frame1: "/photo-frames/frame-18.png",
    frame2: undefined,
  },
  {
    id: 19,
    frame1: "/photo-frames/frame-19.png",
    frame2: undefined,
  },
  {
    id: 20,
    frame1: "/photo-frames/frame-20.png",
    frame2: undefined,
  },
  {
    id: 21,
    frame1: "/photo-frames/frame-21.png",
    frame2: undefined,
  },
  {
    id: 22,
    frame1: "/photo-frames/frame-22.png",
    frame2: undefined,
  },
  {
    id: 23,
    frame1: "/photo-frames/frame-23.png",
    frame2: undefined,
  },
  {
    id: 24,
    frame1: "/photo-frames/frame-24.png",
    frame2: undefined,
  },
  {
    id: 25,
    frame1: "/photo-frames/frame-25-1.png",
    frame2: "/photo-frames/frame-25-2.png",
  },
  {
    id: 26,
    frame1: "/photo-frames/frame-26-1.png",
    frame2: "/photo-frames/frame-26-2.png",
  },
  {
    id: 27,
    frame1: "#000",
    frame2: "/photo-frames/frame-27.png",
  },
  {
    id: 28,
    frame1: "/photo-frames/frame-28-1.png",
    frame2: "/photo-frames/frame-28-2.png",
  },
  {
    id: 29,
    frame1: "/photo-frames/frame-29.png",
    frame2: undefined,
  },
];

const FRAME_WIDTH = 435.81;
const FRAME_HEIGHT = 653.72;
const FRAME_PADDING_TOP = 21;
const FRAME_PADDING_SIDE = 39.62;
const IMAGE_SIZE = 172.34;
const GAP = 12.89;
const SCALE_FACTOR = 0.7;

function PhotoImage({ src, ...props }: { src: string } & any) {
  const [image] = useImage(src, "anonymous");
  return image ? (
    <KonvaImage image={image} cornerRadius={3} {...props} />
  ) : null;
}

const PhotoFrameModal = ({
  selectedImages,
  isPhotoFrameModalOpen,
  setIsPhotoFrameModalOpen,
  onClickBack,
}: PhotoFrameModalProps) => {
  const { memories } = React.useContext(MainPageContext);
  const [selectedPhotoFrameId, setSelectedPhotoFrameId] =
    React.useState<number>(1);

  const deviceType = useDeviceSize();
  const isLarge = deviceType === "xl" || deviceType === "lg";

  const stageRef = React.useRef<any>(null);
  const framesMap = new Map<number, FramesList>(
    frames.map((frame) => [frame.id, frame])
  );
  const selectedFrame = framesMap.get(selectedPhotoFrameId);

  const formattedImages = selectedImages
    .map(
      (id) => memories.find((memory) => memory.id.toString() === id)?.image_url
    )
    .filter(Boolean);

  const handleSelectPhotoFrame = (id: number) => {
    setSelectedPhotoFrameId(id);
  };

  const handleClickDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "photo-booth.png";
    link.href = uri;
    link.click();
    setIsPhotoFrameModalOpen(false);
  };

  return (
    <Dialog
      open={isPhotoFrameModalOpen}
      onOpenChange={setIsPhotoFrameModalOpen}
    >
      <DialogContent
        className={cn(
          "bg-memory-frame-background !rounded-[32px] w-full !max-w-[564px] h-fit",
          "max-lg:max-w-[calc(564px*0.7)]"
        )}
      >
        <DialogTitle className="text-base text-black-80 leading-none font-semibold text-center">
          Xem trước khung ảnh
        </DialogTitle>
        <DialogDescription />

        <div className="flex flex-col overflow-y-auto max-h-[70vh] w-full">
          <div className="relative !h-[654px] max-lg:!h-[calc(654px*0.7)]">
            <Stage
              ref={stageRef}
              width={isLarge ? FRAME_WIDTH : FRAME_WIDTH * SCALE_FACTOR}
              height={isLarge ? FRAME_HEIGHT : FRAME_HEIGHT * SCALE_FACTOR}
              className="flex justify-center"
            >
              <Layer>
                {selectedFrame?.frame1?.startsWith("#") ? (
                  <Rect
                    fill={selectedFrame?.frame1}
                    x={0}
                    y={0}
                    width={isLarge ? FRAME_WIDTH : FRAME_WIDTH * SCALE_FACTOR}
                    height={
                      isLarge ? FRAME_HEIGHT : FRAME_HEIGHT * SCALE_FACTOR
                    }
                  />
                ) : (
                  <PhotoImage
                    src={selectedFrame?.frame1 || ""}
                    x={0}
                    y={0}
                    width={isLarge ? FRAME_WIDTH : FRAME_WIDTH * SCALE_FACTOR}
                    height={
                      isLarge ? FRAME_HEIGHT : FRAME_HEIGHT * SCALE_FACTOR
                    }
                  />
                )}
              </Layer>
              <Layer>
                {formattedImages.map((src, index) => {
                  const col = index % 2;
                  const row = Math.floor(index / 2);
                  const x = isLarge
                    ? FRAME_PADDING_SIDE + col * (IMAGE_SIZE + GAP)
                    : FRAME_PADDING_SIDE * SCALE_FACTOR +
                      col * (IMAGE_SIZE * SCALE_FACTOR + GAP * SCALE_FACTOR);
                  const y = isLarge
                    ? FRAME_PADDING_TOP + row * (IMAGE_SIZE + GAP)
                    : FRAME_PADDING_TOP * SCALE_FACTOR +
                      row * (IMAGE_SIZE * SCALE_FACTOR + GAP * SCALE_FACTOR);
                  return (
                    <PhotoImage
                      key={index}
                      src={src}
                      x={x}
                      y={y}
                      width={isLarge ? IMAGE_SIZE : IMAGE_SIZE * SCALE_FACTOR}
                      height={isLarge ? IMAGE_SIZE : IMAGE_SIZE * SCALE_FACTOR}
                    />
                  );
                })}
              </Layer>
              <Layer>
                {selectedFrame?.frame2 && (
                  <PhotoImage
                    src={selectedFrame.frame2}
                    x={0}
                    y={0}
                    width={isLarge ? FRAME_WIDTH : FRAME_WIDTH * SCALE_FACTOR}
                    height={
                      isLarge ? FRAME_HEIGHT : FRAME_HEIGHT * SCALE_FACTOR
                    }
                  />
                )}
              </Layer>
            </Stage>
          </div>

          <div className="mt-5">
            <Carousel
              frames={frames}
              selectedId={selectedPhotoFrameId}
              onSelect={handleSelectPhotoFrame}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <Button className="h-[30px] text-xs" onClick={onClickBack}>
            Quay lại
          </Button>
          <Button className="h-[30px] text-xs" onClick={handleClickDownload}>
            Xong
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoFrameModal;
