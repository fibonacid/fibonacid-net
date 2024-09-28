import { ButtonLinkExternal } from "@/components/Button";
import type { ComponentProps } from "react";

export type SocialLinkProps = Omit<ComponentProps<"a">, "target" | "rel">;

export function SocialLink(props: SocialLinkProps) {
  const { children, href, ...rest } = props;
  return (
    <ButtonLinkExternal
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      {...rest}
    >
      {children}
    </ButtonLinkExternal>
  );
}

export function GHLink({ username }: { username: string }) {
  return (
    <SocialLink
      href={`https://github.com/${username}`}
      style={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      Github
    </SocialLink>
  );
}

export function LinkedInLink({ username }: { username: string }) {
  return (
    <SocialLink
      href={`https://linkedin.com/in/${username}`}
      style={{
        backgroundColor: "#0077b5",
        color: "white",
      }}
    >
      LinkedIn
    </SocialLink>
  );
}

export function TwitterLink({ username }: { username: string }) {
  return (
    <SocialLink
      href={`https://twitter.com/${username}`}
      style={{
        backgroundColor: "#1da1f2",
        color: "white",
      }}
    >
      Twitter
    </SocialLink>
  );
}

export function DevLink({ username }: { username: string }) {
  return (
    <SocialLink
      href={`https://dev.to/${username}`}
      style={{
        backgroundColor: "#0a0a0a",
        color: "white",
      }}
    >
      DEV
    </SocialLink>
  );
}

export function InstagramLink({ username }: { username: string }) {
  return (
    <SocialLink
      href={`https://instagram.com/${username}`}
      style={{
        backgroundColor: "#c13584",
        color: "white",
      }}
    >
      Instagram
    </SocialLink>
  );
}
