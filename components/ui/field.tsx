"use client";

import { Field as FieldPrimitive } from "@base-ui-components/react/field";

import { cn } from "@/lib/utils";

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      className={
        typeof className === "function"
          ? (state) => cn("flex flex-col items-start gap-2", className(state))
          : cn("flex flex-col items-start gap-2", className)
      }
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={
        typeof className === "function"
          ? (state) => cn("inline-flex items-center gap-2 text-sm/4", className(state))
          : cn("inline-flex items-center gap-2 text-sm/4", className)
      }
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      className={
        typeof className === "function"
          ? (state) => cn("text-muted-foreground text-xs", className(state))
          : cn("text-muted-foreground text-xs", className)
      }
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={
        typeof className === "function"
          ? (state) => cn("text-destructive-foreground text-xs", className(state))
          : cn("text-destructive-foreground text-xs", className)
      }
      data-slot="field-error"
      {...props}
    />
  );
}

const FieldControl = FieldPrimitive.Control;
const FieldValidity = FieldPrimitive.Validity;

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldControl,
  FieldValidity,
};
