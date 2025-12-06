"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui-components/react/checkbox-group";

import { cn } from "@/lib/utils";

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      className={
        typeof className === "function"
          ? (state) => cn("flex flex-col items-start gap-3", className(state))
          : cn("flex flex-col items-start gap-3", className)
      }
      {...props}
    />
  );
}

export { CheckboxGroup };
