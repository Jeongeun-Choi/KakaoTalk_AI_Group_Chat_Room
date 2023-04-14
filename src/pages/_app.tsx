import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globalStyle.css";

const colors = {
  pink: {
    "100": "#F5EBEB",
    "300": "#E4D0D0",
    "500": "#D5B4B4",
    "700": "#867070",
  },
};

export const theme = extendTheme({ colors });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
