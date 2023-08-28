import DiamondIcon from "../components/social-rep/assets/DiamondIcon";
import { HareIcon } from "../components/social-rep/assets/HareIcon";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/social-rep/ContractData";
import ProfileBox from "~~/components/social-rep/ProfileBox";

const SocialUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="reputation.blue" description="Social Reputation by ERS.blue (Ethereum Reputation Service)">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div
        className="grid flex-grow"
        data-theme="exampleUi"
        style={{ background: "linear-gradient(to right, blue, purple)" }}
      >
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
          <ProfileBox />
          <ContractData />
        </div>
      </div>
    </>
  );
};

export default SocialUI;
