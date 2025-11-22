import { messageInRaw, Webhook } from "svix";
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
        
        if (evt.type === 'user.created') {
            const { id, email_addresses, image_url, first_name, last_name } = evt.data;
            
            const userData = {
                clerkId: id,
                email: email_addresses[0].email_address,
                photo: image_url,
                firstName: first_name,
                lastName: last_name
            }
            
            // Create new user in database
            await userModel.create(userData);
            console.log("User created in database:", userData.email);
        }
          
        console.log("Webhook Verified:", evt.type);
        res.json({ success: true });

    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const userCredits = async(req, res)=>{
    try{
        const { clerkId } = req.headers
        const userData = await userModel.findOne({ clerkId: clerkid });
        
        if (!userData) {
            return res.status(404).json({
                success: false, 
                message: "User not found"
            })
        }
        
        res.json({success:true, credits: userData.creditBalance})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
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
        const {planId} =  req.body
        
        const userData = await userModel.findOne({clerkId})
        if ( !userData || !planId){
            return res.json({success:false, message:"invalid credentials"})
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
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API controller function to verify razorpay payment
export const verifyRazorpay = async(req, res) =>{
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid' ){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false, message:"Payment Failed"})
            }
            // Adding credits in userData 
            const userData = await userModel.findOne({clerkId:transactionData.clerkId})
            const creditBalance = await userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            //Making the payment true
            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})
            res.json({success:true, message:"Credits Added"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}