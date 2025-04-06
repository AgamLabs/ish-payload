import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import landing from "../../../../data/data";

const Section3 = () => {
  return (
    <div className="py-10 px-5 font-oxygen">
      <h1 className="text-trueGray text-4xl font-bold text-center">
        {landing.sec3.title}
      </h1>
      <Marquee pauseOnHover>
        <div className="flex gap-32 ml-32 pt-14">
          <div className="flex flex-col mx-auto">
            <div className="relative w-[270px] h-[260px] mb-3">
              <Image
                className="rounded-xl"
                src="/media/image-hero1-1.webp"
                alt="hot rolled coil Image"
                fill
              />
              {/* <p className="absolute top-5 bg-trueGray rounded-xl px-3 py-1 text-grayfortext left-5  z-10 text-sm">-13%</p> */}
            </div>
            <div>
              <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                {landing.sec3.pro1}
              </h1>
              <div className=" flex justify-between p-2">
                {/* <p className=" font-semibold"><span className=" line-through text-grayforbottomtext mr-1 font-light">$230.00</span>$200.00</p> */}
                {/* <AddCircleOutlineOutlined /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto">
            <div className="relative w-[270px] h-[260px] mb-3">
              <Image
                className="rounded-xl"
                src="/media/image-hero1-1.webp"
                alt="hot rolled sheet Image"
                fill
              />
              {/* <p className="absolute top-5 bg-trueGray rounded-xl px-3 py-1 text-grayfortext left-5  z-10 text-sm">-13%</p> */}
            </div>
            <div>
              <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                {landing.sec3.pro2}
              </h1>
              <div className=" flex justify-between p-2">
                {/* <p className=" font-semibold"><span className=" line-through text-grayforbottomtext mr-1 font-light">$230.00</span>$200.00</p>
                            <AddCircleOutlineOutlined /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto">
            <div className="relative w-[270px] h-[260px] mb-3">
              <Image
                className="rounded-xl"
                src="/media/image-hero1-1.webp"
                alt="cold rolled coil Image"
                fill
              />
              {/* <p className="absolute top-5 bg-trueGray rounded-xl px-3 py-1 text-grayfortext left-5  z-10  text-sm">-13%</p> */}
            </div>
            <div>
              <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                {landing.sec3.pro3}
              </h1>
              <div className=" flex justify-between p-2">
                {/* <p className=" font-semibold"><span className=" line-through text-grayforbottomtext mr-1 font-light">$230.00</span>$200.00</p>
                            <AddCircleOutlineOutlined /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto">
            <div className="relative w-[270px] h-[260px] mb-3">
              <Image
                className="rounded-xl"
                src="/media/image-hero1-1.webp"
                alt="cold rolled sheet Image"
                fill
              />
              {/* <p className="absolute top-5 bg-trueGray rounded-xl px-3 py-1 text-grayfortext left-5  z-10  text-sm">-13%</p> */}
            </div>
            <div>
              <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                {landing.sec3.pro4}
              </h1>
              <div className=" flex justify-between p-2">
                {/* <p className=" font-semibold"><span className=" line-through text-grayforbottomtext mr-1 font-light">$230.00</span>$200.00</p>
                            <AddCircleOutlineOutlined /> */}
              </div>
            </div>
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Section3;
