import { Webhook } from 'svix'
import userModel from '../models/userModels.js'

const clerkWebhooks = async (req, res) => {
  try {
    // ✅ Correct constructor
    const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY)

    // ✅ Verify signature (use raw body)
    await whook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    })

    console.log("Webhook verified successfully ✅")

    const { data, type } = JSON.parse(req.body.toString())

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          first_Name: data.first_name,
          photo: data.image_url
        }

        await userModel.create(userData)
        res.json({ success: true })
        break
      }

      case "user.updated": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          first_Name: data.first_name,
          photo: data.image_url
        }
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
        res.json({ success: true })
        break
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id })
        res.json({ success: true })
        break
      }

      default:
        res.json({ success: true })
    }

  } catch (error) {
    console.log("❌ Webhook Error:", error.message)
    res.status(400).json({ success: false, message: error.message })
  }
}

export { clerkWebhooks }
