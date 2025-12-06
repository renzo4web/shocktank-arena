import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(clsx(classes));
}

// Helper function to handle className props that can be either a string or a function
export function cnWithState<T>(
  baseClasses: string,
  className: string | ((state: T) => string | undefined) | undefined
) {
  return (state: T) => {
    const resolvedClassName = typeof className === 'function' ? className(state) : className;
    return cn(baseClasses, resolvedClassName);
  };
}
