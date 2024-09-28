import type { ElementType } from "react";

export type PolymorphicProps<E extends React.ElementType> =
  React.PropsWithChildren<
    React.ComponentPropsWithoutRef<E> & {
      as?: E;
    }
  >;

// Utility type to map an ElementType to the corresponding HTMLElement
export type HTMLElementFor<T extends ElementType> =
  T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
        React.HTMLAttributes<infer U>,
        any
      >
      ? U
      : never
    : never;
