"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AdBanner({ placement }) {
  const [ad, setAd] = useState(null);

  const impressionTracked = useRef(false);

  useEffect(() => {
    if (!placement) return;

    async function loadAd() {
      try {
        const response = await fetch(
          `/api/ads/active?placement=${encodeURIComponent(
            placement
          )}`
        );

        const data = await response.json();

        if (data.success && data.ad) {
          setAd(data.ad);
        }
      } catch (error) {
        console.error(
          "Failed to load advertisement:",
          error
        );
      }
    }

    loadAd();
  }, [placement]);

  // ============================================================
  // TRACK IMPRESSION
  // ============================================================

  useEffect(() => {
    if (!ad?._id) return;

    if (impressionTracked.current) return;

    impressionTracked.current = true;

    fetch(`/api/ads/${ad._id}/impression`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(
        "Failed to track impression:",
        error
      );
    });
  }, [ad]);

  // ============================================================
  // TRACK CLICK
  // ============================================================

  const handleAdClick = () => {
    if (!ad?._id) return;

    try {
      fetch(`/api/ads/${ad._id}/click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
      }).catch((error) => {
        console.error(
          "Failed to track click:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Click tracking error:",
        error
      );
    }
  };

  if (!ad) return null;

  return (
    <section className="w-full py-5 sm:py-7">
      <div className="mx-auto w-full max-w-5xl px-2 sm:px-4">

        {/* Sponsored label */}

        <div className="mb-2 text-center">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Sponsored
          </span>
        </div>

        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="relative flex min-h-[120px] w-full items-center justify-center bg-gray-50 sm:min-h-[150px]">

            <Image
              src={ad.image}
              alt={ad.title}
              width={1200}
              height={300}
              className="h-auto max-h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />

          </div>
        </a>

      </div>
    </section>
  );
}