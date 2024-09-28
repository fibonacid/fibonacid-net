"use client";

import { Button, ButtonLink } from "@/components/Button";
import { Content } from "./Content";
import { Links } from "./Links";
import { Steps, StepsProvider, type StepsProps } from "./Step";

const content: StepsProps["content"] = [
  ({ next }) => (
    <Content title="Hello yourself!">
      <p>To be honest, I don't care a lot about this website</p>
      <Button onClick={next}>I am dissapointed</Button>
    </Content>
  ),
  ({ next }) => (
    <Content title="I am sorry, you deserve better!">
      <Button onClick={next}>Show me a few links at least</Button>
    </Content>
  ),
  <Content title="Ok, here they are:">
    <Links />
    <ButtonLink href="/" variant="link" className="absolute bottom-5">
      Restart this amazing journey
    </ButtonLink>
  </Content>,
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
