"use client";

import { ButtonLink } from "@/components/Button";
import { Content } from "@/components/Content";

export default function Hello() {
  return (
    <Content title="Hello yourself!">
      <p>To be honest, I don&apos;t care a lot about this website</p>
      <ButtonLink href="/hello/1" className="absolute bottom-10 md:static">
        I am dissapointed
      </ButtonLink>
    </Content>
  );
}
