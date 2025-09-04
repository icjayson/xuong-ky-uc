"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const shouldShowLogin = isHomepage || pathname === "/san-pham" || pathname === "/huong-dan-su-dung";

  return (
    <header className="flex flex-col md:flex-row justify-between items-center border-b border-[rgba(0,0,0,0.2)] px-9 sticky top-0 bg-background z-50 py-4 md:h-[98px]">
    {/* Dòng trên: Avatar + Button (hiện ở mọi kích thước, nhưng layout thay đổi) */}
    <div className="flex justify-between items-center w-full md:w-auto">
      <Link href="/">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="/logo.png" />
          <AvatarFallback>XKU</AvatarFallback>
        </Avatar>
      </Link>
  
      {/* Button di chuyển lên dòng trên khi ở mobile */}
      <div className="md:hidden">
        <Link href={shouldShowLogin ? "/login" : "/"}>
          <Button className="ml-4">{shouldShowLogin ? "Đăng nhập" : "Trang chủ"}</Button>
        </Link>
      </div>
    </div>
  
    {/* Dòng dưới: 3 mục menu (hiển thị mọi kích thước), button (chỉ hiển thị ở md trở lên) */}
    <nav className="flex flex-wrap gap-4 md:gap-8 items-center mt-4 md:mt-0">
      <a
        href="https://linktr.ee/xuongkyuc"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium max-md:text-[15px] hover:text-[#CEA19E] active:text-[#CEA19E] transition-colors"
      >
        Về XKU
      </a>
      <Link
        href="/san-pham"
        className="text-base font-medium max-md:text-[15px] hover:text-[#CEA19E] active:text-[#CEA19E] transition-colors"
      >
        Sản phẩm
      </Link>
      <Link
        href="/huong-dan-su-dung"
        className="text-base font-medium max-md:text-[15px] hover:text-[#CEA19E] active:text-[#CEA19E] transition-colors"
      >
        Hướng dẫn sử dụng
      </Link>
  
      {/* Button chỉ hiển thị ở md trở lên */}
      <div className="hidden md:block">
        <Link href={shouldShowLogin ? "/login" : "/"}>
          <Button>{shouldShowLogin ? "Đăng nhập" : "Trang chủ"}</Button>
        </Link>
      </div>
    </nav>
  </header>
  
  );
};

export default Header;
