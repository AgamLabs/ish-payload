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

      {/* Links Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-customBlue mb-3">
              QUICK LINKS
            </h2>
            <ul className="space-y-2">
              {["About", "Careers", "My WWT"].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-bluetext hover:text-customBlue transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Press */}
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-customBlue mb-3">
              PRESS
            </h2>
            <ul className="space-y-2">
              {["Location", "News", "Press Kit"].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-bluetext hover:text-customBlue transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-customBlue mb-3">
              ADDITIONAL INFO
            </h2>
            <ul className="space-y-2">
              {[
                "Privacy Policy",
                "Acceptable Use Policy",
                "Contact Us",
                "Quality",
                "Supply Management",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-bluetext hover:text-customBlue transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Section (uncomment when needed) */}
        {/*
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-8">
                <Image 
                  src="/images/companylogo1.png" 
                  alt="Company logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-sm font-medium text-bottext">
                <p>&copy; {new Date().getFullYear()} INDIA STEEL HUB - All Rights Reserved</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 md:gap-6 text-customBlue">
              {[
                { icon: <LinkedIn fontSize="large" />, name: "LinkedIn" },
                { icon: <Twitter fontSize="large" />, name: "Twitter" },
                { icon: <Facebook fontSize="large" />, name: "Facebook" },
                { icon: <YouTube fontSize="large" />, name: "YouTube" },
                { icon: <Instagram fontSize="large" />, name: "Instagram" }
              ].map((social) => (
                <Link 
                  key={social.name} 
                  href="/" 
                  className="hover:scale-110 transition-transform"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Section8;
