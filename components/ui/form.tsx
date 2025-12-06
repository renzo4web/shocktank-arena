"use client";

import { Form as FormPrimitive } from "@base-ui-components/react/form";

import { cn } from "@/lib/utils";

function Form({ className, ...props }: FormPrimitive.Props) {
  return (
    <FormPrimitive
      className={
        typeof className === "function"
          ? (state) => cn("flex w-full flex-col gap-4", className(state))
          : cn("flex w-full flex-col gap-4", className)
      }
      data-slot="form"
      {...props}
    />
  );
}

export { Form };
