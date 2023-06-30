import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";
import Button from "../components/Button";

const Wrapper = styled.div`
  position: absolute;
  inset: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;

  li {
    display: block;
  }
  ${Button} {
    display: block;
  }
`;

const Hello: NextPage = () => {
  const [stage, setStage] = useState<number>(0);

  if (stage === 2)
    return (
      <Alert>
        <h1>Fine, here are the links.</h1>
        <LinkList>
          <li>
            <Button
              as="a"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/fibonacid"
              style={{
                background: "#000",
                color: "#fff",
                border: "1px solid #fff",
              }}
            >
              Github
            </Button>
          </li>
          <li>
            <Button
              as="a"
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/lorenzo-rivosecchi"
              style={{
                background: "#0B65C2",
                color: "#fff",
                border: "1px solid #fff",
              }}
            >
              LinkedIn
            </Button>
          </li>
          <li>
            <Button
              as="a"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/fibonacid"
              style={{
                background: "#1DA1F2",
                color: "#fff",
                border: "1px solid #fff",
              }}
            >
              Twitter
            </Button>
          </li>
          <li>
            <Button
              as="a"
              target="_blank"
              rel="noreferrer"
              href="https://dev.to/fibonacid"
              style={{
                background: "#000",
                color: "#fff",
                border: "1px solid #fff",
              }}
            >
              DEV
            </Button>
          </li>
        </LinkList>
      </Alert>
    );

  if (stage === 1)
    return (
      <Alert>
        <h1>I&apos;m sorry, you deserve better!</h1>
        <Button onClick={() => setStage(2)}>
          Show me a few links at least
        </Button>
      </Alert>
    );

  return (
    <>
      <Alert>
        <h1>Hello yourself!</h1>
        <p>To be honest, i don&apos;t know what this website does.</p>
        <Button onClick={() => setStage(1)}>I am disappointed</Button>
      </Alert>
    </>
  );
};

export default Hello;

(Hello as any).Layout = Wrapper;
