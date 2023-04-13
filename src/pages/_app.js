import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

const activeChainId = ChainId.Fantom;

export default function App({ Component, pageProps }) {
  return (
    <GeistProvider themeType='dark'>
      <CssBaseline />
      <ThirdwebProvider activeChain={"fantom-testnet"} autoConnect={true} >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </GeistProvider>
  );
}
