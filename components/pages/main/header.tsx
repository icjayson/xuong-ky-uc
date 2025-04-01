"use client";

import BurgerIcon from "@/components/icons/burger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import React from "react";
import ShareModal from "./share-modal";
import Sidebar from "./sidebar";
import { MainPageContext } from "@/contexts/contexts";

type HeaderProps = {
  forceEditMode?: boolean;
  className?: string;
  isMainPage?: boolean;
};

const Header = ({
  forceEditMode = false,
  className,
  isMainPage = false
}: HeaderProps) => {
  const pathname = usePathname();
  const isEditMode = pathname.split("/").includes("edit") || forceEditMode;
  const [isSharingModalOpen, setIsSharingModalOpen] = React.useState(false);
  const { color } = React.useContext(MainPageContext);

  return (
    <header
      className={cn(
        "flex justify-between items-center h-[98px] border-b border-[rgba(0,0,0,0.2)] px-9 sticky top-0 bg-background z-50",
        "max-sm:px-3 max-sm:h-[74px]",
        className
      )}
      style={{
        backgroundColor: isMainPage ? color?.primary : undefined
      }}
    >
      <div
        className={cn(
          "flex items-center gap-11",
          "max-sm:flex-row-reverse max-sm:w-1/2 max-sm:justify-between"
        )}
      >
        <Avatar
          className={cn("w-[50px] h-[50px]", "max-sm:w-[40px] max-sm:h-[40px]")}
        >
          <AvatarImage src="/logo.png" />
          <AvatarFallback>XKU</AvatarFallback>
        </Avatar>

        {isEditMode && (
          <Drawer direction="left">
            <DrawerTrigger>
              <BurgerIcon />
            </DrawerTrigger>
            <DrawerContent className={cn("!w-[256px] p-6", "max-sm:!w-full")}>
              <DialogTitle />
              <DialogDescription />

              <div className="flex flex-col h-full">
                <div
                  className={cn(
                    "flex items-center gap-11 px-3",
                    "max-sm:flex-row-reverse max-sm:justify-between"
                  )}
                >
                  <Avatar
                    className={cn(
                      "w-[50px] h-[50px]",
                      "max-sm:w-[40px] max-sm:h-[40px]"
                    )}
                  >
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>XKU</AvatarFallback>
                  </Avatar>

                  <DrawerClose>
                    <BurgerIcon />
                  </DrawerClose>
                </div>

                <div className="text-xl font-semibold text-black mt-4 mb-2 px-3">
                  Khám phá
                </div>

                <Sidebar />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {isEditMode && (
        <>
          <Button
            variant="primary"
            onClick={() => setIsSharingModalOpen(true)}
            style={{
              backgroundColor: isMainPage ? color?.secondary1 : undefined
            }}
          >
            Chia sẻ
          </Button>

          <ShareModal
            isSharingModalOpen={isSharingModalOpen}
            setIsSharingModalOpen={setIsSharingModalOpen}
          />
        </>
      )}
    </header>
  );
};

export default Header;
