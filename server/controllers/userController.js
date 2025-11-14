import { Webhook } from 'svix'
import userModel from '../models/userModels.js'

const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔔 Webhook received")
    console.log("Headers:", req.headers)
    console.log("Body type:", typeof req.body)
    
    // Check if body exists
    if (!req.body) {
      console.log("❌ No body received")
      return res.status(400).json({ success: false, message: "No body received" })
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY)

    // Convert buffer to string
    const payload = Buffer.isBuffer(req.body) 
      ? req.body.toString('utf8') 
      : JSON.stringify(req.body)
    
    // Get headers - note the lowercase
    const svixId = req.headers['svix-id']
    const svixTimestamp = req.headers['svix-timestamp']
    const svixSignature = req.headers['svix-signature']

    // Check if we have all required headers
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.log("❌ Missing svix headers")
      return res.status(400).json({ 
        success: false, 
        message: "Missing svix headers" 
      })
    }

    const headers = {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    }

    console.log("Verifying webhook...")
    
    // Verify the webhook
    let evt
    try {
      evt = whook.verify(payload, headers)
    } catch (err) {
      console.log("❌ Webhook verification failed:", err.message)
      return res.status(400).json({ 
        success: false, 
        message: "Webhook verification failed" 
      })
    }
    
    console.log("✅ Webhook verified successfully")

    const { data, type } = evt

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          photo: data.image_url
        }

        await userModel.create(userData)
        console.log("✅ User created in database:", userData.email)
        res.json({ success: true })
        break
      }

      case "user.updated": {
        const userData = {
          email: evt.data.email_addresses[0].email_address,
          firstName: data.first_name,
          photo: data.image_url
        }
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
        console.log("✅ User updated in database")
        res.json({ success: true })
        break
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id })
        console.log("✅ User deleted from database")
        res.json({ success: true })
        break
      }

      default:
        console.log("ℹ️ Unhandled event type:", type)
        res.json({ success: true })
    }

  } catch (error) {
    console.log("❌ Webhook Error:", error.message)
    console.log("Error stack:", error.stack)
    res.status(400).json({ success: false, message: error.message })
  }
}

export default clerkWebhooks