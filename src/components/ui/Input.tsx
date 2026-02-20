import React, { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            clsx(
              "block w-full rounded-md border border-gray-700 bg-surface px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition sm:text-sm",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };