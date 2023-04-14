import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const activeChainId = ChainId.Fantom;

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        className="base-page-size"
      >
        <GeistProvider themeType="dark">
          <CssBaseline />
          <ThirdwebProvider activeChain={"fantom-testnet"} autoConnect={true}>
            <Component {...pageProps} />
          </ThirdwebProvider>
        </GeistProvider>
      </motion.div>
    </AnimatePresence>
  );
}
