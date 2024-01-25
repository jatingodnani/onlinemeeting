import Socketcontext from "@/context/socketprovider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return<Socketcontext>
   <Component {...pageProps} />
   </Socketcontext>
}
