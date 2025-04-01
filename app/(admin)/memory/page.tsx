"use client";

import MemoriesList from "@/components/pages/admin/memories-list/memories-list";
import Preview from "@/components/pages/admin/preview";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import MemoryFrameSelector from "@/components/ui/memory-frame-selector";
import { MemoryContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import React from "react";

const MemoryPage = () => {
  const [memories, setMemories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/couple-page/memory");
      const { memories } = await response.json();
      setMemories(memories);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchMemories = () => {
    fetchMemories();
  };

  React.useEffect(() => {
    fetchMemories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MemoryContext.Provider value={{ refetchMemories, setIsLoading }}>
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
              Tùy chọn nhật ký
            </div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn mẫu khung:
            </div>

            <MemoryFrameSelector />
          </Card>

          <Card infoCard className="">
            <div
              className={cn(
                "text-black-80 text-2xl font-bold mb-6",
                "max-sm:text-base"
              )}
            >
              Danh sách các kỷ niệm
            </div>

            <MemoriesList memories={memories} />
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
          </div>
        </div>

        <div className={cn("w-1/2 max-xl:hidden")}>
          <Preview />
        </div>
      </div>
    </MemoryContext.Provider>
  );
};

export default MemoryPage;
