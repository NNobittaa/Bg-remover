import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useEffect, React } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'

 
const Navbar = () => {
  const {openSignIn} = useClerk()
  const {isSignedIn,user } = useUser()
  const {credits, loadCreditsData} = useContext(AppContext)
  useEffect(() => {
    if(isSignedIn)  
      loadCreditsData()
  })
  return (
    <div className=' flex sm:h-20 h-14 justify-around items-center '>
        <Link to='/'><img src="/logo.svg" className='' width={150} alt="" /></Link> 
        {
          isSignedIn?
          <div className='flex justify-center items-center max-sm:text-sm gap-4 font-semibold text-gray-600'>
            <button className=' bg-blue-100 border max-sm:px-3 max-sm:bg px-6 max-sm:py-1 py-2 rounded-full flex items-center gap-2 text-md transition-all duration-300 transform hover:scale-105'>
              <img width={22} src="/credit_icon.png" alt="Credits" />
              <p className=''>Credits : {credits}</p>
            </button>
            <p className='text-gray-600 max-sm:hidden'>Hi, {user.username}</p>
            <UserButton/>
          </div>:
          <button onClick={()=>openSignIn({})} className=' text-white items-center justify-center inline-flex bg-zinc-800 px-4 rounded-3xl font-semibold transform transition-all duration-500 max-sm:text-[15px] hover:scale-105 sm:px-4 sm:py-2 py-2'>Get Started
            <img className='mx-2' src="/arrow_icon.svg " width={26} alt="" />
        </button>
        }
        
    </div>
  )
}

export default Navbar