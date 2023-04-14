import { ModalContextProvider } from "../src/store/modal/modalContext";
import { useModalStore } from "../src/store/store-client";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider store={useModalStore}>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;
