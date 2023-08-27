import React from "react";

export const HareIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={`${className} animate-pulse`}
      width="159"
      height="175"
      viewBox="0 0 159 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cuteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%">
            <animate attributeName="stop-color" values="#ff69b4;#add8e6;#ff69b4" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%">
            <animate attributeName="stop-color" values="#add8e6;#ff69b4;#add8e6" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <path
        d="M158.293 66.5229H149.998V83.166H141.649V74.8718H133.355V66.5229H149.998V58.2287H133.355V49.8799H125.061V83.166H116.712V91.4603H41.9002V83.166H33.5514V49.8799H25.2844V58.2287H8.61407V66.5229H25.2844V74.8718H16.9629V83.166H8.61407V66.5229H0.319824V91.4603H8.61407V99.8091H25.2844V157.978H33.5787V166.327H41.9275V174.621H116.739V166.327H125.088V157.978H133.383V99.8091H150.026V91.4603H158.32L158.293 66.5229ZM125.061 116.452H33.5514V108.103H125.061V116.452Z"
        fill="url(#cuteGradient)"
      />
      <path d="M125.061 41.5859H116.712V49.8802H125.061V41.5859Z" fill="url(#cuteGradient)" />
      <path d="M125.061 8.354H116.712V24.9425H125.061V8.354Z" fill="url(#cuteGradient)" />
      <path d="M116.712 24.9429H108.418V41.5859H116.712V24.9429Z" fill="url(#cuteGradient)" />
      <path d="M116.712 0.00537109H100.069V8.35419H116.712V0.00537109Z" fill="url(#cuteGradient)" />
      <path d="M108.418 58.2285H100.069V66.5228H108.418V58.2285Z" fill="url(#cuteGradient)" />
      <path d="M100.069 8.354H91.7745V24.9425H100.069V8.354Z" fill="url(#cuteGradient)" />
      <path d="M91.7745 24.9429H83.4802V33.2917H91.7745V24.9429Z" fill="url(#cuteGradient)" />
      <path
        d="M75.1317 83.166H83.4805V74.8718H91.7747V66.5229H66.8374V74.8718H75.1317V83.166Z"
        fill="url(#cuteGradient)"
      />
      <path d="M83.4808 33.2915H75.132V41.5858H83.4808V33.2915Z" fill="url(#cuteGradient)" />
      <path d="M75.1317 24.9429H66.8374V33.2917H75.1317V24.9429Z" fill="url(#cuteGradient)" />
      <path d="M66.8375 8.354H58.4886V24.9425H66.8375V8.354Z" fill="url(#cuteGradient)" />
      <path d="M58.4886 58.2285H50.1943V66.5228H58.4886V58.2285Z" fill="url(#cuteGradient)" />
      <path d="M58.4888 0.00537109H41.9003V8.35419H58.4888V0.00537109Z" fill="url(#cuteGradient)" />
      <path d="M50.1945 24.9429H41.9003V41.5859H50.1945V24.9429Z" fill="url(#cuteGradient)" />
      <path d="M41.8997 41.5859H33.5509V49.8802H41.8997V41.5859Z" fill="url(#cuteGradient)" />
      <path d="M41.8997 8.354H33.5509V24.9425H41.8997V8.354Z" fill="url(#cuteGradient)" />
    </svg>
  );
};

export default HareIcon;
