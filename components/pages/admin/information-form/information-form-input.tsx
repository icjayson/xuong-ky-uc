import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

type InformationFormInputProps = {
  title?: string;
  placeholder?: string;
  type?: "input" | "date" | "textarea";
  value?: string | Date;
  limit?: number;
  onChange?: (value: string | Date) => void;
};

const InformationFormInput = ({
  title,
  placeholder,
  type = "input",
  value,
  onChange,
  limit
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
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
          limit={limit}
        />
      ) : type === "date" ? (
        <DatePicker value={value as Date} onChange={onChange} />
      ) : (
        <Textarea
          placeholder={placeholder}
          className="placeholder:text-black px-2 flex-1 min-h-10 !text-xs max-w-full prevent-overflow-word"
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
          limit={limit}
        />
      )}
    </div>
  );
};

export default InformationFormInput;
