"use client";

import CellphoneIcon from "@/components/icons/cellphone";
import DesktopIcon from "@/components/icons/desktop";
import { Button } from "@/components/ui/button";
import { ColorSchemeColors } from "@/components/ui/color-selector";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from "@/components/ui/drawer";
import Loading from "@/components/ui/loading";
import { Data, Memories } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { useGetCookie } from "cookies-next";
import React from "react";
import ShareModal from "../main/share-modal";
import ClockSection from "../preview/cellphone/clock-section";
import DiarySection from "../preview/cellphone/love-diary";
import LoveSection from "../preview/cellphone/love-section";
import DesktopClockSection from "../preview/desktop/clock-section";
import DesktopDiarySection from "../preview/desktop/diary-section";
import DesktopLoveSection from "../preview/desktop/love-section";

type PreviewContextType = {
  data: Data;
  memories: Memories[];
  color: ColorSchemeColors;
  colorKey: string;
};

export const PreviewContext = React.createContext<PreviewContextType>({
  data: {} as Data,
  memories: [] as Memories[],
  color: {} as ColorSchemeColors,
  colorKey: ""
});

type PreviewProps = {
  previewData?: Data | undefined;
  previewMemories?: Memories[];
  isPreviewDesktop: boolean;
  setIsPreviewDesktop: (isPreviewDesktop: boolean) => void;
};

const Preview = ({
  previewData,
  previewMemories,
  isPreviewDesktop,
  setIsPreviewDesktop
}: PreviewProps) => {
  const [isSharing, setIsSharing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Data>({} as Data);
  const [memories, setMemories] = React.useState<Memories[]>([]);

  const getCookie = useGetCookie();
  const domain = getCookie("domain");
  const colorScheme = previewData?.color_scheme || data?.color_scheme;
  const color = Object.values(colorScheme || {})[0];
  const colorKey = Object.keys(colorScheme || {})[0];

  const fetchDomain = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/couple-page/domain?domain=${domain}`);
    const { data, memories } = await res.json();
    if (data) {
      setData(data);
    }

    if (memories) {
      setMemories(memories);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (!domain) return;

    fetchDomain();
  }, [domain]);

  if (isLoading) return <Loading />;

  return (
    <PreviewContext.Provider
      value={{
        data:
          JSON.stringify(previewData) !== "{}" && previewData !== undefined
            ? previewData
            : data,
        memories: previewMemories || memories,
        color,
        colorKey
      }}
    >
      <div className="sticky top-0 flex flex-col p-9">
        <div className="flex items-center justify-between">
          <div className="text-[32px] text-black-80 font-medium text-center">
            Xem trước
          </div>

          <div className="flex gap-5 justify-center">
            <div
              className={cn("cursor-pointer p-2 rounded-full", {
                "bg-primary": !isPreviewDesktop
              })}
              onClick={() => setIsPreviewDesktop(false)}
            >
              <CellphoneIcon size={28} />
            </div>
            <div
              className={cn("cursor-pointer p-2 rounded-full", {
                "bg-primary": isPreviewDesktop
              })}
              onClick={() => setIsPreviewDesktop(true)}
            >
              <DesktopIcon size={28} />
            </div>
          </div>

          <Button onClick={() => setIsSharing(true)}>Chia sẻ</Button>
          <ShareModal
            isSharingModalOpen={isSharing}
            setIsSharingModalOpen={setIsSharing}
          />
        </div>

        <div className="flex justify-center mt-6">
          <div
            // 170px is the height of the header and paddings
            className="w-[375px] h-[calc(100vh-170px)] max-h-[812px] bg-memory-frame-background rounded-[36px] border-4 border-black overflow-y-auto pt-6 flex flex-col gap-10 hide-scrollbar"
            style={{
              backgroundColor:
                colorKey !== "custom"
                  ? color?.primary
                  : color?.secondary1 || undefined
            }}
          >
            <ClockSection />

            <LoveSection />

            <DiarySection />
          </div>
        </div>
        <Drawer open={isPreviewDesktop} onOpenChange={setIsPreviewDesktop}>
          <DrawerTitle />
          <DrawerDescription />
          <DrawerContent className="h-full w-full !max-h-[100%]">
            <div
              className={cn(
                "py-24 flex flex-col gap-[200px] max-w-[1440px] mx-auto overflow-y-auto hide-scrollbar relative",
                "max-sm:py-12 max-sm:gap-10",
                "max-lg:py-16"
              )}
              style={{
                backgroundColor:
                  colorKey !== "custom"
                    ? color?.primary
                    : color?.secondary1 || undefined
              }}
            >
              <div
                className="fixed right-5 top-5 cursor-pointer"
                onClick={() => setIsPreviewDesktop(false)}
              >
                X
              </div>

              <DesktopClockSection />

              <DesktopLoveSection />

              <DesktopDiarySection />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </PreviewContext.Provider>
  );
};

export default Preview;
