import "../styles/globals.css";
import Navbar from "../Components/Navbar/Navbar";
import AiMintsProvider from "../utils/AiMintsContext";
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <div className="global-container">
          <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content="An Donuts Protocol Ai NFT Minting website that mints nft after generating images from the start." />
      <meta name="keywords" content="Donuts Protocol Ai, NFT, Web3, App" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title> Donuts Protocol AI NFT Minting App</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AiMintsProvider>
        <div className="glass-card">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </AiMintsProvider>
    </div>
  );
}

export default MyApp;
