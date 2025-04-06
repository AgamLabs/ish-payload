import landing from "../../../../data/data";
import { ArrowForwardIosTwoTone } from "@mui/icons-material";
import Image from "next/image";

const Section6 = () => {
  return (
    <div className="py-20 px-5 font-oxygen">
      <div className="flex justify-between md:px-10">
        <div className=" md:w-3/5 xl:w-2/5">
          <h1 className="text-trueGray text-4xl font-bold max-md:w-4/6">
            {landing.sec6.title}
          </h1>
          <p className=" text-trueGraysub mt-5 font-bold">{landing.sec6.sub}</p>
        </div>
        <div className=" md:my-auto max-md:absolute max-md:right-2 max-md:mt-3">
          <button className=" px-3 py-3 bg-customBlue rounded-3xl text-white  font-exo font-medium">
            Read All Blogs
            <ArrowForwardIosTwoTone fontSize="small" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 max-xl:gap-20 xl:grid-cols-3 bg-background py-10 my-5 md:mx-10">
        <div className="w-[300px] xl:w-[360px] mx-auto">
          <div className=" relative w-full h-[265px] ">
            <Image
              className=" rounded-lg"
              src="/media/image-post1.webp"
              alt="working images"
              fill
            />
          </div>
          <div className=" flex gap-3 my-3">
            <p className="rounded-full bg-bgdot w-6 h-6"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp1name}</p>
            <p className="rounded-full bg-grayforbottomtext w-2 h-2 my-auto"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp1date}</p>
          </div>
          <p className=" text-[20px] text-grayforbottomtext">
            {landing.sec6.grp1content}
          </p>
        </div>
        <div className="w-[300px] xl:w-[360px] mx-auto">
          <div className=" relative w-full h-[265px] ">
            <Image
              className=" rounded-lg"
              src="/media/image-post1.webp"
              alt="working images"
              fill
            />
          </div>
          <div className=" flex gap-3 my-3">
            <p className="rounded-full bg-bgdot w-6 h-6"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp2name}</p>
            <p className="rounded-full bg-grayforbottomtext w-2 h-2 my-auto"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp2date}</p>
          </div>
          <p className=" text-[20px] text-grayforbottomtext">
            {landing.sec6.grp2content}
          </p>
        </div>
        <div className="w-[300px] xl:w-[360px] mx-auto">
          <div className=" relative w-full h-[265px] ">
            <Image
              className=" rounded-lg"
              src="/media/image-post1.webp"
              alt="working images"
              fill
            />
          </div>
          <div className=" flex gap-3 my-3">
            <p className="rounded-full bg-bgdot w-6 h-6"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp3name}</p>
            <p className="rounded-full bg-grayforbottomtext w-2 h-2 my-auto"></p>
            <p className=" text-grayforbottomtext">{landing.sec6.grp3date}</p>
          </div>
          <p className=" text-[20px] text-grayforbottomtext">
            {landing.sec6.grp3content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section6;
