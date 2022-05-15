import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: absolute;
  inset: 0;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15rem;
`;

const StyledAvatar = styled(Avatar)`
  width: 10rem;
  margin: 0 auto;
`;

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container>
      <StyledAvatar />
      <LoginForm onLogin={() => router.push("/hello")} />
    </Container>
  );
};

export default Home;

(Home as any).Layout = Wrapper;
