import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

type CardProps = React.ComponentProps<"div"> & {
  noShadow?: boolean;
  diary?: boolean;
};

const cardVariants = cva("shadow-card max-md:shadow-card-small", {
  variants: {
    noShadow: {
      true: "shadow-none"
    },
    diary: {
      true: "bg-primary p-3 max-md:p-2"
    }
  },
  defaultVariants: {
    noShadow: false,
    diary: false
  }
});

const Card = ({ className, noShadow, diary, ...props }: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ noShadow, diary }), className)}
      {...props}
    />
  );
};

export default Card;
