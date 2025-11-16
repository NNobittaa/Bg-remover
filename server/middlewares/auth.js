import jwt from'jsonwebtoken'
import { messageInRaw } from 'svix'

//Middleware function to decode jwt token to get ClerkId 

const authUser = async(req, res, next)=>{
    try{
        const {token} = req.headers
        // console.log(req.headers)
        // console.log(token)
        console.log("req:"+req)
        console.log("body:"+req.headers)

        if(!token){
            return res.json({success:false, message:'Not Authorized'})
        }

        const token_decode = jwt.decode(token)
        console.log(token_decode)
        req.headers.clerkId = token_decode.clerkId
        // const body = JSON.parse(req.headers.toString());
        // console.log(body)
        // body.clerkId = token_decode.clerkId
        console.log(req.headers.clerkId)
        next()  
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}

export default authUser