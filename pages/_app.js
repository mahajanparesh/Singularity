import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */

const activeChain = Sepolia;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId="7a64d2a50312828c197a30a6db731012"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;