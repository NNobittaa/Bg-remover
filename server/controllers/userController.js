import { Webhook } from "svix";
import userModel from "../models/userModels.js";

const clerkWebhooks = async (req, res) => {
  try {
    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing svix headers",
      });
    }

    // Convert raw body buffer to string
    const payload = req.body.toString();

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt;
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      return res.status(400).json({
        success: false,
        message: "Webhook verification failed",
      });
    }

    console.log("Webhook received:", evt.type);

    if (evt.type === "user.created") {
      const user = evt.data;

      const email =
        user.email_addresses &&
        user.email_addresses.length > 0
          ? user.email_addresses[0].email_address
          : null;

      console.log("User Email:", email);

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "No email found in Clerk payload",
        });
      }

      // Save user to DB
      const userData = {
        clerkId: user.id,
        email: email,
        photo: user.image_url || user.profile_image_url || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
      };

      await userModel.create(userData);
      
      console.log("User created successfully:", userData);

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export default clerkWebhooks;