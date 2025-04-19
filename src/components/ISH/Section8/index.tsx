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
    <div>
      <div className=" relative w-full h-[250px] md:h-[400px]">
        <Image src="/media/image-post2.webp" alt="background image" fill />
      </div>
      <div className=" px-5 md:px-10 pt-20 pb-4">
        <div className=" sm:flex gap-10 md:gap-24 sm:px-10 font-roboto">
          <div className="flex justify-evenly gap-10 md:gap-24">
            <div className="flex  gap-1 flex-col text-bluetext max-sm:text-center my-5">
              <h1 className="  font-bold text-[21px] mb-1 text-customBlue">
                QUICK LINKS
              </h1>
              <Link href="/">About</Link>
              <Link href="/">Careers</Link>
              <Link href="/">My WWT</Link>
            </div>
            <div className="flex w-[137px] sm:pl-5 lg:pl-10 gap-1 flex-col text-bluetext max-sm:text-center my-5">
              <h1 className="  font-bold text-[21px] mb-1 text-customBlue">
                PRESS
              </h1>
              <Link href="/">Location</Link>
              <Link href="/">News</Link>
              <Link href="/">Press Kit</Link>
            </div>
          </div>
          <div className="flex gap-1 flex-col text-bluetext max-sm:text-center my-5">
            <h1 className="  font-bold text-[21px] mb-1 text-customBlue">
              ADDITIONAL INFO
            </h1>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Acceptable Use Policy</Link>
            <Link href="/">Contact Us</Link>
            <Link href="/">Quality</Link>
            <Link href="/">Supply Management</Link>
          </div>
        </div>
        {/* <hr className=" h-1 bg-customBlue my-2"></hr> */}
        {/* <div className="flex md:flex-row flex-col-reverse justify-between gap-5">
          <div className=" flex max-md:justify-between w-full">
            <div className=" relative w-32 h-16 mr-3">
              <Image src="/images/companylogo1.png" alt="Company logo" fill />
            </div>
            <div className=" mt-auto mb-1 text-sm font-medium text-bottext">
              <p>
                <span>&copy;</span>2024 INDIA STEEL HUB{" "}
              </p>
              <p> All Rights Reserved</p>
            </div>
          </div>
          <div className=" mt-5 mb-1 md:mt-auto text-customBlue flex w-full">
            <Link className=" mx-auto" href="/">
              <LinkedIn fontSize="large" />
            </Link>
            <Link className=" mx-auto" href="/">
              <Twitter fontSize="large" />
            </Link>
            <Link className=" mx-auto" href="/">
              <Facebook fontSize="large" />
            </Link>
            <Link className=" mx-auto" href="/">
              <YouTube fontSize="large" />
            </Link>
            <Link className=" mx-auto" href="/">
              <Instagram fontSize="large" />
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Section8;
