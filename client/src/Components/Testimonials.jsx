import React from "react";
import { testimonialsData } from "../Assets/assets";
const Testimonials = () => {
  return (
    <div>
      <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mt-4">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          Customer Testimonials
        </p>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl px-4 py-8 gap-10">

        {testimonialsData.map((item, index)=>
        <div className="flex flex-col border p-7 text-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white drop-shadow-md rounded-lg pb-10" key={index}>
          <p className="text-6xl font-serif inline-flex items-center ">”</p> 
          <p className="text-sm text-neutral-500">
            {item.text}
          </p>
          <div className='flex items-center pt-4 gap-3'>
            <img className='rounded-full' width={45} src={item.image} alt="" />
            <div>
              <p className='font-semibold text-base'>{item.author}</p>
              <p className='text-sm text-neutral-400'>{item.jobTitle}</p>
            </div>
          </div>
        </div>
        )}

        

      </div>
    </div>
  );
};

export default Testimonials;
