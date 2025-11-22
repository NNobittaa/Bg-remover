import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const token_decode = jwt.decode(token);
    
    // Try different possible locations for the clerkId
    const clerkId = token_decode?.clerkId || token_decode?.sub || token_decode?.userId;
    
    if (!clerkId) {
      console.error("ClerkId not found in token:", token_decode);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    
    req.headers.clerkId = clerkId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authUser;