"use client";

import { Button } from "@/components/Button";
import { type ReactNode } from "react";
import { Steps, StepsProvider, type StepsProps } from "./Step";

const Content = (props: { title: string; children: ReactNode }) => (
  <div className="text-center flex flex-col gap-5 justify-center items-center">
    <h1 className="text-3xl">{props.title}</h1>
    {props.children}
  </div>
);

const content: StepsProps["content"] = [
  ({ next }) => (
    <Content title="Hello yourself!">
      <p>To be honest, I don't care a lot about this website</p>
      <Button onClick={next}>I am dissapointed</Button>
    </Content>
  ),
  ({ next }) => (
    <Content title="I am sorry">
      <p>I am just a test</p>
      <Button onClick={next}>I am sorry</Button>
    </Content>
  ),
  ({ next }) => (
    <Content title="Goodbye">
      <p>Goodbye!</p>
      <Button onClick={next}>Goodbye</Button>
    </Content>
  ),
];

export default function Hello() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <StepsProvider>
        <Steps content={content} />
      </StepsProvider>
    </main>
  );
}
