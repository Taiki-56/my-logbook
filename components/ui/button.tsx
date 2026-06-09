import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-700 bg-transparent hover:bg-gray-100"
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      icon: "h-10 w-10"
    };

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
