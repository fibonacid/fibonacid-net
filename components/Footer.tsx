import styled from "styled-components";

const Container = styled.footer`
  padding: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <a href="/https://instagram.com/fibonacid">@fibonacid</a>
    </Container>
  );
};

export default Footer;
