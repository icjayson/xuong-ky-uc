"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import EyeCloseIcon from "../icons/eye-close";
import { useState } from "react";
import EyeIcon from "../icons/eye";
const inputVariants = cva(
  [
    "rounded-[50px] text-black-80",
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 px-6 transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        primary: "bg-white",
        secondary: "bg-primary-50"
      },
      inputSize: {
        sm: "h-5 text-xs",
        md: "h-6 text-base",
        lg: "h-12 text-xl"
      }
    },
    defaultVariants: {
      variant: "primary",
      inputSize: "md"
    }
  }
);

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    iconSize?: number;
    iconClassName?: string;
    rootClassName?: string;
    limit?: number;
  };

function Input({
  className,
  type,
  variant,
  inputSize,
  iconSize = 32,
  iconClassName,
  rootClassName,
  limit,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const value = props.value as string;

  return (
    <div className={cn("relative", rootClassName)}>
      <input
        type={isPasswordVisible ? "text" : type}
        data-slot="input"
        className={cn(
          inputVariants({ variant, inputSize }),
          {
            "!pr-12": type === "password"
          },
          className
        )}
        maxLength={limit}
        {...props}
      />

      {limit && (
        <div className="h-full flex items-center justify-end text-black-80 text-[8px]">
          {value.length}/{limit}
        </div>
      )}

      {type === "password" && (
        <div className="absolute right-[10px] top-0 h-full flex items-center justify-center">
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className={cn("cursor-pointer", iconClassName)}
          >
            {isPasswordVisible ? (
              <EyeCloseIcon width={iconSize} height={iconSize} />
            ) : (
              <EyeIcon width={iconSize} height={iconSize} />
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export { Input };
