import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-red-700 border-transparent",
      secondary: "bg-white text-black hover:bg-gray-200 border-transparent",
      outline: "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white",
      ghost: "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/10",
      danger: "bg-red-900/50 text-red-200 border-red-900 hover:bg-red-900",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
            variants[variant],
            sizes[size],
            className
          )
        )}
        {...props}
      >
        {isLoading && <FontAwesomeIcon icon={faCircleNotch} className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };