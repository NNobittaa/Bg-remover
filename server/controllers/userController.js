import { Webhook } from 'svix'
import userModel from '../models/userModels.js'
//API controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res)=>{
    try {
        const whook = webhook(process.env.CLERK_WEBHOOK_KEY)
        // console.log(JSON.stringify(req.body))

        await whook.verify(JSON.stringify(req.body), {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })
        // console.log("hi")

        const {data, type} = req.body

        switch(type){
            case "user.created":{
                const userData = {
                    clerkId:data.id, 
                    email:data.email_addresses[0].email_addresse,
                    first_Name:data.first_name, 
                    photo:data.image_url
                }

                await userModel.create(userData)
                res.json({})

                break;
            }
            case "user.updated":{

                const userData = {
                    clerkId:data.id, 
                    email:data.email_addresses[0].email_addresse,
                    first_Name:data.first_name, 
                    photo:data.image_url
                }
                await userModel.findOneAndUpdate({clerkId:data.id}, userData)
                res.json({})
                break;
            }
            case "user.deleted":{

                await userModel.findByIdAndDelete({clerkId:data.id})
                res.json({})

                break;
            }
        }
        
    }
    catch(error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}
export {clerkWebhooks}