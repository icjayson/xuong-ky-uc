"use client";
import { cn } from "@/lib/utils";
import "../../app/globals.css";

type CrossLineProps = {
  className?: string;
};

const CrossLine = ({ className }: CrossLineProps) => {
  return <div className={cn("gradient-line", className)}></div>;
};

export default CrossLine;
