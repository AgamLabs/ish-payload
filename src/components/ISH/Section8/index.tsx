import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const Section8 = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
        {/* Mobile image */}
        <Image
          src="/media/section8-mobile.avif"
          alt="background image"
          fill
          className="md:hidden"
          priority
          sizes="(max-width: 768px) 100vw, 0px"
        />
        {/* Desktop image */}
        <Image
          src="/media/section8.avif"
          alt="background image"
          fill
          className="hidden md:block"
          priority
          sizes="(min-width: 768px) 100vw, 0px"
        />
      </div>
    </div>
  );
};

export default Section8;
