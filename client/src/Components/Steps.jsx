import React from "react";

const Steps = () => {
  return (
    <div className="lg:py-8 md:py-6 sm:py-2 mx-4">
      <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mt-4 ">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          Steps to remove background <br className="" /> image in seconds
        </p>
      </h1>
      <div className="flex justify-center items-center h-[80vh] relative max-md:h-[50vh]">
        <model-viewer className='w-full h-full absolute '
          src="Linksfinal.glb"
          alt="Cat 3D Model"
          autoplay
          animation-6
          camera-controls 
          disable-zoom
          shadow-intensity="0.8"
        ></model-viewer>
      </div >
      <div className="flex gap-10 justify-center flex-wrap mx-4 pb-10 md:px-40">
        <div className="inline-flex border p-7 gap-4 items-start text-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white drop-shadow-md rounded-lg pb-10">
          <img className="" src="/upload_icon.svg" alt="" />
          <div className="">
            <p className="font-semibold">Upload image</p>
            <p className="text-sm text-neutral-500 mt-1">
              This is a demo text, will replace it later. <br /> This is a
              demo..
            </p>
          </div>
        </div>
        <div className="inline-flex border p-7 gap-4 items-start text-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white drop-shadow-md rounded-lg pb-10">
          <img className="" src="/remove_bg_icon.svg" alt="" />
          <div className="">
            <p className="font-semibold">Remove background</p>
            <p className="text-sm text-neutral-500 mt-1">
              This is a demo text, will replace it later. <br /> This is a
              demo..
            </p>
          </div>
        </div>
        <div className="inline-flex border p-7 gap-4 items-start text-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white drop-shadow-md rounded-lg pb-10">
          <img className="" src="/download_icon.svg" alt="" />
          <div className="">
            <p className="font-semibold">Download image</p>
            <p className="text-sm text-neutral-500 mt-1">
              This is a demo text, will replace it later. <br /> This is a
              demo..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
