import * as React from "react";
import { Dialog as DialogBase } from "../retroui/Dialog";

export const Dialog = DialogBase;
export const DialogContent = DialogBase.Content as unknown as React.ComponentType<any>;
export const DialogHeader = DialogBase.Header as unknown as React.ComponentType<any>;
export const DialogDescription = DialogBase.Description as unknown as React.ComponentType<any>;
export const DialogTrigger = DialogBase.Trigger as unknown as React.ComponentType<any>;
export const DialogFooter = DialogBase.Footer as unknown as React.ComponentType<any>;

// Minimal title component for compatibility in places where it's visually hidden
export const DialogTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
