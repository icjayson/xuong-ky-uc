import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  limit?: number;
};

function Textarea({ className, limit, ...props }: TextareaProps) {
  const value = props.value as string;

  return (
    <div>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-none resize-none placeholder:text-black flex field-sizing-content w-full rounded-[10px] bg-primary-50 px-3 py-2 text-xs shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        maxLength={limit}
        {...props}
      />
      {limit && (
        <div className="flex items-center justify-end text-black-80 text-[8px]">
          {value.length}/{limit}
        </div>
      )}
    </div>
  );
}

export { Textarea };
