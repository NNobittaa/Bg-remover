import { Webhook } from "svix";
import jwt from'jsonwebtoken'
import userModel from "../models/userModels.js";
export const clerkWebhooks = async (req, res)=> {
    try {
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const evt = wh.verify(
            req.body,               // raw body
            {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            }
          );
        //   console.log(req.body)
          
          console.log("Webhook Verified:", evt.type);
          res.json({ success: true });

    } catch (err) {
        console.error("Webhook Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
}

export const userCredits = async(req, res)=>{
    try{
        const { clerkId } = req.headers
        console.log("Controller clerkId:"+clerkId)
        // console.log(req.headers)
        const userData = await userModel.findOne({clerkId})
        console.log("UserData:"+userData)
        res.json({success:true, credits: userData.creditBalance})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

