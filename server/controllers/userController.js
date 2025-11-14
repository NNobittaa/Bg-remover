import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(req.body, {
      "svix-signature": req.headers["svix-signature"],
    });

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
      // await UserModel.create({ clerkId: user.id, email });

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
