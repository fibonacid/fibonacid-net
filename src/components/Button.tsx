import { cn } from "@/utils/cn";
import type { PolymorphicProps } from "@/utils/types";
import Link from "next/link";
import { type ElementType } from "react";

export type ButtonProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T> & {
    variant?: "filled" | "outlined" | "link";
  };

export function Button<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  const { children, className, as, variant = "filled", ...rest } = props;
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "py-2 px-3 leading-[1.0] w-max border-white/50 rounded-sm",
        variant === "filled" && "border bg-white text-black",
        variant === "outlined" && "border",
        variant === "link" &&
          "text-white hover:text-opacity-100 text-opacity-80",
        className,
      )}
      {...rest}
    >
      <div className="pt-[2px]">{children}</div>
    </Component>
  );
}

export function ButtonLink(props: ButtonProps<typeof Link>) {
  return <Button as={Link} {...props} />;
}

export function ButtonLinkExternal(props: ButtonProps<"a">) {
  return <Button as="a" {...props} />;
}
