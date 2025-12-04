import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Fizzy-inspired base: smooth transitions, brightness hover effects
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border bg-clip-padding font-medium text-sm outline-none transition-all duration-100 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default:
          "min-h-9 px-4 py-2",
        icon: "size-9",
        "icon-lg": "size-10",
        "icon-sm": "size-8",
        "icon-xl": "size-11 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-7 rounded-lg before:rounded-[calc(var(--radius-lg)-1px)]",
        lg: "min-h-10 px-5 py-2.5 text-base",
        sm: "min-h-8 gap-1.5 px-3 py-1.5",
        xl: "min-h-11 px-6 py-3 text-base [&_svg:not([class*='size-'])]:size-5",
        xs: "min-h-7 gap-1 rounded-lg px-2.5 py-1 text-xs before:rounded-[calc(var(--radius-lg)-1px)] [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        // Fizzy-style: brightness filter on hover instead of opacity changes
        default:
          "border-primary bg-primary text-primary-foreground shadow-sm hover:brightness-110 active:brightness-95 active:scale-[0.98] [&:is(:disabled,:active,[data-pressed])]:shadow-none",
        destructive:
          "border-destructive bg-destructive text-white shadow-sm hover:brightness-110 active:brightness-95 active:scale-[0.98] [&:is(:disabled,:active,[data-pressed])]:shadow-none",
        "destructive-outline":
          "border-destructive/30 bg-transparent text-destructive-foreground hover:bg-destructive/8 hover:border-destructive/50 active:bg-destructive/12 dark:border-destructive/40 dark:hover:bg-destructive/16",
        ghost: "border-transparent hover:bg-accent/80 active:bg-accent data-pressed:bg-accent",
        link: "border-transparent underline-offset-4 hover:underline hover:opacity-80",
        outline:
          "border-border bg-background shadow-sm hover:bg-accent/50 hover:border-border/80 active:bg-accent/70 dark:bg-card dark:hover:bg-accent/30",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground shadow-sm hover:brightness-95 active:brightness-90 data-pressed:brightness-90",
        // Fizzy-inspired positive variant (green)
        positive:
          "border-success bg-success text-white shadow-sm hover:brightness-110 active:brightness-95 active:scale-[0.98]",
      },
    },
  },
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(buttonVariants({ className, size, variant })),
    "data-slot": "button",
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export { Button, buttonVariants };
