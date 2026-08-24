import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-lime text-ink hover:bg-lime-hot shadow-[0_0_0_1px_rgba(214,255,60,0.2)] hover:shadow-[0_0_32px_rgba(214,255,60,0.28)]",
        outline:
          "border border-cream/15 bg-transparent text-cream hover:border-lime/50 hover:text-lime",
        ghost: "text-cream/70 hover:text-cream hover:bg-cream/5",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        sm: "h-9 px-4 text-xs tracking-wide uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
