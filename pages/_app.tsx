import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "../components/Header";
import { myTheme } from "../lib/theme";

const GlobalStyle = createGlobalStyle`
  body {
    background: #252525;
    color: #E5E5E5;
  }
  a { 
    color: #E5E5E5;
    text-decoration:
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
