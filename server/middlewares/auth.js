import jwt from'jsonwebtoken'
import { messageInRaw } from 'svix'

//Middleware function to decode jwt token to get ClerkId 

const authUser = async(req, res, next)=>{
    try{
        const {token} = req.headers
        // console.log(req.headers)
        // console.log(token)
        // console.log("Auth --> req : "+req)
        // console.log("Auth --> body : "+req.headers)
        // console.log("Auth --> token : "+token)

        if(!token){
            return res.json({success:false, message:'Not Authorized'})
            console.log("Error hai token me ")
        }

        const token_decode = jwt.decode(token)
        // console.log(token_decode)
        req.headers.clerkId = token_decode.clerkId
        // console.log("Auth --> clerkId : "+req.headers.clerkId)
        next()  
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}

export default authUser