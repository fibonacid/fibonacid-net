import Link from "next/link";
import styled from "styled-components";

const friends = ["Mark", "Tom"];

const Container = styled.nav`
  display: grid;
`;

const Anchor = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.25rem 0.4rem 0.2rem;
  border: solid 1px;
  font-size: 0.75rem;
  text-align: center;
  border-color: ${({ theme }) => theme.colors.main};
  &:nth-child(odd) {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  &:hover {
    color: black;
    background-color: ${({ theme }) => theme.colors.main};
    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Friend: React.FC = () => {
  return (
    <Container>
      {friends.map((name, index) => (
        <Link key={index} href={{ query: { n: name } }} shallow passHref>
          <Anchor>{name}</Anchor>
        </Link>
      ))}
    </Container>
  );
};

export default Friend;
