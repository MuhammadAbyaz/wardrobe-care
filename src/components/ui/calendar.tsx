"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | Date[] | undefined) => void;
  disabled?: (date: Date) => boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  className,
  mode = "single",
  selected,
  onSelect,
  disabled,
}) => {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      disabled={disabled}
      className={cn(
        "rounded-md border p-4 shadow-sm focus-visible:outline-none",
        className
      )}
    />
  );
};
