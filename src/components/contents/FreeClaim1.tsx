// /src/components/contents/FreeClaim1.tsx

"use client";

// External libraries
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  canClaim,
  getNFT,
  getClaimConditionById,
  balanceOf,
} from "thirdweb/extensions/erc1155";
import {
  ClaimButton,
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

// Blockchain configurations
import { client } from "@/config/client";
import { labXpoap } from "@/config/contracts";
import { tokenMedia } from "@/config/osloid";
import { base } from "@/config/rantais";

// Components libraries
import Loader from "./ReusableLoader";

const MAX_UINT256 = 2n ** 256n - 1n;

const FreeClaim1: React.FC = () => {
  // Ensure state variables are properly declared
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCountdownString = () => {
    if (!startTime) return null;

    const totalSeconds = Math.floor(
      (startTime.getTime() - currentTime.getTime()) / 1000
    );

    if (totalSeconds <= 0) return null;

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [claimedSupply, setClaimedSupply] = useState<bigint | null>(null);
  const [maxSupply, setMaxSupply] = useState<bigint | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [erc1155Claimed, setErc1155Claimed] = useState(true);

  const [canClaimReason, setCanClaimReason] = useState<string | null>(null);
  const [pesanTunggu, setPesanTunggu] = useState<string | null>(null);
  const [pesanKirim, setPesanKirim] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [pesanGagal, setPesanGagal] = useState<string | null>(null);

  const activeAccount = useActiveAccount();

  const tokenIdString = "1";
  const tokenIdBigInt = BigInt(tokenIdString);
  const tokenIdNumber = parseInt(tokenIdString, 10);

  // Fetch Active Claim Condition
  useEffect(() => {
    async function checkActiveClaimCondition() {
      try {
        const activeClaimCondition = await getClaimConditionById({
          contract: labXpoap,
          tokenId: tokenIdBigInt,
          conditionId: 0n,
        });
        console.log("Active Claim:", activeClaimCondition);

        // Convert dan Simpan timestamp to Date
        const timestamp = Number(activeClaimCondition.startTimestamp);
        setStartTime(new Date(timestamp * 1000));

        // Simpan supply
        setClaimedSupply(activeClaimCondition.supplyClaimed);
        setMaxSupply(activeClaimCondition.maxClaimableSupply);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    checkActiveClaimCondition();
  }, [tokenIdBigInt]);

  // Fetch Claimability using "canClaim"
  useEffect(() => {
    async function checkClaimability() {
      try {
        const canClaimResult = await canClaim({
          contract: labXpoap,
          claimer: activeAccount?.address ?? "",
          quantity: 1n,
          tokenId: tokenIdBigInt,
        });

        console.log("Can Claim:", canClaimResult);

        // Check if the user can claim or not,
        setErc1155Claimed(!canClaimResult.result);
        setCanClaimReason(canClaimResult.reason || null);
      } catch (error) {
        console.error("Error:", error);
        setErc1155Claimed(true); // Assume claimed (can't claim) if an error occurs
      }
    }

    checkClaimability();
  }, [activeAccount?.address, tokenIdBigInt]);

  // Fetch NFT metadata
  const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
    contract: labXpoap,
    tokenId: tokenIdBigInt,
  });

  // Fetch user's owned NFTs
  const { data: ownedNfts } = useReadContract(balanceOf, {
    contract: labXpoap,
    owner: activeAccount?.address ?? "",
    tokenId: tokenIdBigInt,
    queryOptions: { enabled: !!activeAccount?.address && !!tokenIdString },
  });

  // Calculate price (fixed values: 0.00 for 0-22, 4.74 for 23+)
  const calculatePrice = () => {
    if (isNaN(tokenIdNumber)) return "0.00";

    return tokenIdNumber >= 23 ? "x.xx" : "0.00";
  };

  // Ensure tokenId exists
  if (!tokenIdString || isNftLoading) {
    return (
      <main className="grid gap-4 place-items-center">
        <Loader message="Loading..." />
      </main>
    );
  }

  // Configure `payModal` to accept USDC
  const payModalConfig = {
    supportedTokens: {
      [base.id]: [
        {
          address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
          name: "USD Coin",
          symbol: "USDC",
          icon: "/erc20-icons/usdc.png",
        },
      ],
    },
  };

  return (
    <main className="grid gap-4 place-items-center">
      <div className="w-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-start">
        {/* MediaRenderer (Left Column) */}
        <div className="rounded-3xl overflow-hidden w-full">
          {nft ? (
            <MediaRenderer
              client={client}
              src={nft?.metadata?.image || tokenMedia}
              alt={
                nft?.metadata?.name ? `${nft.metadata.name} NFT` : "NFT Image"
              }
              className="rounded-3xl w-full"
            />
          ) : (
            <h2 className="text-left text-sm font-medium text-icon-wording">
              No data available.
            </h2>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2 lg:gap-4 items-start justify-center h-full">
          {/* Title */}
          <h1 className="text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-hitam-judul-body">
            {nft?.metadata.name || "Collectible Name"}
          </h1>

          <div className="flex flex-row gap-2">
            <h1 className="text-left text-sm font-medium text-icon-wording">
              by
            </h1>
            <span className="text-3xl leading-6 text-icon-wording">
              &#9673;
            </span>
            <h1 className="text-left text-sm font-medium text-icon-wording">
              <Link href="https://lab-x.co/" target="_blank">
                LabX
              </Link>
            </h1>
          </div>

          {/* Description with Expand/Collapse */}
          <NFTDescription
            description={nft?.metadata.description ?? ""}
            tokenIdNumber={tokenIdNumber}
          />

          {/* Success or Error Messages */}
          {pesanTunggu && <Loader message={pesanTunggu} />}
          {pesanKirim && <Loader message={pesanKirim} />}
          {pesanSukses && <Loader message={pesanSukses} />}
          {pesanGagal && <Loader message={pesanGagal} />}

          {/* NFT Info */}
          <div className="w-full grid grid-cols-3">
            <h2 className="text-left text-sm font-medium text-icon-wording">
              Price
            </h2>
            <h2 className="text-left text-sm font-medium text-icon-wording">
              Edition
            </h2>
            <h2 className="text-left text-sm font-medium text-icon-wording">
              Owned
            </h2>

            <h2 className="text-left text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-hitam-judul-body">
              ${calculatePrice()}
            </h2>
            <h2 className="text-left text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-hitam-judul-body">
              {claimedSupply !== null && maxSupply !== null ? (
                <>
                  {claimedSupply.toString()}
                    <span className="px-1">/</span>
                    {maxSupply === MAX_UINT256 ? (
                    <span className="text-infinity">&#8734;</span>
                  ) : (
                    maxSupply.toString()
                  )}
                </>
              ) : (
                "Loading..."
              )}
            </h2>
            <h2 className="text-left text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-hitam-judul-body">
              {ownedNfts ? ownedNfts.toString() : "0"}
            </h2>
          </div>

          {/* Claim Button */}
          <ClaimButton
            unstyled
            className={`w-full rounded-lg p-2 text-base font-semibold transition-colors duration-300 ease-in-out
              ${
                isProcessing || erc1155Claimed
                  ? "border-2 border-solid border-border-tombol bg-back-ground text-hitam-judul-body"
                  : "border-2 border-solid border-back-ground text-back-ground bg-hitam-judul-body"
              }
            `}
            contractAddress={labXpoap.address}
            payModal={payModalConfig}
            chain={labXpoap.chain}
            client={client}
            claimParams={{
              type: "ERC1155",
              quantity: 1n,
              tokenId: tokenIdBigInt,
            }}
            disabled={Boolean(isProcessing || erc1155Claimed)}
            onClick={() => {
              setIsProcessing(true);
              setPesanTunggu("Processing. Be patient and wait.");
              setPesanSukses(null);
              setPesanGagal(null);
            }}
            onTransactionSent={() => {
              setPesanTunggu(null);
              setPesanKirim("Claiming your Virtual Collectible.");
            }}
            onError={(error) => {
              setIsProcessing(false);
              setPesanTunggu(null);
              setPesanKirim(null);
              setPesanGagal(`${error.message}`);
            }}
            onTransactionConfirmed={async () => {
              setIsProcessing(false);
              setPesanKirim(null);
              setPesanSukses("Successful! Virtual Collectible claimed.");
              setErc1155Claimed(true);
            }}>
            <span>
              {startTime && currentTime < startTime ? (
                <>Available in: {getCountdownString()}</>
              ) : erc1155Claimed ? (
                canClaimReason?.includes("DropClaimExceedLimit") ? (
                  "Already Claimed"
                ) : canClaimReason?.includes("DropClaimExceedMaxSupply") ? (
                  "Claim Closed"
                ) : (
                  "Already Closed"
                )
              ) : (
                "Claim Now"
              )}
            </span>
          </ClaimButton>
          <h4 className="text-left text-xs font-medium text-icon-wording">
            &#42;Maximum 1 edition per owner.
          </h4>
        </div>
      </div>
    </main>
  );
};

/** Handles NFT Description Expand/Collapse */
const NFTDescription: React.FC<{
  description: string;
  tokenIdNumber: number;
}> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const paragraphs = description
    .split("\n")
    .filter((line) => line.trim() !== "");
  const words = description.split(" ");
  const limitedText = words.slice(0, 27).join(" ");
  const limitedParagraphs = limitedText
    .split("\n")
    .filter((line) => line.trim() !== "");

  const isLongDescription = words.length > 27;

  return (
    <div className="text-left text-sm font-medium text-icon-wording">
      {isExpanded
        ? paragraphs.map((line, index) => (
            <p key={index} className="mb-4">
              {line}
            </p>
          ))
        : limitedParagraphs.map((line, index) => (
            <p key={index} className="mb-2">
              {line}
              {index === limitedParagraphs.length - 1 &&
                isLongDescription &&
                " ... "}
            </p>
          ))}
      {isLongDescription && (
        <div className="flex justify-end items-center gap-4 pt-2 mb-2">
          {/* Read More / Read Less */}
          <p
            className="text-xs font-medium text-hitam-judul-body hover:underline cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Read Less" : "Read More"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FreeClaim1;
