import { createContext } from "react";
import { SignedIn, SignIn, useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const [credits, setcredits] = useState(false)
    const [image, setimage] = useState(false)
    const [resultImage, setresultImage] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const {getToken} = useAuth()

    const {isSignedIn} = useUser()
    const {openSignIn} = useClerk()

    // console.log("AppContext --> getToken : "+getToken)   

    const loadCreditsData = async()=>{
        try{
            const token = await getToken()
            // console.log("AppContext --> Token : "+token)
            const {data} = await axios.get(backendurl+'/api/user/credits', {headers:{token}})
            // console.log(data)
            if (data.success){
                setcredits(data.credits)
                console.log(data.credits)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const removeBg = async(image)=>{
        try{
            console.log(image)
            if(!SignedIn){
                return openSignIn()
            }
            setimage(image)
            setresultImage(false)
            navigate('/result')
            const token = await getToken()
            const formData = new FormData()
            image && formData.append('image', image)

            const {data} = await axios.post(backendurl+'/api/image/remove-bg', formData, {headers:{token}})
            
            if (data.success){
                setresultImage(data.resultImage)
                data.creditBalance && setcredits(data.creditBalance) 
            }else{
                toast.error(data.message)
                data.creditBalance && setcredits(data.creditBalance)
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }

        }

        catch(error){
            console.log(error)
            toast.error(error.message)
        }


    }

    const value = {credits,
        setcredits,
        loadCreditsData,backendurl,image, setimage, removeBg
         
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider