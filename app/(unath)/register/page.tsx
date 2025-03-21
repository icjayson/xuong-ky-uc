import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10">
      <div className="font-bold text-[40px] text-black-80">Đăng ký</div>
      <Image src="/logo-tach-nen.png" alt="logo" width={196} height={130} />
      <form action="" className="w-full flex flex-col gap-6">
        <Input
          type="email"
          placeholder="Gmail"
          className="w-full"
          inputSize="lg"
        />
        <Input
          type="password"
          placeholder="Mật khẩu"
          className="w-full"
          inputSize="lg"
        />
        <Input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full"
          inputSize="lg"
        />
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Mã số thẻ"
            className="w-full"
            inputSize="lg"
          />
          <i className="text-sm text-black-80 ml-4">
            Lưu ý: mỗi mã số thẻ chỉ tạo được duy nhất 1 tài khoản
          </i>
        </div>
        <Button type="submit" className="w-full rounded-[50px] h-12">
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
