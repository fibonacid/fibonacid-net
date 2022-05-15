import type { NextPage } from "next";
import Avatar from "../components/Avatar";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10rem;
`;

const Home: NextPage = () => {
  return <StyledAvatar />;
};

export default Home;
