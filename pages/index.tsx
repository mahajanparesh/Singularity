import Image from "next/image";
import { Inter } from "next/font/google";
import { useWeb3 } from "@3rdweb/hooks";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";
import {useAddress, useConnect, metamaskWallet } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const metamaskConfig = metamaskWallet();

export default function Home() {

  const address = useAddress();
  const connect = useConnect();

  // const { address, connectWallet } = useWeb3();
  const welcomeUser = (userName: any, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };
  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <div className={style.wrapper}>
      {address ? (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={async () => {
              const wallet = await connect(metamaskConfig);
              console.log("connected to ", wallet);
            }}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  );
}
