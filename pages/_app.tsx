import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import DefaultLayout from "../components/Layout";
import { myTheme } from "../lib/theme";
import SEO from "../components/SEO";
import "@fontsource/comic-mono";
import "reset-css";

const GlobalStyle = createGlobalStyle`
  :root {
    accent-color: black;
  }
  html,body,#__next {
    height: 100%;
  }
  body {
    background: #121212;
    color: #E5E5E5;
    font-family: "Comic Mono";
    font-size: 1rem;
    line-height: 1.2;

    color: #fff;
    text-shadow: #fff 1px 0 10px;
  }
  a { 
    color: #E5E5E5;
    text-decoration: none;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5em;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout;
  return (
    <>
      <SEO />
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
