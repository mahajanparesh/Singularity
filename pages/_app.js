import '../styles/globals.css';
import { ThirdwebWeb3Provider, ThirdwebWeb3ProviderProps } from '@3rdweb/hooks';

/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */
const supportedChainId = [4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }){
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={[11155111]}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;