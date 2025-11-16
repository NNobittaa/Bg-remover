import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {

  const {removeBg} = useContext(AppContext)
  return (
    <div className='flex justify-around items-center max-sm:flex-col-reverse gap-y-10  my-10 sm:mt-20  lg:px-64  md:px-40 sm:px-24 max-sm:px-6'>
        {/* Left side */}
        <div className=''>
            <p className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-700 text-neutral-700 leading-tight'>
                Remove the <br className='max-md:hidden' />
                <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span> from <br className='max-md:hidden' />
                images for free.
            </p>
            <p className='text-gray-500 my-6 text-[15px]'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br className='max-sm:hidden' /> Lorem Ipsum has been the industry's standard dummy text eve
            </p>
            <div >
              <input onChange={e=>removeBg(e.target.files[0])}  type="file" id='upload1' hidden/>
              <label className='border bg-gradient-to-r from-violet-600 to bg-fuchsia-500  inline-flex px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-white gap-3' htmlFor="upload1">
                <img width={20} height={20} src="/upload-icon.png" alt="" /><p className='text-sm'>Upload Your Image</p>
              </label>
            </div>
        </div>
        {/* Right side */}
        <div className='w-full max-w-md'>
          <img src="/header_img.png" alt="" />
        </div>
    </div>
  )
}

export default Header