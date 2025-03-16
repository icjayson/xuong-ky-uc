"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  squareBorder?: boolean;
};

function Avatar({ className, squareBorder, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        {
          "rounded-none": squareBorder
        },
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
> & {
  squareBorder?: boolean;
};

function AvatarFallback({
  className,
  squareBorder,
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        {
          "rounded-none": squareBorder
        },
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
