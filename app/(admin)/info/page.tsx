import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

const InfoPage = () => {
  const email = "admin@gmail.com";
  const currentDomain = "test";

  return (
    <div className={cn("w-full h-full flex")}>
      <div
        className={cn(
          "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10",
          "max-xl:w-full max-xl:border-none max-xl:px-6 max-xl:pt-6"
        )}
      >
        <div className={cn("text-[32px] text-black-80 font-medium")}>
          Thông tin
        </div>

        <Card infoCard className="">
          <div className="text-black-80 text-base font-medium mb-6">
            Thông tin đăng nhập
          </div>

          <div
            className={cn(
              "grid grid-cols-[0.5fr_2fr] gap-y-5",
              "max-sm:grid-cols-[1fr_2fr]"
            )}
          >
            <div className="text-black-80 text-xs flex items-center">
              Tài khoản:
            </div>
            <div className="text-black-80 text-xs">{email}</div>

            <div className="text-black-80 text-xs flex items-center">
              Mật khẩu:
            </div>
            <div className="text-black-80 text-xs">
              <Input
                variant="secondary"
                type="password"
                iconSize={12}
                className="max-sm:!text-xs px-2"
                iconClassName="text-info-icon"
                placeholder="Mật khẩu"
              />
            </div>
          </div>

          <div className="flex justify-end text-xs text-black-80 underline mt-2">
            Đổi mật khẩu
          </div>
        </Card>

        <Card infoCard>
          <div className="text-black-80 text-base font-medium mb-6">Domain</div>

          <div
            className={cn(
              "grid grid-cols-[0.5fr_2fr] gap-y-5",
              "max-sm:grid-cols-[1fr_2fr]"
            )}
          >
            <div className="text-black-80 text-xs flex items-center">
              Domain của bạn:
            </div>
            <div className="text-black-80 text-xs flex items-center">
              xuongkyuc.com/
              <Input
                variant="secondary"
                type="text"
                iconSize={12}
                className="max-sm:!text-xs px-2"
                iconClassName="text-info-icon"
                placeholder="Mật khẩu"
                defaultValue={currentDomain}
              />
            </div>
          </div>

          <div className="flex justify-end text-xs text-black-80 underline mt-2">
            Đổi domain
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button className="hidden max-xl:block">Xem trước</Button>

          <Button>Lưu</Button>
        </div>
      </div>

      <div className={cn("w-1/2 max-xl:hidden")}>Preview</div>
    </div>
  );
};

export default InfoPage;
