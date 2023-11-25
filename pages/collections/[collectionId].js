import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { client } from "../../lib/sanityClient";
import Header from "../../components/Header";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import NFTCard from "../../components/NFTCard";
import {
  useContract,
  useDirectListings,
  useActiveListings,
} from "@thirdweb-dev/react";
import CircularProgress from "@mui/material/CircularProgress";
import { data } from "autoprefixer";

const style = {
  bannerImageContainer: `h-[20vh] w-fit overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-full px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-center text-white mb-5 mt-2`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `md:text-5xl sm:text-3xl text-2xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `sm:w-[100%] md:w-[80%] lg:w-[60%] flex gap-5 justify-evenly p-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-fit`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  // console.log(router.query);
  console.log(router.query.collectionId);

  const { contract } = useContract(
    "0x7603Cdeb4101bDD5b6f4C152c1EffF61bcB5bfD3",
    "marketplace-v3"
  );

  const { data: nfts, isLoading } = useDirectListings(contract);

  console.log(nfts, "🔥🔥🔥🔥🔥🔥🔥🔥");

  // console.log(nfts);

  // console.log(collection)

  return (
    <div>
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>

        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{" "}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts?.length}</div>
              <div className={style.statName}>Items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ""}
              </div>
              <div className={style.statName}>Owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>Floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>Volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>

      {!isLoading ? (
        <div className="grid grid-cols-12 gap-5 px-5 my-11">
          {nfts.map((nftItem, id) => (
            <div
              key={id}
              className="lg:col-span-2 md:col-span-3 sm:col-span-4 col-span-12"
            >
              <NFTCard
                nftItem={nftItem}
                title={collection?.title}
                listings={nftItem}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center my-11">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Collection;
