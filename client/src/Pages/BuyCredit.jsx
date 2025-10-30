import React from "react";
import { assets, plans } from "../Assets/assets";

const BuyCredit = () => {
  return (
    <div className="min-h-screen text-center mt-10">
      <button className="border px-5 py-1 rounded-full border-gray-500">
        Our Plans
      </button>
      <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mt-4 mx-8">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          Choose the plan that's right for you
        </p>
      </h1>
      <div className=" flex gap-8 justify-center items-center text-left mt-10 max-md:flex-col">
        {plans.map((item, index)=>(
          <div className="border px-8 rounded-2xl md:w-1/6 bg-white drop-shadow-sm py-12 text-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer" key={index}>
            <img src={assets.logo_icon} alt="" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/{item.credits} credits
            </p>
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5">Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
