"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initPixel } from "@/lib/pixel";

export default function MetaPixel() {
  useEffect(() => {
    // Initialize pixel when component mounts
    initPixel();
  }, []);

  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '302412685636304');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* No-JS fallback image */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=302412685636304&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
