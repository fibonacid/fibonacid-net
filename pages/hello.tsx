import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { fadeIn } from "../lib/styles";

const Wrapper = styled.div`
  position: absolute;
  inset: 1rem;
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
  margin: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const Hello: NextPage = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  if (showMessage)
    return (
      <Container>
        <h1>I&apos;m sorry, you deserve better!</h1>
        <p>Stay tuned until I figure this out.</p>
      </Container>
    );

  return (
    <>
      <Container>
        <h1>Hello yourself!</h1>
        <p>To be honest, i don&apos;t know what this website does.</p>
        <StyledButton onClick={() => setShowMessage(true)}>
          I am disappointed
        </StyledButton>
      </Container>
    </>
  );
};

export default Hello;

(Hello as any).Layout = Wrapper;
