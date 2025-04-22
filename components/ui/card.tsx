import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

type CardProps = React.ComponentProps<"div"> & {
  noShadow?: boolean;
  diary?: boolean;
  infoCard?: boolean;
};

const cardVariants = cva("shadow-card max-md:shadow-card-small", {
  variants: {
    noShadow: {
      true: "shadow-none"
    },
    diary: {
      true: "bg-primary p-3 max-md:p-2"
    },
    infoCard: {
      true: "border-2 border-primary rounded-lg p-6 max-sm:p-4 shadow-info-card backdrop-timer max-md:shadow-info-card-small box-border"
    }
  },
  defaultVariants: {
    noShadow: false,
    diary: false,
    infoCard: false
  }
});

const Card = ({
  className,
  noShadow,
  diary,
  infoCard,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ noShadow, diary, infoCard }), className)}
      {...props}
    />
  );
};

export default Card;
