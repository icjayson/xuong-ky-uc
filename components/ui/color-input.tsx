"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ColorPickerIcon from "../icons/color-picker";

type ColorInputProps = {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
};

const ColorInput = ({ id, value = "#000000", onChange }: ColorInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <label htmlFor={id} className="max-w-[150px] flex items-center">
      <div className="relative">
        <input
          type="color"
          ref={inputRef}
          className="opacity-0 absolute top-0 left-0"
          value={value || "#000000"}
          onChange={(e) => onChange?.(e.target.value)}
          id={id}
        />

        <div
          className={cn(
            "items-center grid grid-cols-[75px_auto]",
            "max-sm:grid-cols-[65px_auto]"
          )}
        >
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: value }} />

            <div className={cn("text-black-80 text-xs", "max-sm:text-[8px]")}>
              {value}
            </div>
          </div>

          <div className="text-black-80">
            <ColorPickerIcon size={12} />
          </div>
        </div>
      </div>
    </label>
  );
};

export default ColorInput;
