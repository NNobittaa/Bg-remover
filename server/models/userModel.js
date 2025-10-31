import mongoose from 'mongoose'

/**
 * Mongoose Schema for the User model.
 * This model is designed to store metadata about the user 
 * (likely synced from Clerk or another auth service) and manage 
 * hackathon-specific resources like a credit balance.
 */
const userSchema = new mongoose.Schema({
    // Unique ID from the authentication provider (e.g., Clerk)
    clerkID:{
        type: String, 
        required: true, 
        unique: true
    },
    // User's email address (for communication)
    email:{ 
        type: String, 
        required: true, 
        unique: true
    },
    // URL to the user's profile photo
    photo:{ 
        type: String, 
        required: true
    },
    // First and last names (optional for personalization)
    firstName:{ 
        type: String
    },
    lastName:{ 
        type: String
    },
    // Resource balance for the hackathon (e.g., for AI API calls)
    creditBalance:{ 
        type: Number, 
        default: 5
    }
}, { 
    // Mongoose option to automatically add createdAt and updatedAt fields
    timestamps: true 
})

// Create and export the model
const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export default UserModel
