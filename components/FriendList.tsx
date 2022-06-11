import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
`;

const accent = css`
  color: black;
  background-color: ${({ theme }) => theme.colors.main};
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  border-color: ${({ theme }) => theme.colors.main};
  &:nth-child(odd) {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  opacity: 1;
`;

const Anchor = styled.a<{ $accent?: boolean }>`
  display: block;
  padding: 0.5rem 0.25rem 0.4rem 0.25rem;
  border: solid 0.5px;
  font-size: 0.75rem;
  text-align: center;

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
        onMouseOver={() => {
          setTouched(true);
          setTimeout(() => setTouched(false), 3000);
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
