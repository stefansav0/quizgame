// components/AdBanner.jsx
"use client";

import { useEffect } from "react";

export default function AdBanner({ dataAdSlot, dataAdFormat = "auto", responsive = "true", className = "" }) {
  useEffect(() => {
    try {
      // This tells Google AdSense to push an ad into the <ins> tag
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`overflow-hidden bg-white/5 border border-white/10 rounded-xl flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-1234567890123456" // Put your Publisher ID here!
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}