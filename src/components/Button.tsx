import { cn } from "@/utils/cn";
import { forwardRef, type ComponentProps } from "react";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  function Button(props, ref) {
    const { children, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          "py-2 px-3 leading-[1.0] text-black bg-white w-max",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
