import React from 'react'
import { assets } from '../Assets/assets'

const Footer = () => {
  return (
    <div className='flex lg:justify-around max-md:justify-between mx-32 max-md:mx-12 sm:px-6 gap-5 items-center pb-5 mt-10'>
        <img width={150} src={assets.logo} alt="" />
        <p className='flex-1 text-sm text-neutral-500 max-md:hidden'>All right reserved. Copyright @bg removal</p>
        <div className='flex items-center'>
            <img src={assets.facebook_icon} width={40} alt="" />
            <img src={assets.twitter_icon} width={40} alt="" />
            <img src={assets.google_plus_icon} width={40} alt="" />
        </div>
    </div>
  )
}

export default Footer