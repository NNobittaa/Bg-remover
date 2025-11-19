import { Webhook } from "svix";
import razorpay from 'razorpay'
import jwt from'jsonwebtoken'
import userModel from "../models/userModels.js";
import transactionModel from "../models/transactionModels.js";

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
        // console.log("userController--> userCredits --> clerkId : "+clerkId)
        // console.log(req.headers)
        const userData = await userModel.findOne({clerkId})
        // console.log("userController--> userCredits --> UserData:"+userData)
        res.json({success:true, credits: userData.creditBalance})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// Gateway initialization
const razorPayInstance = new razorpay({
    key_id : process.env.RZORPAY_KEY_ID,
    key_secret : process.env.RZORPAY_KEY_SECRET
})

//API to make payments for credits
export const paymentRazorpay = async(req, res)=>{
    try {
        const {clerkId} = req.headers
        const {planId} = req.body
        // console.log(clerkId, planId)
        const userData = await userModel.findOne({clerkId})
        if ( !userData || !planId){
            return res.json({success:false, message:"inavalid credentials"})
        }
        let credits, plan , amount , date
        switch (planId) { 
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 884
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 4423
                break;
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 22120
                break;
        
            default:
                break;
        }
        date = Date.now()

        //Creating transactions 
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        } 

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount : amount * 100,
            currency :process.env.CURRENCY,
            receipt : newTransaction._id 
        }
        razorPayInstance.orders.create(options, (error, order)=>{
            if (error) {
                return res.json({success:false, message:error})
            }
            res.json({success:true, order})
        })
    }
    catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }

}