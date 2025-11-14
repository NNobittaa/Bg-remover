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
      console.log("New User created:", user);
      // 👉 Yaha apna DB save logic likh sakte ho
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
