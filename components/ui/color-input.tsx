"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ChromePicker } from "react-color";
import ColorPickerIcon from "../icons/color-picker";

type ColorInputProps = {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
};

const ColorInput = ({ id, value = "#000000", onChange }: ColorInputProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const stopPropagationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const stopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    };

    document.addEventListener("click", handleClickOutside);
    stopPropagationRef.current?.addEventListener("click", stopPropagation);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      stopPropagationRef.current?.removeEventListener("click", stopPropagation);
    };
  }, [isOpen]);

  return (
    <label htmlFor={id} className="max-w-[150px] flex items-center">
      <div className="relative">
        <div ref={stopPropagationRef}>
          <ChromePicker
            disableAlpha
            color={value || "#000000"}
            onChange={(color) => onChange?.(color.hex)}
            styles={{
              default: {
                body: {
                  backgroundColor: "inherit"
                }
              }
            }}
            className={cn("absolute top-0 left-0 z-2", {
              " hidden": !isOpen
            })}
          />
        </div>
        <div
          className={cn(
            "items-center grid grid-cols-[75px_auto]",
            "max-sm:grid-cols-[65px_auto]"
          )}
          onClick={() => setIsOpen(true)}
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
