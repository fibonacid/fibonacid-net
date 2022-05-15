import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import { myTheme } from "../lib/theme";
import "@fontsource/comic-mono";
import "reset-css";

const GlobalStyle = createGlobalStyle`
  html,body,#__next {
    height: 100%;
  }
  body {
    background: #252525;
    color: #E5E5E5;
    font-family: "Comic Mono";
    font-size: 0.75rem;
  }
  a { 
    color: #E5E5E5;
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
