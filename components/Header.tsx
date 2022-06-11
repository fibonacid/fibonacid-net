import Link from "next/link";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
`;

const Anchor = styled.a`
  padding: 1rem;
  color: grey;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/" passHref>
        <Anchor>fibonacid.net</Anchor>
      </Link>
    </Container>
  );
};

export default Header;
