import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import FriendList from "../components/FriendList";
import { faker } from "@faker-js/faker";

const Container = styled.div`
  display: flex;
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
  return (
    <Container>
      <FriendList friends={friends} />
    </Container>
  );
};

export default Friend;
