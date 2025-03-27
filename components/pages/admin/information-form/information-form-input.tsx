import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

type InformationFormInputProps = {
  title?: string;
  placeholder?: string;
  type?: "input" | "date";
};

const InformationFormInput = ({
  title,
  placeholder,
  type = "input"
}: InformationFormInputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className={cn("text-xs text-black-80", "max-sm:text-[10px]")}>
        {title}:
      </div>
      {type === "input" ? (
        <Input
          type="text"
          variant="secondary"
          placeholder={placeholder}
          inputSize="sm"
          className="placeholder:text-black px-2 flex-1"
          rootClassName="h-5"
        />
      ) : (
        <DatePicker />
      )}
    </div>
  );
};

export default InformationFormInput;
