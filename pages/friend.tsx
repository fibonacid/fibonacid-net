import { NextPage } from "next";
import styled from "styled-components";

const friends = ["Mark", "Tom"];

const Container = styled.div`
  display: flex;
  margin: 1rem;
`;

const Friend: NextPage = () => {
  return (
    <Container>
      <ul>
        {friends.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Friend;
