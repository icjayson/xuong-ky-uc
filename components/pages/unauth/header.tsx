"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header className="flex justify-between items-center h-[98px] border-b border-[rgba(0,0,0,0.2)] px-9 sticky top-0 bg-background z-50">
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage src="/logo.png" />
        <AvatarFallback>XKU</AvatarFallback>
      </Avatar>

      <Link href={isHomepage ? "/login" : "/"}>
        <Button>{isHomepage ? "Đăng nhập" : "Trang chủ"}</Button>
      </Link>
    </header>
  );
};

export default Header;
