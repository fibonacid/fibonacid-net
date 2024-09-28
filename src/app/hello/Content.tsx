import type { ReactNode } from "react";

export const Content = (props: { title: string; children: ReactNode }) => (
  <div className="text-center flex flex-col gap-5 justify-center items-center">
    <h1 className="text-3xl">{props.title}</h1>
    {props.children}
  </div>
);
