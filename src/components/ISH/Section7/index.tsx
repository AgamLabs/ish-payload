"use client";
import landing from "../../../../data/data";
import { ArrowForwardIosTwoTone, KeyboardArrowDown } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Section7 = () => {
  const [prevnum, setprevnum] = useState(false);
  const [num, setnum] = useState();

  function handleclick(e: any) {
    setprevnum(!prevnum);
    setnum(e);
  }

  useEffect(() => {
    setprevnum(true);
  }, [num]);

  return (
    <div className="px-5 py-20 flex lg:flex-row flex-col max-lg:gap-10">
      <div className="max-lg:flex md:px-10 lg:w-[80%]">
        <div>
          <h1 className="text-trueGray text-4xl font-bold max-lg:w-4/6">
            {landing.sec7.title}
          </h1>
          <p className=" text-trueGraysub mt-4 ">{landing.sec7.sub}</p>
        </div>
        {/* <div className="max-lg:absolute max-md:right-3 max-lg:right-10 lg:mt-8 max-sm:mt-8 mt-3">
          <button className=" px-3 py-3 bg-customBlue rounded-3xl text-white  font-exo font-medium">
            Ask a Question
            <ArrowForwardIosTwoTone fontSize="small" />
          </button>
        </div> */}
      </div>
      <div className="w-full md:px-10 flex-grow-0">
        <div className=" border-2 border-bgdot py-5 px-4 mb-5 rounded-lg">
          <div className=" flex justify-between">
            <h1 className=" text-textcol text-[20px] font-light">
              {landing.sec7.q1}
            </h1>
            <button onClick={() => handleclick(1)}>
              <KeyboardArrowDown
                className={`${
                  num == "1" && prevnum ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <p
            className={`mt-5 text-trueGraysub ${
              num == "1" && prevnum ? "block" : "hidden"
            }`}
          >
            {landing.sec7.a1}
          </p>
        </div>
        <div className=" border-2 border-bgdot py-5 px-4  mb-5 rounded-lg">
          <div className=" flex justify-between">
            <h1 className=" text-textcol text-[20px] font-light">
              {landing.sec7.q2}
            </h1>
            <button onClick={() => handleclick(2)}>
              <KeyboardArrowDown
                className={`${
                  num == "2" && prevnum ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <p
            className={`mt-5 text-trueGraysub ${
              num == "2" && prevnum ? "block" : "hidden"
            }`}
          >
            {landing.sec7.a2}
          </p>
        </div>
        <div className=" border-2 border-bgdot py-5 px-4  mb-5 rounded-lg">
          <div className=" flex justify-between">
            <h1 className=" text-textcol text-[20px] font-light">
              {landing.sec7.q3}
            </h1>
            <button onClick={() => handleclick(3)}>
              <KeyboardArrowDown
                className={`${
                  num == "3" && prevnum ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <p
            className={`mt-5 text-trueGraysub ${
              num == "3" && prevnum ? "block" : "hidden"
            }`}
          >
            {landing.sec7.a3}
          </p>
        </div>
        <div className=" border-2 border-bgdot py-5 px-4  mb-5 rounded-lg">
          <div className=" flex justify-between">
            <h1 className=" text-textcol text-[20px] font-light">
              {landing.sec7.q4}
            </h1>
            <button onClick={() => handleclick(4)}>
              <KeyboardArrowDown
                className={`${
                  num == "4" && prevnum ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <p
            className={`mt-5 text-trueGraysub ${
              num == "4" && prevnum ? "block" : "hidden"
            }`}
          >
            {landing.sec7.a4}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section7;
