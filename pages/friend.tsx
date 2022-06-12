import { faker } from "@faker-js/faker";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import FriendForm from "../components/FriendForm";
import { useUser } from "../lib/hooks";

const FriendList = dynamic(() => import("../components/FriendList"));

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
  background: #121212;
`;

const Anchor = styled.a`
  display: block;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: white;
  opacity: 0.4;
  text-decoration: underline;
`;

type Props = {
  friends: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  let friends: string[] = [];
  for (let i = 0; i < 250; i++) {
    friends.push(faker.name.firstName()?.toLowerCase());
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
      <Anchor
        target="_blank"
        rel="noreferrer"
        href="https://www.youtube.com/watch?v=XHFy3YWpRx8"
      >
        https://www.youtube.com/watch?v=XHFy3YWpRx8
      </Anchor>
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
      {showSpinner && user.name && (
        <Popup>Wait a few seconds {user.name}...</Popup>
      )}
    </Container>
  );
};

export default Friend;
