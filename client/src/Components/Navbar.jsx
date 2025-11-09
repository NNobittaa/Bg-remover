import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext, useEffect, React } from 'react'
import { AppContext } from '../context/AppContext'
 
const Navbar = () => {
  const {openSignIn} = useClerk()
  const {isSignedIn,user } = useUser()
  const {credit, loadCreditsData} = useContext(AppContext)  
  useEffect(() => {
    if(isSignedIn)
      loadCreditsData()
  })
  
  return (
    <div className=' flex sm:h-20 h-14 justify-around items-center '>
        <Link to='/'><img src="/logo.svg" className='' width={150} alt="" /></Link> 
        {
          isSignedIn?
          <div>
            <UserButton/>
          </div>:
          <button onClick={()=>openSignIn({})} className=' text-white items-center justify-center inline-flex bg-zinc-800 px-4 rounded-3xl font-semibold transform transition-all duration-500 max-sm:text-[15px] hover:scale-105 sm:px-4 sm:py-2 py-2'>Get Started
            <img className='mx-2' src="/arrow_icon.svg " width={14} alt="" />
        </button>
        }
        
    </div>
  )
}

export default Navbar