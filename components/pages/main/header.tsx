"use client";

import BurgerIcon from "@/components/icons/burger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Sidebar from "./sidebar";

const Header = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header className="flex justify-between items-center h-[98px] border-b border-[rgba(0,0,0,0.2)] px-9 sticky top-0 bg-background z-50">
      <div className="flex items-center gap-11">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="/logo.png" />
          <AvatarFallback>XKU</AvatarFallback>
        </Avatar>

        <Drawer direction="left">
          <DrawerTrigger>
            <BurgerIcon />
          </DrawerTrigger>
          <DrawerContent className="!w-[256px] p-6">
            <DialogTitle />
            <DialogDescription />

            <div className="flex flex-col h-full">
              <div className="flex items-center gap-11 px-3">
                <Avatar className="w-[50px] h-[50px]">
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
      </div>

      <Button variant="primary">Chia sẻ</Button>
    </header>
  );
};

export default Header;
