import { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const Main = styled.main``;

const Content = styled.div``;

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>
        <Menu />
        <Content>{children}</Content>
      </Main>
      <Footer />
    </Container>
  );
};

export default Layout;
