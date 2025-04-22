import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const FourOFourPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-10">
      <div className="flex flex-col items-center justify-center h-[50vh] w-[80vw] border border-primary shadow-info-card rounded-lg">
        <h1 className="text-[100px] font-bold text-black-80">404</h1>
        <p className="text-3xl text-center text-black-80">
          Trang không tồn tại.
        </p>

        <Button className="mt-5">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default FourOFourPage;
