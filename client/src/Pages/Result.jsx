import React from "react";
import { assets } from "../Assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Result = () => {

  const {resultImage, image} = useContext(AppContext)

  return (
    <div className="min-h-screen my-3 w-3/4 mt-14 mx-auto ">
      {/* Container */}
      <div className=" bg-white rounded-lg px-8 py-12 drop-shadow-md flex gap-8 p">
        {/* Left */}
        <div className="flex flex-col gap-8 rounded-md w-1/2">
          <p className="font-semibold text-gray-600">Original</p>
          <img
            className="rounded-lg drop-shadow-md"
            src={image? URL.createObjectURL(image):''}
            alt=""
          />
        </div>
        {/* Right */}
        <div className="flex flex-col gap-8 rounded-md w-1/2 ">
          <p className="font-semibold text-gray-600">Background Removed</p>
          <div className="rounded-lg border-gray-400 drop-shadow-md border h-full relative bg-layer overflow-hidden">
            <img src={resultImage?resultImage:""} alt="" />
            {
              !resultImage && image &&
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
              <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin "></div>
            </div>
            }
          </div>
          {/* Buttons */}
          {
            resultImage && 
          <div className="flex  gap-4 justify-end ">
            <button
              className="border text-center border-violet-600  inline-flex px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-white gap-3 font-semibold"
              htmlFor="upload1"
            >
              <p className="text-sm text-violet-600  font-semibold">Try another image</p>
            </button>
            <a href={resultImage} download
              className="border bg-gradient-to-r from-violet-600 to bg-fuchsia-500  inline-flex px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-white gap-3"
              htmlFor="download"
            >
              <p className="text-sm">Download image</p>
            </a>
          </div>
          }
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Result;
