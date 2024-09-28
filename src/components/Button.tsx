import { cn } from "@/utils/cn";
import type { PolymorphicProps } from "@/utils/types";
import { type ElementType } from "react";

export type ButtonProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T> & {
    // loading?: boolean;
  };

export function Button<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  const { children, className, as, ...rest } = props;
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "py-2 px-3 leading-[1.0] text-black bg-white w-max",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function ButtonLink(props: ButtonProps<"a">) {
  return <Button as="a" {...props} />;
}
