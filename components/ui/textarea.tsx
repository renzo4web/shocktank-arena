"use client";

import { Field as FieldPrimitive } from "@base-ui-components/react/field";
import { mergeProps } from "@base-ui-components/react/merge-props";
import type * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
};

function Textarea({
  className,
  size = "default",
  unstyled = false,
  ...props
}: TextareaProps) {
  return (
    <span
      className={
        cn(
          !unstyled &&
            // Fizzy-style textarea: clean borders, smooth focus
            "relative inline-flex w-full rounded-xl border border-input bg-background text-base transition-all duration-100 ease-out has-focus-visible:border-ring has-focus-visible:ring-2 has-focus-visible:ring-ring/20 has-aria-invalid:border-destructive/50 has-focus-visible:has-aria-invalid:border-destructive has-focus-visible:has-aria-invalid:ring-destructive/20 has-disabled:opacity-50 has-disabled:cursor-not-allowed sm:text-sm dark:bg-card dark:border-border/60",
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps) => (
          <textarea
            className={cn(
              // Fizzy-style textarea inner: comfortable padding
              "field-sizing-content min-h-24 w-full rounded-[inherit] bg-transparent px-3.5 py-2.5 outline-none placeholder:text-muted-foreground/60 max-sm:min-h-28",
              size === "sm" && "min-h-20 px-3 py-2 max-sm:min-h-24",
              size === "lg" && "min-h-28 px-4 py-3 max-sm:min-h-32",
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );
}

export { Textarea, type TextareaProps };
