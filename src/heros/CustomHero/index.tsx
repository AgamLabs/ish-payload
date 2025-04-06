"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect, useState } from "react";

import type { Page } from "@/payload-types";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { CMSLink } from "@/components/Link";
import { Media } from "@/payload-types";
import RichText from "@/components/RichText";

export const CustomHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();
  const img = media as Media;
  const imgUrl = img?.url || "/media/image-hero1-1.webp";

  useEffect(() => {
    setHeaderTheme("dark");
  });

  const categories = [
    { fn: "HOT ROLLED", n: "HR" },
    { fn: "COLD ROLLED", n: "CR" },
    { fn: "GALVANIZED", n: "GA" },
    { fn: "BAR GALVANIZED", n: "BGL" },
    { fn: "ROOFING PRODUCTS", n: "Roof" },
    { fn: "GALVANNEALED", n: "GA" },
    { fn: "ZINC-MAGNESIUM", n: "ZM" },
    { fn: "LONG PRODUCTS", n: "Long" },
  ];
  const [fromOptions, setFromOptions] = useState("");
  const [selectedcatagorie, setselectedcatageorie] = useState("HOT ROLLED");
  const router = useRouter();

  function handleclick() {
    let url = "ProductDetails/" + fromOptions;
    router.push(url);
  }

  function handlecategorie(event: any) {
    setselectedcatageorie(event.target.value);
  }

  return (
    <section>
      <div
        id="sectionone"
        className="py-48  text-center bg-cover bg-center bg-black bg-opacity-30  bg-blend-overlay text-white"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className="w-full lg:w-[800px] mx-auto  font-oxygen md:px-10 px-2">
          <div className="font-bold text-[30px] lg:text-[45px] pb-4">
            <h1>Stay Ahead of the Curve</h1>
            <h1>Dive into Real-Time Steel Prices and Market Trends Now!</h1>
          </div>
          {/* <p className=" text-rose-100 mt-2">{landing.sec1.subtitle}</p> */}
          <div className="flex w-full h-14 rounded-full border border-trueGraysub mt-8 bg-black/50 backdrop-blur-sm">
            <Box className="flex flex-col w-full "></Box>
            <button onClick={handleclick}>
              <Search className="my-auto h-11 w-11 p-1 mr-2 bg-pbtext text-white rounded-full" />
            </button>
          </div>
        </div>
      </div>
      {/* <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText className="mb-6" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...{
                        ...link,
                        reference: link.reference
                          ? {
                              ...link.reference,
                              value:
                                typeof link.reference.value === "number"
                                  ? String(link.reference.value)
                                  : link.reference.value,
                            }
                          : null,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === "object" && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority
            resource={media}
          />
        )}
      </div> */}
    </section>
  );
};
