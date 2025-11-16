import { createContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import axios from "axios";

export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const [credits, setcredits] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const {getToken} = useAuth()

    // console.log("AppContext --> getToken : "+getToken)   

    const loadCreditsData = async()=>{
        try{
            const token = await getToken()
            console.log("AppContext --> Token : "+token)
            const {data} = await axios.get(backendurl+'/api/user/credits', {headers:{token}})
            console.log(data)
            if (data.success){
                setcredits(data.credits)
                console.log(data.credits)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const value = {credits,
        setcredits,
        loadCreditsData,backendurl,
         
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider