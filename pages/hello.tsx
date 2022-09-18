import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import Alert, { AlertButton } from "../components/Alert";
import Button from "../components/Button";

const Wrapper = styled.div`
  position: absolute;
  inset: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Hello: NextPage = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  if (showMessage)
    return (
      <Alert>
        <h1>I&apos;m sorry, you deserve better!</h1>
        <p>Stay tuned until I figure this out.</p>
      </Alert>
    );

  return (
    <>
      <Alert>
        <h1>Hello yourself!</h1>
        <p>To be honest, i don&apos;t know what this website does.</p>
        <AlertButton onClick={() => setShowMessage(true)}>
          I am disappointed
        </AlertButton>
      </Alert>
    </>
  );
};

export default Hello;

(Hello as any).Layout = Wrapper;
