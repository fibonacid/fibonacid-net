import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import FriendList from "../components/FriendList";
import { faker } from "@faker-js/faker";
import FriendForm from "../components/FriendForm";
import { useState } from "react";

const Container = styled.div`
  margin: 1rem;
`;

type Props = {
  friends: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let friends: string[] = [];
  for (let i = 0; i < 100; i++) {
    friends.push(faker.name.firstName());
  }
  return {
    props: {
      friends,
    },
    revalidate: 60,
  };
};

const Friend: NextPage<Props> = (props) => {
  const { friends } = props;
  const [newFriend, setNewFriend] = useState<string>();
  return (
    <Container>
      <FriendList friends={newFriend ? [...friends, newFriend] : friends} />
      {!!newFriend || <FriendForm onComplete={(name) => setNewFriend(name)} />}
    </Container>
  );
};

export default Friend;
