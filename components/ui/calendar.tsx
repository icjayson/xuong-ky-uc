"use client";

import * as React from "react";
import { DayPicker, Dropdown as DropDownDayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const Dropdown = React.useCallback(
    ({
      value,
      onChange,
      options
    }: React.ComponentProps<typeof DropDownDayPicker>) => {
      const selected = options?.find((option) => option.value === value);
      const handleChange = (value: string) => {
        const changeEvent = {
          target: { value }
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(changeEvent);
      };
      return (
        <Select
          value={value?.toString()}
          onValueChange={(value) => {
            handleChange(value);
          }}
        >
          <SelectTrigger className="outline-none h-8 w-full cursor-pointer">
            <SelectValue>{selected?.label}</SelectValue>
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="center"
            className="bg-primary"
          >
            <div className="h-80 overflow-y-auto">
              {options?.map(({ value, label, disabled }, id) => (
                <SelectItem
                  key={`${value}-${id}`}
                  value={value?.toString()}
                  disabled={disabled}
                  className="cursor-pointer"
                >
                  {label}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      );
    },
    []
  );

  const _monthsClassName = cn("relative flex flex-col gap-4 sm:flex-row");
  const _monthCaptionClassName = cn(
    "relative flex h-7 items-center justify-center"
  );
  const _dropdownsClassName = cn(
    "flex items-center justify-center gap-2 w-full"
  );
  const _footerClassName = cn("pt-3 text-sm");
  const _weekdaysClassName = cn("flex");
  const _weekdayClassName = cn("w-9 text-sm font-normal text-muted-foreground");
  const _captionLabelClassName = cn("truncate text-sm font-medium");

  const _monthGridClassName = cn("mx-auto mt-4");
  const _weekClassName = cn("mt-2 flex w-max items-start");
  const _dayClassName = cn(
    "flex size-9 flex-1 items-center justify-center p-0 text-sm"
  );
  const _dayButtonClassName = cn(
    buttonVariants({ anomaly: "ghost" }),
    "size-9 rounded-md p-0 font-normal transition-none aria-selected:opacity-100"
  );

  const buttonRangeClassName =
    "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground";
  const _rangeStartClassName = cn(buttonRangeClassName, "rounded-s-md");
  const _rangeEndClassName = cn(buttonRangeClassName, "rounded-e-md");
  const _rangeMiddleClassName = cn(
    "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground"
  );
  const _selectedClassName = cn(
    "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground"
  );
  const _todayClassName = cn(
    "[&>button]:bg-accent [&>button]:text-accent-foreground"
  );
  const _outsideClassName = cn(
    "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30"
  );
  const _disabledClassName = cn("text-muted-foreground opacity-50");
  const _hiddenClassName = cn("invisible flex-1");

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      hideNavigation
      classNames={{
        caption_label: _captionLabelClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        dropdowns: _dropdownsClassName,
        footer: _footerClassName,
        month_caption: _monthCaptionClassName,
        month_grid: _monthGridClassName,
        months: _monthsClassName,
        week: _weekClassName,
        weekday: _weekdayClassName,
        weekdays: _weekdaysClassName,
        range_end: _rangeEndClassName,
        range_middle: _rangeMiddleClassName,
        range_start: _rangeStartClassName,
        selected: _selectedClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
        outside: _outsideClassName,
        today: _todayClassName,
        nav: "hidden",
        ...classNames
      }}
      components={{
        Dropdown
      }}
      captionLayout="dropdown"
      {...props}
    />
  );
}

export { Calendar };
