"use client";

import { Input as InputPrimitive } from "@base-ui-components/react/input";
import type * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
};

function Input({
  className,
  size = "default",
  unstyled = false,
  ...props
}: InputProps) {
  return (
    <span
      className={
        cn(
          !unstyled &&
            // Fizzy-inspired input: clean borders, smooth focus transitions
            "relative inline-flex w-full rounded-xl border border-input bg-background text-base transition-all duration-100 ease-out has-focus-visible:border-ring has-focus-visible:ring-2 has-focus-visible:ring-ring/20 has-aria-invalid:border-destructive/50 has-focus-visible:has-aria-invalid:border-destructive has-focus-visible:has-aria-invalid:ring-destructive/20 has-disabled:opacity-50 has-disabled:cursor-not-allowed sm:text-sm dark:bg-card dark:border-border/60",
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      <InputPrimitive
        className={cn(
          // Fizzy-style inner input: comfortable padding
          "w-full min-w-0 rounded-[inherit] bg-transparent px-3.5 py-2.5 outline-none placeholder:text-muted-foreground/60",
          size === "sm" && "px-3 py-2",
          size === "lg" && "px-4 py-3",
          props.type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          props.type === "file" &&
            "text-muted-foreground file:me-3 file:bg-transparent file:font-medium file:text-foreground file:text-sm file:cursor-pointer",
        )}
        data-slot="input"
        size={typeof size === "number" ? size : undefined}
        {...props}
      />
    </span>
  );
}

export { Input, type InputProps };
