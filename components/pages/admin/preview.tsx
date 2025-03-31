"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import ShareModal from "../main/share-modal";
import CellphoneIcon from "@/components/icons/cellphone";
import DesktopIcon from "@/components/icons/desktop";
import { cn } from "@/lib/utils";
import ClockSection from "../preview/cellphone/clock-section";
import LoveSection from "../preview/cellphone/love-section";
import DiarySection from "../preview/cellphone/love-diary";
import { Data, Memories } from "@/app/(auth)/[userIdentity]/layout";
import { useGetCookie } from "cookies-next";
import Loading from "@/components/ui/loading";
import { ColorSchemeColors } from "@/components/ui/color-selector";

type PreviewContextType = {
  data: Data;
  memories: Memories[];
  color: ColorSchemeColors;
};

export const PreviewContext = React.createContext<PreviewContextType>({
  data: {} as Data,
  memories: [] as Memories[],
  color: {} as ColorSchemeColors
});

type PreviewProps = {
  previewData?: Data;
  previewMemories?: Memories[];
};

const Preview = ({ previewData, previewMemories }: PreviewProps) => {
  const [isSharing, setIsSharing] = React.useState(false);
  const [previewType, setPreviewType] = React.useState<"cellphone" | "desktop">(
    "cellphone"
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Data>({} as Data);
  const [memories, setMemories] = React.useState<Memories[]>([]);
  const getCookie = useGetCookie();
  const domain = getCookie("domain");
  const colorScheme = previewData?.color_scheme || data?.color_scheme;
  const color = Object.values(colorScheme || {})[0];

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
        data: previewData || data,
        memories: previewMemories || memories,
        color
      }}
    >
      <div className="flex flex-col p-9 w-full h-full">
        <div className="flex justify-end">
          <Button onClick={() => setIsSharing(true)}>Chia sẻ</Button>
          <ShareModal
            isSharingModalOpen={isSharing}
            setIsSharingModalOpen={setIsSharing}
          />
        </div>

        <div className="text-[32px] text-black-80 font-medium text-center mt-14">
          Xem trước
        </div>

        <div className="flex gap-5 mt-6 justify-center">
          <div
            className={cn("cursor-pointer p-2 rounded-full", {
              "bg-primary": previewType === "cellphone"
            })}
            onClick={() => setPreviewType("cellphone")}
          >
            <CellphoneIcon size={28} />
          </div>
          <div
            className={cn("cursor-pointer p-2 rounded-full", {
              "bg-primary": previewType === "desktop"
            })}
            onClick={() => setPreviewType("desktop")}
          >
            <DesktopIcon size={28} />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <div
            className="w-[375px] h-[812px] bg-memory-frame-background rounded-[36px] border-4 border-black overflow-y-auto py-6 flex flex-col gap-10 hide-scrollbar"
            style={{
              backgroundColor: color?.primary || undefined
            }}
          >
            <ClockSection />

            <LoveSection />

            <DiarySection />
          </div>
        </div>
      </div>
    </PreviewContext.Provider>
  );
};

export default Preview;
