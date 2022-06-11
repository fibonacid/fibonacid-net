import { faker } from "@faker-js/faker";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import FriendForm from "../components/FriendForm";
import FriendList from "../components/FriendList";
import { useUser } from "../lib/hooks";

const Container = styled.div`
  margin: 1rem;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  max-width: calc(100% - 2rem);
  text-align: center;
  font-size: 1.5rem;
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
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);
  const user = useUser();

  return (
    <Container>
      <FriendList
        isActive={(friend) => user.name === friend}
        friends={user.name ? [...friends, user.name] : friends}
      />
      {user.name === null && (
        <FriendForm
          onComplete={(name) => {
            user.reset(name);
            setShowSpinner(true);
            const redirect = () => router.push("/");
            setTimeout(redirect, 1500);
          }}
        />
      )}
      {showSpinner && (
        <Popup>Wait a few seconds to see the thing, Goodbye.</Popup>
      )}
    </Container>
  );
};

export default Friend;
