import Link from "next/link";
import { useState } from "react";
import styled, { css } from "styled-components";
import gsap from "../lib/gsap";

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
`;

const colors = [
  "rgba(255,0,0)",
  "rgba(0,255,0)",
  "rgba(0,255,255)",
  "rgba(255,255,0)",
  "cyan",
  "magenta",
];

const accent = css`
  color: black;

  ${colors.map(
    (color, index) => `
    &:nth-child(${colors.length}n + ${index}) {
      background-color: ${color};
      border-color: ${color};
    }
  `
  )}
`;

const Anchor = styled.a<{ $accent?: boolean }>`
  display: block;
  padding: 0.5rem 0.25rem 0.4rem 0.25rem;
  border: solid 0.5px;
  font-size: 0.75rem;
  text-align: center;
  user-select: none;

  color: grey;
  ${({ $accent }) => ($accent ? accent : "")}
  &:hover {
    ${accent}
  }
  transform: scale(1);
  transition: all 100ms ease-out;
`;

type Props = {
  friends: string[];
  isActive: (name: string) => boolean;
};

type ItemProps = {
  name: string;
  isActive: (name: string) => boolean;
};

const Item: React.FC<ItemProps> = ({ name, isActive }) => {
  const [touched, setTouched] = useState(false);

  return (
    <Link key={name} href={{ query: { n: name } }} shallow passHref>
      <Anchor
        as="span"
        onMouseEnter={(event: any) => {
          setTouched(true);
          setTimeout(() => setTouched(false), 3000);
          gsap.to(event.target, {
            opacity: 0.0,
            scale: 0.2,
            ease: "power3.in",
          });
        }}
        $accent={touched || isActive(name)}
      >
        {name}
      </Anchor>
    </Link>
  );
};

const FriendList: React.FC<Props> = ({ friends, isActive }) => {
  return (
    <Container>
      {friends.map((name) => (
        <Item key={name} name={name} isActive={isActive} />
      ))}
    </Container>
  );
};

export default FriendList;
