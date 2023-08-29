import React from "react";

export const DiamondIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={`${className} animate-pulse`}
      style={{ transform: "scaleX(-1)" }} // Add this line to flip horizontally
      width="118"
      height="162"
      viewBox="0 0 118 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%">
            <animate attributeName="stop-color" values="#ff69b4;#add8e6;#ff69b4" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%">
            <animate attributeName="stop-color" values="#add8e6;#ff69b4;#add8e6" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      {/* All the paths with updated fill */}
      <path d="M117.274 107.499H109.563V115.21H117.274V107.499Z" fill="url(#gemGradient)" />
      <path
        d="M109.563 69.146H78.8706V38.4032H86.5311V30.7426H78.8706V23.0317H-5.59664V30.7426H-13.3075V38.4032H-20.9681V46.0637H-28.6286V53.7746H-36.3395V61.4351H-44V84.467H-36.3395V76.8065H2.06388V92.178H9.72439V107.499H17.4353V122.87H25.0958V138.242H32.8067V76.8065H63.4992V92.178H55.8387V107.499H48.1278V122.87H40.4672V138.242H32.8067V145.902H25.0958V153.613H32.8067V161.274H40.4672V153.613H48.1278V145.902H55.8387V138.242H63.4992V130.581H71.2101V122.87H78.8706V115.21H86.5311V107.499H94.242V99.8385H101.903V92.178H109.563V84.467H117.274V61.4351H109.563V69.146Z"
        fill="url(#gemGradient)"
      />
      <path d="M109.563 130.581H101.902V138.242H109.563V130.581Z" fill="url(#gemGradient)" />
      <path d="M109.563 53.7744H101.902V61.4349H109.563V53.7744Z" fill="url(#gemGradient)" />
      <path d="M101.903 138.242H94.2422V145.902H101.903V138.242Z" fill="url(#gemGradient)" />
      <path d="M101.903 122.871H94.2422V130.582H101.903V122.871Z" fill="url(#gemGradient)" />
      <path d="M101.903 46.0635H94.2422V53.7744H101.903V46.0635Z" fill="url(#gemGradient)" />
      <path
        d="M94.2419 15.3711H86.531V23.0316H94.2419V30.7425H101.902V23.0316H109.563V15.3711H101.902V7.66016H94.2419V15.3711Z"
        fill="url(#gemGradient)"
      />
      <path d="M94.2419 130.581H86.531V138.242H94.2419V130.581Z" fill="url(#gemGradient)" />
      <path d="M94.2419 38.4033H86.531V46.0638H94.2419V38.4033Z" fill="url(#gemGradient)" />
      <path d="M78.8705 153.613H71.21V161.274H78.8705V153.613Z" fill="url(#gemGradient)" />
      <path d="M78.8705 0H71.21V7.66051H78.8705V0Z" fill="url(#gemGradient)" />
      <path d="M32.8072 38.4033H25.0963V46.0638H32.8072V38.4033Z" fill="url(#gemGradient)" />
      <path d="M32.8072 7.66016H25.0963V15.3711H32.8072V7.66016Z" fill="url(#gemGradient)" />
      <path d="M25.0958 138.242H17.4353V145.902H25.0958V138.242Z" fill="url(#gemGradient)" />
      <path d="M25.0958 46.0635H17.4353V53.7744H25.0958V46.0635Z" fill="url(#gemGradient)" />
      <path d="M17.4353 130.581H9.72437V138.242H17.4353V130.581Z" fill="url(#gemGradient)" />
      <path d="M17.4353 53.7744H9.72437V61.4349H17.4353V53.7744Z" fill="url(#gemGradient)" />
      <path d="M9.72423 145.902H2.06372V153.613H9.72423V145.902Z" fill="url(#gemGradient)" />
      <path d="M9.72423 122.871H2.06372V130.582H9.72423V122.871Z" fill="url(#gemGradient)" />
      <path d="M2.06353 115.21H-5.59698V122.871H2.06353V115.21Z" fill="url(#gemGradient)" />
    </svg>
  );
};

export default DiamondIcon;
