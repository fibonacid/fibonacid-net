import { NextPage } from "next";
import styled from "styled-components";
import FriendList from "../components/FriendList";

const friends = ["Mark", "Tom"];

const Container = styled.div`
  display: flex;
  margin: 1rem;
`;

const Friend: NextPage = () => {
  return (
    <Container>
      <FriendList />
    </Container>
  );
};

export default Friend;
