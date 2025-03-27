import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import InformationFormInput from "./information-form-input";

type InformationFormItemProps = {
  title?: string;
};

const InformationFormItem = ({ title }: InformationFormItemProps) => {
  return (
    <div>
      <div
        className={cn(
          "text-black-80 text-xl font-medium mb-3",
          "max-sm:text-xs"
        )}
      >
        {title}
      </div>

      <div className={cn("flex items-center gap-7", "max-sm:gap-2")}>
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "text-xs text-black-80 font-medium",
              "max-sm:text-[10px]"
            )}
          >
            Ảnh đại diện
          </div>
          <div
            className={cn(
              "w-[156px] h-[156px] rounded-lg bg-image-placeholder",
              "max-sm:w-[128px] max-sm:h-[128px]"
            )}
          ></div>
          <div>
            <Button className="h-6 text-[10px] px-2 rounded-[8px]">
              Tải ảnh lên
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <InformationFormInput title="Họ tên" placeholder="Họ tên" />
          <InformationFormInput title="Biệt danh" placeholder="Biệt danh" />
          <InformationFormInput
            title="Ngày sinh"
            placeholder="DD/MM/YYYY"
            type="date"
          />
          <InformationFormInput
            title="Cung hoàng đạo"
            placeholder="Đã bên nhau"
          />
          <InformationFormInput title="Khác" placeholder="Mọi thứ bạn muốn" />
        </div>
      </div>
    </div>
  );
};

export default InformationFormItem;
