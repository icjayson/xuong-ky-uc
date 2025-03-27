"use client";

import ClockForm from "@/components/pages/admin/clock-form/clock-form";
import InformationForm from "@/components/pages/admin/information-form/information-form";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClockSelector from "@/components/ui/clock-selector";
import ColorSelector, {
  ColorSchemeColors
} from "@/components/ui/color-selector";
import FontSelector from "@/components/ui/font-selector";
import FrameSelector from "@/components/ui/frame-selector";
import { cn } from "@/lib/utils";
import React from "react";

const SettingsPage = () => {
  const [selectedColorScheme, setSelectedColorScheme] = React.useState<
    Record<string, ColorSchemeColors>
  >({});
  const [selectedClock, setSelectedClock] = React.useState<number>(1);
  return (
    <div className={cn("w-full h-full flex")}>
      <div
        className={cn(
          "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10 pb-20",
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
            Chọn chủ đề
          </div>

          <div
            className={cn(
              "text-black-80 text-xl font-medium mb-3",
              "max-sm:text-xs"
            )}
          >
            Chọn bộ màu có sẵn
          </div>

          <ColorSelector
            value={Object.keys(selectedColorScheme)[0]}
            colors={Object.values(selectedColorScheme)[0]}
            onChange={(id, colors) => setSelectedColorScheme({ [id]: colors })}
          />

          <div className="h-[1px] bg-primary my-4"></div>

          <div
            className={cn(
              "text-black-80 text-xl font-medium mb-3",
              "max-sm:text-xs"
            )}
          >
            Chọn font
          </div>

          <FontSelector />
        </Card>

        <Card infoCard className="">
          <div
            className={cn(
              "text-black-80 text-2xl font-bold mb-6",
              "max-sm:text-base"
            )}
          >
            Đồng hồ
          </div>

          <div
            className={cn(
              "text-black-80 text-xl font-medium mb-3",
              "max-sm:text-xs"
            )}
          >
            Chọn mẫu:
          </div>

          <div className="mb-3">
            <ClockSelector value={selectedClock} onSelect={setSelectedClock} />
          </div>

          <ClockForm />
        </Card>

        <Card infoCard className="">
          <div
            className={cn(
              "text-black-80 text-2xl font-bold mb-6",
              "max-sm:text-base"
            )}
          >
            Ảnh đại diện
          </div>

          <div
            className={cn(
              "text-black-80 text-xl font-medium mb-3",
              "max-sm:text-xs"
            )}
          >
            Chọn mẫu khung:
          </div>

          <div className="mb-3">
            <FrameSelector />
          </div>

          <InformationForm />
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            className={cn(
              "hidden h-10 px-4 text-base",
              "max-sm:h-8 max-sm:px-2 max-sm:text-xs",
              "max-xl:block"
            )}
          >
            Xem trước
          </Button>

          <Button
            className={cn(
              "h-10 px-4 text-base",
              "max-sm:h-8 max-sm:px-2 max-sm:text-xs"
            )}
          >
            Lưu
          </Button>
        </div>
      </div>

      <div className={cn("w-1/2 max-xl:hidden")}>Preview</div>
    </div>
  );
};

export default SettingsPage;
