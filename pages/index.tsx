import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import LoginForm from "../components/LoginForm";
import { fadeIn } from "../lib/styles";

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
  animation: ${fadeIn} 1s;
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
      <LoginForm
        password={"hello"}
        onLogin={(password) => {
          router.push("/" + password);
        }}
      />
    </Container>
  );
};

export default Home;

(Home as any).Layout = Wrapper;
