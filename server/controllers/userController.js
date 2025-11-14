import { Webhook } from "svix";

export default async function clerkWebhooks(req, res) {
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

        console.log("Webhook Verified:", evt.type);
        res.json({ success: true });
    } catch (err) {
        console.error("Webhook Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
}
