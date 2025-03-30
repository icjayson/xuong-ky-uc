import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

type MemoryFormInputProps = {
  className?: string;
  title?: string;
  placeholder?: string;
  type?: "input" | "date" | "textarea";
  value?: string | Date;
  onChange?: (value: string | Date) => void;
};

const MemoryFormInput = ({
  title,
  placeholder,
  type = "input",
  value,
  onChange,
  className
}: MemoryFormInputProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-1", className)}>
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
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          className={cn("placeholder:text-black px-2 flex-1 h-full")}
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <DatePicker value={value as Date} onChange={onChange} />
      )}
    </div>
  );
};

export default MemoryFormInput;
