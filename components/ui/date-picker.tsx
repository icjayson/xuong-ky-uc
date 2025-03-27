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
};

export function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          className={cn(
            "bg-primary-50 w-full justify-start text-left font-normal h-5 px-2 text-xs text-black",
            className
          )}
          rootClassName="flex-1"
        >
          {date ? format(date, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-primary" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
