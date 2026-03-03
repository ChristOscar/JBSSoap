import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-inter uppercase tracking-widest text-xs transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" && "bg-[#2d3436] text-white hover:opacity-80",
          variant === "outline" &&
            "border border-[#2d3436] text-[#2d3436] hover:bg-[#2d3436] hover:text-white",
          variant === "ghost" && "text-[#2d3436] hover:text-[#6b8e23]",
          size === "sm" && "px-4 py-2 text-[0.7rem]",
          size === "md" && "px-8 py-3",
          size === "lg" && "px-10 py-4 text-sm",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
