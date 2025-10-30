
import React from 'react'
import { useState } from 'react'
import { assets } from '../Assets/assets'
const Removebg = () => {

  const [slidePosition, setslidePosition] = useState(50)

  const handleSlider=(e)=>{
    setslidePosition(e.target.value)
  }

  return (
    <div className='py-8 mb-4 mx-4'>
        <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mb-20 max-sm:mb-10 ">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          Steps to remove background <br className="" /> image in
          seconds
        </p>
      </h1>
      <div className='relative w-full max-w-3xl border mx-auto '>

      <img src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2-slidePosition}% 0 0)`}} alt="" />
      <img className='absolute top-0' src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${slidePosition}%)`}} alt="" />
      <input className='absolute top-1/2 max-sm:right-[49%] right-1/2 slider transform translate-x-1/2 -translate-y-1/2 w-full z-10' type="range" name="" id="" value={slidePosition} onChange={handleSlider} />
      
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Removebg