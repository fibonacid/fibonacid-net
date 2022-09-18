import type { NextPage } from "next";
import Alert from "../../../components/Alert";
import styled from "styled-components";

const options = ["a blog", "a forum", "a petition", "an app"];

const Heading = styled.h1`
  display: flex;
  gap: 0.5em;

  & > div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

const Options: NextPage = () => {
  return (
    <Alert>
      <Heading>
        It&apos;s{" "}
        <div>
          {options.map((option, index) => (
            <span key={index}>{option}</span>
          ))}
        </div>
      </Heading>
    </Alert>
  );
};

export default Options;
