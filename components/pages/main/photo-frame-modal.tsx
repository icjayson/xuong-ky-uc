"use client";

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
import type { Image } from "konva/lib/shapes/Image";
import React, { useEffect, useState } from "react";
import { Group, Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import { toast } from "sonner";
import useImage from "use-image";

type PhotoFrameModalProps = {
  isPhotoFrameModalOpen: boolean;
  setIsPhotoFrameModalOpen: (isOpen: boolean) => void;
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
  onClickBack: () => void;
};

export type FramesList = {
  id: number;
  frame1: string;
  frame2?: string;
  bgColor?: string;
  borders?: string[];
};

const frames: FramesList[] = [
  {
    id: 1,
    frame1: "/photo-frames/frame-1.svg",
    frame2: undefined,
  },
  {
    id: 2,
    frame1: "/photo-frames/frame-2-1.png",
    frame2: "/photo-frames/frame-2-2.svg",
  },
  {
    id: 3,
    frame1: "/photo-frames/frame-3.svg",
    frame2: undefined,
    borders: ["#ffc3cf", "#25bf96", "#ffc3cf", "#25bf96", "#ffc3cf", "#25bf96"],
  },
  {
    id: 4,
    frame1: "/photo-frames/frame-4.svg",
    frame2: undefined,
    borders: ["#3dd7ce", "#3dd7ce", "#3dd7ce", "#3dd7ce", "#3dd7ce", "#3dd7ce"],
  },
  {
    id: 5,
    frame1: "/photo-frames/frame-5.svg",
    frame2: undefined,
  },
  {
    id: 6,
    frame1: "/photo-frames/frame-6.svg",
    frame2: undefined,
  },
  {
    id: 7,
    frame1: "#fff",
    frame2: "/photo-frames/frame-7-8.svg",
  },
  {
    id: 8,
    frame1: "#000",
    frame2: "/photo-frames/frame-7-8.svg",
  },
  {
    id: 9,
    frame1: "/photo-frames/frame-9.svg",
    frame2: undefined,
  },
  {
    id: 10,
    frame1: "/photo-frames/frame-10-1.svg",
    frame2: "/photo-frames/frame-10-2.svg",
  },
  {
    id: 11,
    frame1: "/photo-frames/frame-11.svg",
    frame2: undefined,
  },
  {
    id: 12,
    frame1: "/photo-frames/frame-12.svg",
    frame2: undefined,
    bgColor: "#fff",
  },
  {
    id: 13,
    frame1: "/photo-frames/frame-12.svg",
    frame2: undefined,
    bgColor: "#000",
  },
  {
    id: 14,
    frame1: "/photo-frames/frame-14.svg",
    frame2: undefined,
  },
  {
    id: 15,
    frame1: "/photo-frames/frame-15.svg",
    frame2: undefined,
  },
  {
    id: 16,
    frame1: "/photo-frames/frame-16.svg",
    frame2: undefined,
  },
  {
    id: 17,
    frame1: "/photo-frames/frame-17.svg",
    frame2: undefined,
  },
  {
    id: 18,
    frame1: "/photo-frames/frame-18.svg",
    frame2: undefined,
  },
  {
    id: 19,
    frame1: "/photo-frames/frame-19.svg",
    frame2: undefined,
  },
  {
    id: 20,
    frame1: "/photo-frames/frame-20.svg",
    frame2: undefined,
  },
  {
    id: 21,
    frame1: "/photo-frames/frame-21.svg",
    frame2: undefined,
  },
  {
    id: 22,
    frame1: "/photo-frames/frame-22.svg",
    frame2: undefined,
  },
  {
    id: 23,
    frame1: "#fff",
    frame2: "/photo-frames/frame-23.svg",
  },
  {
    id: 24,
    frame1: "/photo-frames/frame-24.svg",
    frame2: undefined,
  },
  {
    id: 25,
    frame1: "/photo-frames/frame-25-1.svg",
    frame2: "/photo-frames/frame-25-2.svg",
  },
  {
    id: 26,
    frame1: "/photo-frames/frame-26-1.svg",
    frame2: "/photo-frames/frame-26-2.svg",
  },
  {
    id: 27,
    frame1: "#000",
    frame2: "/photo-frames/frame-27.svg",
  },
  {
    id: 28,
    frame1: "/photo-frames/frame-28-1.svg",
    frame2: "/photo-frames/frame-28-2.svg",
  },
  {
    id: 29,
    frame1: "/photo-frames/frame-29.svg",
    frame2: undefined,
  },
];

const FRAME_WIDTH = 435.81;
const FRAME_HEIGHT = 653.72;
const FRAME_PADDING_TOP = 21;
const FRAME_PADDING_SIDE = 39.62;
const IMAGE_SIZE = 172.34;
const GAP = 12.89;
const BORDER_WIDTH = 1;
const IMAGE_PADDING = 2;

type ObjectFitCoverImageProps = {
  src: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  borderColor?: string;
  fill?: string;
  quality?: "high" | "medium" | "low";
};

function ObjectFitCoverImage({
  src,
  width,
  height,
  x = 0,
  y = 0,
  borderColor,
  fill,
  quality = "high",
}: ObjectFitCoverImageProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const imageRef = React.useRef<Image>(null);
  const [image] = useImage(src, "anonymous");

  React.useEffect(() => {
    if (!image) return;

    const imgWidth = image.width;
    const imgHeight = image.height;

    const scale = Math.max(width / imgWidth, height / imgHeight);
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    const offsetX = (scaledWidth - width) / (2 * scale);
    const offsetY = (scaledHeight - height) / (2 * scale);

    setCrop({
      x: offsetX,
      y: offsetY,
      width: width / scale,
      height: height / scale,
    });
  }, [image, width, height]);

  return image ? (
    <Group>
      {borderColor && (
        <Rect
          x={x - BORDER_WIDTH}
          y={y - BORDER_WIDTH}
          width={width + BORDER_WIDTH * 2}
          height={height + BORDER_WIDTH * 2}
          stroke={borderColor}
          strokeWidth={BORDER_WIDTH}
          fill={borderColor}
        />
      )}
      <KonvaImage
        ref={imageRef}
        image={image}
        width={width - IMAGE_PADDING * 2}
        height={height - IMAGE_PADDING * 2}
        x={x + IMAGE_PADDING}
        y={y + IMAGE_PADDING}
        crop={crop}
        perfectDrawEnabled={true}
        imageSmoothingEnabled={true}
        imageSmoothingQuality={quality}
        cornerRadius={3}
        fill={fill}
      />
    </Group>
  ) : null;
}

const PhotoFrameModal = ({
  selectedImages,
  isPhotoFrameModalOpen,
  setIsPhotoFrameModalOpen,
  onClickBack,
  setSelectedImages,
}: PhotoFrameModalProps) => {
  const { allMemories, color } = React.useContext(MainPageContext);
  const [selectedPhotoFrameId, setSelectedPhotoFrameId] =
    React.useState<number>(1);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  const deviceType = useDeviceSize();
  const isLarge = deviceType === "xl" || deviceType === "lg";

  const displayScale = isLarge ? 1 : 0.6;

  const containerWidth = FRAME_WIDTH * displayScale;
  const containerHeight = FRAME_HEIGHT * displayScale;

  const stageRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const framesMap = new Map<number, FramesList>(
    frames.map((frame) => [frame.id, frame])
  );
  const selectedFrame = framesMap.get(selectedPhotoFrameId);

  const formattedImages = selectedImages
    .map(
      (id) =>
        allMemories.find((memory) => memory.id.toString() === id)?.image_url
    )
    .filter(Boolean) as string[];

  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio || 1);
  }, []);

  const handleSelectPhotoFrame = (id: number) => {
    setSelectedPhotoFrameId(id);
  };

  const handleClickDownload = () => {
    setTimeout(() => {
      try {
        const uri = stageRef.current.toDataURL({
          pixelRatio: Math.max(4, devicePixelRatio * 2),
          mimeType: "image/png",
          quality: 1,
        });

        const link = document.createElement("a");
        link.download = "photo-booth.png";
        link.href = uri;
        link.click();

        setIsPhotoFrameModalOpen(false);
        setSelectedPhotoFrameId(1);
        setSelectedImages([]);

        toast.success("Tải xuống thành công");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tạo ảnh");
        console.error("Error generating image:", error);
      }
    }, 100);
  };

  return (
    <Dialog
      open={isPhotoFrameModalOpen}
      onOpenChange={setIsPhotoFrameModalOpen}
    >
      <DialogContent
        className={cn(
          "!rounded-[32px] w-full max-xl:!max-w-[min(564px,95vw)] !max-w-[calc(564px+172.34px*0.6)] h-fit gap-0",
          "max-lg:max-w-[calc(564px*0.7)]"
        )}
        style={{
          backgroundColor: color?.secondary1 || "rgba(238, 234 , 223, 1)",
        }}
      >
        <DialogTitle
          className="text-base text-black-80 leading-none font-semibold text-center"
          style={{
            color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
          }}
        >
          Xem trước khung ảnh
        </DialogTitle>
        <DialogDescription />

        <div className="flex justify-between max-xl:flex-col max-xl:justify-normal overflow-y-auto max-h-[70vh] w-full mt-5">
          <div className="flex justify-center">
            <div
              ref={containerRef}
              className="relative"
              style={{
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                overflow: "hidden",
              }}
            >
              <Stage
                ref={stageRef}
                width={FRAME_WIDTH}
                height={FRAME_HEIGHT}
                className="flex justify-center"
                style={{
                  transform: `scale(${displayScale})`,
                  transformOrigin: "top left",
                }}
                perfectDrawEnabled={true}
              >
                <Layer>
                  {selectedFrame?.frame1?.startsWith("#") ? (
                    <Rect
                      fill={selectedFrame?.frame1}
                      x={0}
                      y={0}
                      width={FRAME_WIDTH}
                      height={FRAME_HEIGHT}
                    />
                  ) : (
                    <ObjectFitCoverImage
                      src={selectedFrame?.frame1 || ""}
                      width={FRAME_WIDTH}
                      height={FRAME_HEIGHT}
                      x={0}
                      y={0}
                      fill={selectedFrame?.bgColor || undefined}
                      quality="high"
                    />
                  )}
                </Layer>
                <Layer>
                  {formattedImages.map((src, index) => {
                    const col = index % 2;
                    const row = Math.floor(index / 2);
                    const x = FRAME_PADDING_SIDE + col * (IMAGE_SIZE + GAP);
                    const y = FRAME_PADDING_TOP + row * (IMAGE_SIZE + GAP);

                    return (
                      <ObjectFitCoverImage
                        key={index}
                        src={src || ""}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        x={x}
                        y={y}
                        borderColor={
                          selectedFrame?.borders?.[index] ?? undefined
                        }
                        quality="high"
                      />
                    );
                  })}
                </Layer>
                <Layer>
                  {selectedFrame?.frame2 && (
                    <ObjectFitCoverImage
                      src={selectedFrame.frame2}
                      width={FRAME_WIDTH}
                      height={FRAME_HEIGHT}
                      x={0}
                      y={0}
                      quality="high"
                    />
                  )}
                </Layer>
              </Stage>
            </div>
          </div>

          <div className="max-xl:mt-5">
            <Carousel
              frames={frames}
              selectedId={selectedPhotoFrameId}
              onSelect={handleSelectPhotoFrame}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <Button
            className="h-[30px] text-xs"
            style={{
              backgroundColor: color?.primary,
              color: color?.secondary3,
            }}
            onClick={onClickBack}
          >
            Quay lại
          </Button>
          <Button
            className="h-[30px] text-xs"
            style={{
              backgroundColor: color?.primary,
              color: color?.secondary3,
            }}
            onClick={handleClickDownload}
          >
            Tải xuống
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoFrameModal;
