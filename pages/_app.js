import SocketProvider from "@/context/socketprovider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
