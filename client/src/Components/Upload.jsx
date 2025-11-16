import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Upload = () => {

  const removeBg = useContext(AppContext)
  return (
    <div className='flex flex-col items-center py-8'>
        <h1 className=" text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-400 mb-10 max-sm:mb-5 ">
        <p className="font-bold text-2xl md:3xl lg:4xl ">
          See the magic. <br className="" /> Try now
        </p>
      </h1>
      <input  onChange={e=>removeBg(e.target.files[0])} accept='image/*' type="file" id='upload1' hidden/>
              <label className='border bg-gradient-to-r from-violet-600 to bg-fuchsia-500  inline-flex px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-white gap-3' htmlFor="upload1">
                <img width={20} height={20} src="/upload-icon.png" alt="" /><p className='text-sm'>Upload Your Image</p>
              </label>
    </div>
  )
}

export default Upload