"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  // We use a ref so the cleanup function can instantly access the country
  const countryRef = useRef("Unknown"); 

  useEffect(() => {
    // 1. Record the exact time the user landed
    const startTime = Date.now();
    
    // 2. Generate Session ID
    let sessionId = sessionStorage.getItem("tracker_session");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("tracker_session", sessionId);
    }

    // 3. Fetch Country IMMEDIATELY on load (not on exit)
    const initCountry = async () => {
      let cachedCountry = sessionStorage.getItem("user_country");
      if (!cachedCountry) {
        try {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          cachedCountry = data.country_name || "Unknown";
          sessionStorage.setItem("user_country", cachedCountry);
        } catch (error) {
          cachedCountry = "Unknown";
        }
      }
      countryRef.current = cachedCountry;
    };
    
    initCountry();

    // 4. Send Data (Notice this is NO LONGER async!)
    const sendVisitData = () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); 

      const payload = {
        pagePath: pathname,
        timeSpent,
        country: countryRef.current, // Grab the instantly available ref
        sessionId
      };

      // 5. Use fetch with keepalive instead of sendBeacon
      fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true, // Tells the browser to finish this even if the tab closes
      }).catch((err) => console.error("Tracking failed", err));
    };

    // 6. Trigger on tab close
    window.addEventListener("beforeunload", sendVisitData);

    // 7. Trigger on Next.js page change
    return () => {
      window.removeEventListener("beforeunload", sendVisitData);
      sendVisitData();
    };
  }, [pathname]);

  return null; 
}