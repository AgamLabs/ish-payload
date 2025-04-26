import landing from "../../../../data/data";
import { ArrowForwardIosTwoTone } from "@mui/icons-material";

const Section5 = () => {
  return (
    <img
      src="media/unique_proportions.avif"
      alt="Hero Image"
      className="w-full h-full object-cover"
    />
    // <div
    //   className=" max-sm:px-5 font-oxygen text-white md:flex gap-10 justify-between py-40 px-10 xl:px-20 bg-cover bg-center bg-black bg-blend-overlay bg-opacity-40"
    //   style={{ backgroundImage: "url('media/image-hero1-1.webp')" }}
    // >
    //   <div className="md:w-[85%] md:px-4  max-md:text-right">
    //     <h1 className=" font-bold text-4xl md:leading-normal text-left">
    //       {landing.sec5.title}
    //     </h1>
    //     <button className=" px-4 py-3 bg-customBlue rounded-3xl font-exo font-medium text-[20px] mt-10 max-md:my-5">
    //       Read More <ArrowForwardIosTwoTone fontSize="small" />
    //     </button>
    //   </div>
    //   <div className=" w-full px-4">
    //     <div>
    //       <p>{landing.sec5.grp1t1}</p>
    //       <p>{landing.sec5.grp1t2}</p>
    //     </div>
    //     <div className="flex lg:flex-row flex-col gap-8 mt-10">
    //       <div>
    //         <h1 className=" font-bold text-5xl">{landing.sec5.grp2t1}</h1>
    //         <p> {landing.sec5.grp2t2}</p>
    //       </div>
    //       <div>
    //         <h1 className=" font-bold text-5xl">{landing.sec5.grp3t1}</h1>
    //         <p>{landing.sec5.grp3t2}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Section5;
