import { createContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import axios from "axios";


export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const [credit, setcredit] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const {getToken} = useAuth()

    const loadCreditsData = async()=>{
        try{
            const token = await getToken()
            const {data} = await axios.get(backendurl+'/api/user/credits', {headers:{token}})
            if (data.success){
                setcredit(data.credit)
                console.log(data.credit )
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const value = {credit,
        setcredit,
        loadCreditsData,backendurl,
         
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider