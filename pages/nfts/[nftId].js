import Header from "../../components/Header";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  useContract,
  useDirectListings,
  useActiveListings,
} from "@thirdweb-dev/react";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const router = useRouter();

  const { contract } = useContract(
    "0x7603Cdeb4101bDD5b6f4C152c1EffF61bcB5bfD3",
    "marketplace-v3"
  );

  const { data: nfts, isLoading } = useDirectListings(contract);
  const selectedNftItem = nfts?.find((nft) => nft.id === router.query.nftId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Use CircularProgress from Material-UI */}
        <CircularProgress color="secondary" size={50} />
      </div>
    );
  }

  if (!selectedNftItem) {
    return <p>NFT not found</p>; // Handle case when the selected NFT is not available
  }

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNftItem} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNftItem} />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default Nft;
