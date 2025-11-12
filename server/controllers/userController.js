// server/controllers/userController.js
import { Webhook } from 'svix'
import userModel from '../models/userModels.js'

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY)

    // Handle both raw and parsed body
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    })

    console.log("Webhook verified successfully ✅")

    const { data, type } = JSON.parse(payload)

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
          email: data.email_addresses[0].email_address,
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
        res.json({ success: true })
    }

  } catch (error) {
    console.log("❌ Webhook Error:", error.message)
    res.status(400).json({ success: false, message: error.message })
  }
}

export { clerkWebhooks }