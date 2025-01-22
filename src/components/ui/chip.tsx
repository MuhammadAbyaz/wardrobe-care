import { cn } from "@/lib/utils";
import React from "react";

type ChipVariant =
  | "blue"
  | "purple"
  | "green"
  | "yellow"
  | "indigo"
  | "emerald"
  | "gray"
  | "teal"
  | "orange"
  | "pink";

interface ChipProps {
  variant: ChipVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  indigo: "bg-indigo-100 text-indigo-800",
  emerald: "bg-emerald-100 text-emerald-800",
  gray: "bg-gray-100 text-gray-800",
  teal: "bg-teal-50 text-teal-700",
  orange: "bg-orange-50 text-orange-700",
  pink: "bg-pink-50 text-pink-700",
};

export function Chip({ variant, children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-sm",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
