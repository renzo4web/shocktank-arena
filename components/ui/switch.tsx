"use client";

import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        // Fizzy-style switch: slightly larger, smoother transitions
        "group/switch inline-flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 outline-none transition-all duration-100 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input hover:data-unchecked:bg-input/80",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          // Fizzy-style thumb: clean shadow, smooth slide
          "pointer-events-none block size-5 rounded-full bg-background shadow-md transition-all duration-100 ease-out group-active/switch:w-6 data-checked:translate-x-4 data-unchecked:translate-x-0 data-checked:group-active/switch:translate-x-3",
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
