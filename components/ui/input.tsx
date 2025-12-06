import React, { InputHTMLAttributes } from "react";
 
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  // Accept variant-like size values used by wrappers; forwarded as-is to the underlying input
  size?: number | "sm" | "default" | "lg";
  // Compatibility prop used by some wrappers; forwarded to DOM (no styling logic here)
  unstyled?: boolean;
}
 
const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  className = "",
  size,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs ${
        props["aria-invalid"]
          ? "border-destructive text-destructive shadow-xs shadow-destructive"
          : ""
      } ${className}`}
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  );
};

export { Input, type InputProps };