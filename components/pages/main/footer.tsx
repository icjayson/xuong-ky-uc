import FacebookIcon from "@/components/icons/facebook";
import InstagramIcon from "@/components/icons/instagram";
import MailIcon from "@/components/icons/mail";
import PhoneIcon from "@/components/icons/phone";
import Tiktok from "@/components/icons/tiktok";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="py-10 px-[60px] flex justify-between items-center gap-5 max-sm:flex-col max-sm:items-start">
        <div>
          <div className="text-xl font-bold leading-[30px]">Xưởng Ký Ức</div>
          <div className="text-[18px] leading-[30px]">
            Trao tay kỷ vật. Lưu trọn kỷ niệm
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="text-black-80">
              <MailIcon />
            </div>
            <div className="text-black-80">xuongkyuc@gmail.com</div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="text-black-80">
              <PhoneIcon />
            </div>
            <div className="text-black-80">012 123 12 12</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://www.facebook.com/xuongkyuc"
            className="text-black"
            target="_blank"
          >
            <FacebookIcon />
          </Link>
          <Link
            href="https://www.instagram.com/xuongkyuc"
            className="text-black"
            target="_blank"
          >
            <InstagramIcon />
          </Link>
          <Link
            href="https://www.tiktok.com/@xuongkyuc"
            className="text-black"
            target="_blank"
          >
            <Tiktok />
          </Link>
        </div>
      </div>

      <div className="h-[69px] mx-[60px] flex justify-center items-center max-sm:mx-0 text-center">
        Copyright &copy; {new Date().getFullYear()} xuongkyuc. All rights
        reserverd.
      </div>
    </footer>
  );
};

export default Footer;
