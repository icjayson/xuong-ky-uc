import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "font-mark-pro font-normal text-base rounded-lg cursor-pointer hover:opacity-70 transition-opacity duration-300"
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-black",
        secondary: "bg-black text-white"
      },
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-4",
        lg: "h-[46px] px-4"
      },
      anomaly: {
        outline: "!bg-transparent",
        ghost: "bg-transparent border-none"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    },
    compoundVariants: [
      {
        variant: "primary",
        anomaly: "outline",
        className: "border-2 border-primary text-primary"
      },
      {
        variant: "secondary",
        anomaly: "outline",
        className: "border-2 border-black text-black"
      }
    ]
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  anomaly,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <div className="flex items-center justify-center gap-4">
      {icon && icon}

      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className, anomaly }))}
        {...props}
      />
    </div>
  );
}

export { Button, buttonVariants };
