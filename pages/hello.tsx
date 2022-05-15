import type { NextPage } from "next";
import styled from "styled-components";
import { resetButton, fadeIn } from "../lib/styles";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s;
`;

const Button = styled.button`
  ${resetButton}
  color: #000;
  background: #fff;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.025);
  }
`;

const Hello: NextPage = () => {
  return (
    <Container>
      <h1>Hello yourself !</h1>
      <p>To be honest, i don&apos;t know what this website does.</p>
      <p>Stay tuned until i figure it out.</p>
      <Button onClick={() => window.alert("I'm sorry")}>
        I am disappointed
      </Button>
    </Container>
  );
};

export default Hello;

(Hello as any).Layout = Wrapper;
