"use client";

import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

export function DatePicker({ className, value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          className={cn(
            "bg-primary-50 w-full justify-start text-left font-normal h-5 px-2 text-xs text-black",
            className
          )}
          rootClassName="flex-1"
        >
          {value ? format(value, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-primary" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(day) => {
            onChange?.(day as Date);
          }}
          onDayClick={() => {
            setIsOpen(false);
          }}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}
