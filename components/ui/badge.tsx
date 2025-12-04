import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Fizzy-inspired badge: pill shape, smooth transitions
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-transparent font-medium outline-none transition-all duration-100 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [button,a&]:cursor-pointer [button,a&]:pointer-coarse:after:absolute [button,a&]:pointer-coarse:after:size-full [button,a&]:pointer-coarse:after:min-h-11 [button,a&]:pointer-coarse:after:min-w-11",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        sm: "px-2 py-0.5 text-[.625rem]",
      },
      variant: {
        // Fizzy-style: brightness hover effects
        default:
          "bg-primary text-primary-foreground [button,a&]:hover:brightness-110",
        destructive:
          "bg-destructive text-white [button,a&]:hover:brightness-110",
        error:
          "bg-destructive/10 text-destructive-foreground dark:bg-destructive/20",
        info: "bg-info/10 text-info-foreground dark:bg-info/20",
        outline:
          "border-border bg-transparent [button,a&]:hover:bg-accent/60 dark:border-border/60 dark:[button,a&]:hover:bg-accent/30",
        secondary:
          "bg-secondary text-secondary-foreground [button,a&]:hover:brightness-95",
        success: "bg-success/10 text-success-foreground dark:bg-success/20",
        warning: "bg-warning/10 text-warning-foreground dark:bg-warning/20",
      },
    },
  },
);

interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
}

function Badge({ className, variant, size, render, ...props }: BadgeProps) {
  const defaultProps = {
    className: cn(badgeVariants({ className, size, variant })),
    "data-slot": "badge",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export { Badge, badgeVariants };
