
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const countryRef = useRef("Unknown");

  useEffect(() => {
    if (!pathname) return;

    const startTime = Date.now();
    const pageTitle = document.title;

    // Prevent multiple submissions for this page visit
    let hasSent = false;

    // Reuse session ID across page navigation
    let sessionId = sessionStorage.getItem("tracker_session");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("tracker_session", sessionId);
    }

    // Get country once per browser session
    const cachedCountry = sessionStorage.getItem("user_country");

    countryRef.current = cachedCountry || "Unknown";

    if (!cachedCountry) {
      fetch("https://ipapi.co/json/")
        .then((res) => {
          if (!res.ok) throw new Error("Country lookup failed");
          return res.json();
        })
        .then((data) => {
          const country = data.country_name || "Unknown";
          countryRef.current = country;
          sessionStorage.setItem("user_country", country);
        })
        .catch(() => {
          countryRef.current = "Unknown";
        });
    }

    const sendVisitData = () => {
      if (hasSent) return;

      hasSent = true;

      const timeSpent = Math.max(
        0,
        Math.round((Date.now() - startTime) / 1000)
      );

      const payload = {
        pagePath: pathname,
        pageTitle,
        timeSpent,
        country: countryRef.current,
        sessionId,
      };

      const body = JSON.stringify(payload);

      // Reliable submission on tab close or page exit
      if (typeof navigator.sendBeacon === "function") {
        const blob = new Blob([body], {
          type: "application/json",
        });

        const queued = navigator.sendBeacon(
          "/api/visit",
          blob
        );

        if (queued) return;
      }

      // Fallback for browsers without sendBeacon
      fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        keepalive: true,
      }).catch((error) => {
        console.error("Visit tracking failed:", error);
      });
    };

    window.addEventListener("pagehide", sendVisitData);

    return () => {
      window.removeEventListener("pagehide", sendVisitData);
      sendVisitData();
    };
  }, [pathname]);

  return null;
}
