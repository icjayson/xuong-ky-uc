"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FramesList } from "../pages/main/photo-frame-modal";
import { MainPageContext } from "@/contexts/contexts";

type CarouselProps = {
  frames: FramesList[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const items = [1, 2, 3, 4, 5, 6];

export function Carousel({ frames, selectedId, onSelect }: CarouselProps) {
  const { color } = React.useContext(MainPageContext);
  return (
    <div className="w-full max-w-[524px]">
      <div className="relative">
        <div
          className={cn(
            "flex flex-col overflow-y-auto max-h-[654px] custom-scrollbar pb-1",
            "max-xl:flex-row max-xl:overflow-x-auto"
          )}
        >
          {frames.map((item) => (
            <div key={item.id} className="flex-none overflow-hidden">
              <div
                className={cn(
                  "h-[215px] w-[150px] relative border-[6px] border-transparent",
                  "max-sm:h-[150px] max-sm:w-[100px]",
                  {
                    "rounded-[6px]": selectedId === item.id,
                  }
                )}
                style={{
                  borderColor:
                    selectedId === item.id ? color?.secondary2 : "transparent",
                }}
                onClick={() => onSelect(item.id)}
              >
                {item.frame1.startsWith("#") ? (
                  <div
                    className="absolute z-[1] w-full h-full"
                    style={{ backgroundColor: item.frame1 }}
                  ></div>
                ) : (
                  <Image
                    src={item.frame1}
                    alt="overlay1"
                    fill
                    className="object-cover absolute z-[1]"
                  />
                )}

                {item.frame2 ? (
                  <Image
                    src={item.frame2}
                    alt="overlay2"
                    fill
                    className="object-cover absolute z-[3]"
                  />
                ) : null}

                <div className="relative grid grid-cols-2 gap-1 z-[2] px-[13px] pt-2 pb-[30px]">
                  {items.map((miniItem, index) => (
                    <div
                      key={miniItem}
                      style={{
                        borderColor: item?.borders && item.borders?.[index],
                        borderWidth: item?.borders && "1px",
                        backgroundColor: item?.borders && item.borders?.[index],
                      }}
                    >
                      <div className="w-full aspect-square bg-frame-item rounded-xs"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
