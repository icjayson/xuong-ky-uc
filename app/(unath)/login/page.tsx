import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10">
      <div className="font-bold text-[40px] text-black-80">Đăng nhập</div>
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
        <Button type="submit" className="w-full rounded-[50px] h-12">
          Đăng nhập
        </Button>

        <div className="flex justify-between">
          <Link href="/register" className="text-black-80 text-xl">
            Tạo tài khoản
          </Link>
          <Link href="/forgot-password" className="text-black-80 text-xl">
            Quên Mật Khẩu?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
