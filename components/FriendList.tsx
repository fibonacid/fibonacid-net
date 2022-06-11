import Link from "next/link";
import { useRouter } from "next/router";
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
`;

const Anchor = styled.a<{ $accent?: boolean }>`
  display: block;
  padding: 0.5rem 0.25rem 0.4rem 0.25rem;
  border: solid 0.5px;
  font-size: 0.75rem;
  text-align: center;

  border-color: grey;
  ${({ $accent }) => ($accent ? accent : "")}
  &:hover {
    ${accent}
  }
  transform: scale(1);
  transition: all 100ms ease-out;
`;

type Props = {
  friends: string[];
};

const FriendList: React.FC<Props> = ({ friends }) => {
  const { query } = useRouter();
  return (
    <Container>
      {friends.map((name, index) => (
        <Link key={index} href={{ query: { n: name } }} shallow passHref>
          <Anchor $accent={query.n === name}>{name}</Anchor>
        </Link>
      ))}
    </Container>
  );
};

export default FriendList;
