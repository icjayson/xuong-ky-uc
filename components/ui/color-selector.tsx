"use client";

import { cn } from "@/lib/utils";
import React from "react";
import CheckedFillIcon from "../icons/checked-fill";
import { Button } from "./button";
import ColorInput from "./color-input";

export type ColorSchemeColors = {
  primary: string;
  secondary1: string;
  secondary2: string;
  secondary3: string;
  secondary4: string;
};

type ColorScheme = {
  colors: ColorSchemeColors;
  disabled?: boolean;
};

type ColorSelectorProps = {
  value?: string;
  colors?: ColorSchemeColors;
  onChange?: (id: string, colors: ColorSchemeColors) => void;
};

const INITIAL_CUSTOM_COLORS: ColorSchemeColors = {
  primary: "#000000",
  secondary1: "#000000",
  secondary2: "#000000",
  secondary3: "#000000",
  secondary4: "#000000"
};

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  "1": {
    colors: {
      primary: "#eeeadf",
      secondary1: "#cea19e",
      secondary2: "#52403f",
      secondary3: "#000000",
      secondary4: "#ffffff"
    },
    disabled: false
  },
  "2": {
    colors: {
      primary: "#ffb8e6",
      secondary1: "#ff70cd",
      secondary2: "#662d52",
      secondary3: "#000000",
      secondary4: "#ffffff"
    },
    disabled: false
  },
  "3": {
    colors: {
      primary: "#7d412c",
      secondary1: "#eeeadf",
      secondary2: "#bebbb2",
      secondary3: "#000000",
      secondary4: "#ffffff"
    },
    disabled: false
  },
  "4": {
    colors: {
      primary: "#7d412c",
      secondary1: "#eeeadf",
      secondary2: "#603222",
      secondary3: "#000000",
      secondary4: "#ffffff"
    },
    disabled: true
  },
  "5": {
    colors: {
      primary: "#7d412c",
      secondary1: "#eeeadf",
      secondary2: "#603222",
      secondary3: "#000000",
      secondary4: "#ffffff"
    },
    disabled: true
  }
};

const COLOR_NAMES: Record<keyof ColorSchemeColors, string> = {
  primary: "Màu chính",
  secondary1: "Màu phụ 1",
  secondary2: "Màu phụ 2",
  secondary3: "Màu phụ 3",
  secondary4: "Màu phụ 4"
};

const ColorSchemePreview = ({
  id,
  scheme,
  isSelected,
  onSelect
}: {
  id: string;
  scheme: ColorScheme;
  isSelected: boolean;
  onSelect: (id: string, colors: ColorSchemeColors) => void;
}) => (
  <div
    className={cn(
      "h-[100px] w-[70px] rounded-[6px] border-[0.5px] border-black overflow-hidden cursor-pointer relative",
      {
        "cursor-not-allowed opacity-25": scheme.disabled,
        "border-checked-icon": isSelected
      }
    )}
    onClick={() => !scheme.disabled && onSelect(id, scheme.colors)}
  >
    {Object.values(scheme.colors).map((color, index) => (
      <div key={index} className="h-5" style={{ backgroundColor: color }} />
    ))}
    {isSelected && (
      <div className="absolute top-1 left-1 text-checked-icon">
        <CheckedFillIcon />
      </div>
    )}
  </div>
);

const CustomColorPicker = ({
  colors,
  onColorChange
}: {
  colors: ColorSchemeColors;
  onColorChange: (key: keyof ColorSchemeColors, color: string) => void;
}) => (
  <>
    <div
      className={cn("text-base text-black-80 font-medium", "max-sm:text-xs")}
    >
      Chọn màu
    </div>
    <div className="flex flex-col gap-1">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="grid grid-cols-[100px_auto]">
          <div className={cn("text-black-80 text-xs", "max-sm:text-[8px]")}>
            {COLOR_NAMES[key as keyof ColorSchemeColors]}
          </div>
          <ColorInput
            id={key}
            value={value}
            onChange={(color) =>
              onColorChange(key as keyof ColorSchemeColors, color)
            }
          />
        </div>
      ))}
    </div>
  </>
);

const ColorSelector = ({ value, colors, onChange }: ColorSelectorProps) => {
  const [customColors, setCustomColors] = React.useState<ColorSchemeColors>(
    colors || INITIAL_CUSTOM_COLORS
  );

  const handleSelect = (id: string, colors: ColorSchemeColors) => {
    onChange?.(id, colors);
  };

  const handleCustomColorChange = (
    key: keyof ColorSchemeColors,
    color: string
  ) => {
    setCustomColors((prev) => ({ ...prev, [key]: color }));
  };

  React.useEffect(() => {
    if (value === "custom") {
      onChange?.("custom", customColors);
    }
  }, [customColors]);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] gap-5 place-items-center",
          "max-sm:gap-x-1 max-sm:gap-y-3"
        )}
      >
        {Object.entries(COLOR_SCHEMES).map(([id, scheme]) => (
          <ColorSchemePreview
            key={id}
            id={id}
            scheme={scheme}
            isSelected={value === id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <Button
        className={cn(
          "w-full text-black-80 text-xs h-7",
          "max-sm:text-[10px] max-sm:h-6"
        )}
        anomaly={value === "custom" ? null : "outline"}
        onClick={() => handleSelect("custom", customColors)}
      >
        Tự tùy chỉnh màu chủ đề theo ý bạn
      </Button>

      {value === "custom" && (
        <CustomColorPicker
          colors={customColors}
          onColorChange={handleCustomColorChange}
        />
      )}
    </div>
  );
};

export default ColorSelector;
