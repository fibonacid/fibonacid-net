"use client";

import { ButtonLink } from "@/components/Button";
import { Content } from "@/components/Content";
import { Links } from "./Links";

export default function Hello2() {
  return (
    <div className="flex items-center flex-col">
      <Content title="Ok, here they are:">
        <Links />
      </Content>
      <ButtonLink
        href="/"
        variant="link"
        className="absolute bottom-10 md:bottom-5 text-center"
      >
        Restart this amazing journey
      </ButtonLink>
    </div>
  );
}
