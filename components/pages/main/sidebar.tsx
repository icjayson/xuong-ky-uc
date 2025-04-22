"use client";

import CommentIcon from "@/components/icons/comment";
import ExitIcon from "@/components/icons/exit";
import FileIcon from "@/components/icons/file";
import HomeIcon from "@/components/icons/home";
import InfoIcon from "@/components/icons/info";
import SettingIcon from "@/components/icons/setting";
import { cn } from "@/lib/utils";
import { useGetCookie } from "cookies-next/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type SidebarProps = {
  isCollapsed?: boolean;
  onSelect?: () => void;
};

const Sidebar = ({ isCollapsed, onSelect }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const getCookie = useGetCookie();
  const userDomain = getCookie("domain");

  const items = [
    {
      label: "Trang chủ",
      href: `/${userDomain}/edit`,
      icon: <HomeIcon />,
      isActive: pathname.includes("edit")
    },
    {
      label: "Thông tin",
      href: "/info",
      icon: <InfoIcon />,
      isActive: pathname === "/info"
    },
    {
      label: "Tùy chỉnh",
      href: "/settings",
      icon: <SettingIcon />,
      isActive: pathname === "/settings"
    },
    {
      label: "Cập nhật nhật ký",
      href: "/memory",
      icon: <FileIcon />,
      isActive: pathname === "/memory"
    },
    {
      label: "Feedback",
      href: "/feedback",
      icon: <CommentIcon />,
      isActive: pathname === "/feedback"
    }
  ];

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      router.push("/login");
    }
  };
  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            href={item.href}
            className={cn(
              "text-base text-black h-10 flex items-center rounded-lg hover:bg-white px-3 gap-4",
              {
                "bg-primary hover:bg-primary": item.isActive,
                "px-0 justify-center": isCollapsed
              }
            )}
            key={item.label}
            onClick={() => onSelect?.()}
          >
            {item.icon}
            {!isCollapsed && item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col">
        <div
          className="text-base text-black h-10 flex items-center rounded-lg hover:bg-white px-3 gap-4 cursor-pointer"
          onClick={handleLogout}
        >
          <ExitIcon />
          {!isCollapsed && "Đăng xuất"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
