import type { NextPage } from "next";
import Alert from "../../components/Alert";
import styled from "styled-components";
import { useRouter } from "next/router";

const Heading = styled.h1`
  display: flex;
  gap: 0.5em;

  & > div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

const Sentence: NextPage = () => {
  const { query } = useRouter();
  const sentence = `${query.sentence}`.replace("-", " ");

  return (
    <Alert>
      <Heading>I&apos; a {sentence}</Heading>
    </Alert>
  );
};

export default Sentence;
