"use client";

import { ButtonLink } from "@/components/Button";
import { Content } from "@/components/Content";

export default function Hello1() {
  return (
    <Content title="I am sorry, you deserve better!">
      <ButtonLink href="/hello/2" className="absolute bottom-10 md:static">
        Show me a few links at least
      </ButtonLink>
    </Content>
  );
}
