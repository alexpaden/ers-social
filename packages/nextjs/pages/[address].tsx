import { useRouter } from "next/router";
import DiamondIcon from "../components/social-rep/assets/DiamondIcon";
import { HareIcon } from "../components/social-rep/assets/HareIcon";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/social-rep/ContractData";
import ProfileBox from "~~/components/social-rep/ProfileBox";

const SocialUI: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  if (typeof address !== "string") {
    return <div>Loading or invalid address...</div>;
  }

  return (
    <>
      <MetaHeader title="reputation.blue" description="Social Reputation by ERS.blue (Ethereum Reputation Service)">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid flex-grow" data-theme="exampleUi" style={{ background: "transparent" }}>
        <DiamondIcon className="absolute top-32 left-0 z-0" />
        <HareIcon className="absolute right-0 bottom-24" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
        >
          <ProfileBox address={address} />
          <ContractData address={address} />
        </div>
      </div>
    </>
  );
};

export default SocialUI;
