"use client";
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
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");

  useEffect(() => {
    const updateOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    };

    updateOrientation(); // initial check
    window.addEventListener("resize", updateOrientation);
    
    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  const mediaItems: Media[] = Array.isArray(mediaArray)
    ? mediaArray.map((item: any) => item?.media as Media).filter(Boolean)
    : media
    ? [media as Media]
    : [];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { 
      perView: 1,
      spacing: 0 
    },
    animationEnded: (s) => s.moveToIdx(s.track.details.rel, true, { duration: 800 }),
    created: (s) => {
      setInterval(() => {
        s.next();
      }, 5000);
    },
  });

  const imagesToShow =
    orientation === "portrait"
      ? mediaItems.slice(2, 4) // mobile
      : mediaItems.slice(0, 2); // desktop

  return (
    <section className="relative w-full h-full overflow-hidden">
      <div 
        ref={sliderRef} 
        className="keen-slider w-full h-full"
        style={{
          overflow: 'hidden'
        }}
      >
        {imagesToShow.length > 0 ? (
          imagesToShow.map((img, i) => (
            <div key={i} className="keen-slider__slide relative w-full h-full flex-shrink-0" style={{ flex: '0 0 100%', minWidth: '100%' }}>
              <img
                className="object-cover w-full h-full"
                src={img?.url || "/media/image-hero1.webp"}
                alt={`Hero image ${i + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="keen-slider__slide relative w-full h-full flex-shrink-0" style={{ flex: '0 0 100%', minWidth: '100%' }}>
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
