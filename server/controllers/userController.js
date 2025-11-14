import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(req.body, {
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("Event:", evt.type);

    const user = evt.data;

    // Handle user.created
    if (evt.type === "user.created") {
      console.log("User created:", user.id);

      // Email might not exist yet
      const email =
        user.email_addresses?.[0]?.email_address || null;

      console.log("Email at creation:", email);

      // Store user, even if email = null
      return res.status(200).json({ success: true });
    }

    // Handle email_address.created
    if (evt.type === "email_address.created") {
      console.log("New email added:", user.email_address);

      // Update user email in DB
      return res.status(200).json({ success: true });
    }

    // Handle user.updated
    if (evt.type === "user.updated") {
      console.log("User updated");
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res
      .status(400)
      .json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
