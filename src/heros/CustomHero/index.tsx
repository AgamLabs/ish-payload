"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import type { Page, Media } from "@/payload-types";

export const CustomHero: React.FC<Page["hero"]> = ({
  links,
  media,
  mediaArray,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  // Handle both single media and mediaArray
  const mediaItems: Media[] = Array.isArray(mediaArray)
    ? mediaArray.map((item: any) => item?.media as Media).filter(Boolean)
    : media
      ? [media as Media]
      : [];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
    animationEnded: (s) =>
      s.moveToIdx(s.track.details.rel, true, { duration: 800 }),
    created: (s) => {
      setInterval(() => {
        s.next();
      }, 5000); // auto-slide every 5s
    },
  });

  return (
    <section className="relative w-full h-full">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {mediaItems.length > 0 ? (
          mediaItems.map((img, i) => (
            <div key={i} className="keen-slider__slide relative w-full h-full">
              <img
                className="object-cover w-full h-full transition-opacity duration-1000"
                src={img?.url || "/media/image-hero1.webp"}
                alt={`Hero image ${i + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="keen-slider__slide relative w-full h-full">
            <img
              className="object-cover w-full h-full"
              src="/media/image-hero1.webp"
              alt="Fallback hero image"
            />
          </div>
        )}
      </div>
    </section>
  );
};
