import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import FriendList from "../components/FriendList";
import { faker } from "@faker-js/faker";
import FriendForm from "../components/FriendForm";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

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

  const [username, setUsername] = useState<string | null>(() =>
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem("username")
  );

  return (
    <Container>
      <FriendList
        isActive={(friend) => username === friend}
        friends={username ? [...friends, username] : friends}
      />
      {!!username || (
        <FriendForm
          onComplete={(name) => {
            setUsername(name);
            window.localStorage.setItem("username", name);
          }}
        />
      )}
    </Container>
  );
};

export default Friend;
