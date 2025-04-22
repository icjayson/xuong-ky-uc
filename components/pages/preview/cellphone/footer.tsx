"use client";
import FacebookIcon from "@/components/icons/facebook";
import InstagramIcon from "@/components/icons/instagram";
import MailIcon from "@/components/icons/mail";
import PhoneIcon from "@/components/icons/phone";
import Tiktok from "@/components/icons/tiktok";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreviewContext } from "../../admin/preview";
import React from "react";

const Footer = () => {
  const { color } = React.useContext(PreviewContext);

  const pathname = usePathname();
  const pathnames = pathname.split("/");

  if (pathnames.includes("edit")) return null;

  return (
    <footer
      className="bg-primary"
      style={{
        backgroundColor: color?.secondary1 || undefined
      }}
    >
      <div className="py-5 px-[60px] flex justify-between items-center gap-5 max-sm:flex-col max-sm:items-start">
        <div>
          <div
            className="text-xl font-bold leading-[20px]"
            style={{
              color: color?.secondary3 || undefined
            }}
          >
            Xưởng Ký Ức
          </div>
          <div
            className="text-[18px] leading-[30px]"
            style={{
              color: color?.secondary3 || undefined
            }}
          >
            Trao tay kỷ vật. Lưu trọn kỷ niệm
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div
              className="text-black-80"
              style={{
                color: color?.secondary3 || undefined
              }}
            >
              <MailIcon />
            </div>
            <div
              className="text-black-80"
              style={{
                color: color?.secondary3 || undefined
              }}
            >
              xuongkyuc@gmail.com
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div
              className="text-black-80"
              style={{
                color: color?.secondary3 || undefined
              }}
            >
              <PhoneIcon />
            </div>
            <div
              className="text-black-80"
              style={{
                color: color?.secondary3 || undefined
              }}
            >
              012 123 12 12
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://www.facebook.com/xuongkyuc"
            className="text-black"
            target="_blank"
            style={{
              color: color?.secondary3 || undefined
            }}
          >
            <FacebookIcon />
          </Link>
          <Link
            href="https://www.instagram.com/xuongkyuc"
            className="text-black"
            target="_blank"
            style={{
              color: color?.secondary3 || undefined
            }}
          >
            <InstagramIcon />
          </Link>
          <Link
            href="https://www.tiktok.com/@xuongkyuc"
            className="text-black"
            target="_blank"
            style={{
              color: color?.secondary3 || undefined
            }}
          >
            <Tiktok />
          </Link>
        </div>
      </div>

      <div
        className="h-[69px] mx-[60px] flex justify-center items-center max-sm:mx-0 text-center max-sm:text-sm"
        style={{
          color: color?.secondary3 || undefined
        }}
      >
        Copyright &copy; {new Date().getFullYear()} xuongkyuc. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
