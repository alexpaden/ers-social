import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/social-rep/ContractData";
import ProfileBox from "~~/components/social-rep/ProfileBox";

const SocialUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="reputation.blue" description="Social Reputation by ERS.blue (Ethereum Reputation Service)">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-rows-2 flex-grow" data-theme="exampleUi">
        <ProfileBox />
        <ContractData />
      </div>
    </>
  );
};

export default SocialUI;
