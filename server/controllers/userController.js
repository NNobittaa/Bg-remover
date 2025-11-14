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

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const user = evt.data;

      // Debug: Log the entire payload to see structure
      console.log("Full user data:", JSON.stringify(user, null, 2));

      // Try multiple ways to get email
      let email = null;
      
      if (user.email_addresses && user.email_addresses.length > 0) {
        email = user.email_addresses[0].email_address;
      } else if (user.primary_email_address_id && user.email_addresses) {
        const primaryEmail = user.email_addresses.find(
          e => e.id === user.primary_email_address_id
        );
        email = primaryEmail?.email_address;
      }

      console.log("Extracted email:", email);
      console.log("Email addresses array:", user.email_addresses);

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "No email found in Clerk payload",
          debug: {
            hasEmailAddresses: !!user.email_addresses,
            emailAddressesLength: user.email_addresses?.length || 0
          }
        });
      }

      // Save user to DB (use upsert to avoid duplicates)
      const userData = {
        clerkId: user.id,
        email: email,
        photo: user.image_url || user.profile_image_url || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
      };

      // Use findOneAndUpdate with upsert to handle both create and update
      await userModel.findOneAndUpdate(
        { clerkId: user.id },
        userData,
        { upsert: true, new: true }
      );
      
      console.log("User saved successfully:", userData);

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