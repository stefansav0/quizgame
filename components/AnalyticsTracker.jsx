"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Record the exact time the user landed on the page
    const startTime = Date.now();
    
    // 2. Generate a simple Session ID (stays the same while tab is open)
    let sessionId = sessionStorage.getItem("tracker_session");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("tracker_session", sessionId);
    }

    // 3. Get User Country (Cached so we only look it up once per session)
    const fetchCountry = async () => {
      let country = sessionStorage.getItem("user_country");
      if (!country) {
        try {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          country = data.country_name || "Unknown";
          sessionStorage.setItem("user_country", country);
        } catch (error) {
          country = "Unknown";
        }
      }
      return country;
    };

    // 4. Function to send data to our database
    const sendVisitData = async () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); // Convert to seconds
      const country = await fetchCountry();

      const payload = {
        pagePath: pathname,
        timeSpent,
        country,
        sessionId
      };

      // Use sendBeacon so the request completes even if the user closes the tab
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/visits", blob);
    };

    // 5. Trigger send on tab close or page refresh
    window.addEventListener("beforeunload", sendVisitData);

    // 6. Trigger send when they navigate to a different page within the app
    return () => {
      window.removeEventListener("beforeunload", sendVisitData);
      sendVisitData();
    };
  }, [pathname]);

  return null; // This component is invisible
}