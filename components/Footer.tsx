import styled from "styled-components";

const Container = styled.footer`
  padding: 1rem;
  font-size: 0.75rem;
  a {
    color: grey;
  }
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <a href="https://instagram.com/fibonacid">@fibonacid</a>
    </Container>
  );
};

export default Footer;
