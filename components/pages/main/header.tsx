import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[98px] border-b border-[rgba(0,0,0,0.2)] px-9 sticky top-0 bg-background">
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage src="/logo.png" />
        <AvatarFallback>XKU</AvatarFallback>
      </Avatar>

      <Button variant="secondary" anomaly="outline">
        Đăng nhập
      </Button>
    </header>
  );
};

export default Header;
