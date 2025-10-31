import mongoose from 'mongoose'

/**
 * Establishes and monitors the connection to the MongoDB database.
 * Uses an event listener to confirm successful connection.
 */
const connectDB = async()=>{

    // Event listener to log when the connection is established
    mongoose.connection.on('connected', ()=>{
        console.log("[DB] Database Connected Successfully")
    })

    // Event listener to log connection errors
    mongoose.connection.on('error', (err)=>{
        console.error(`[DB] Database connection error: ${err}`)
    })

    try {
        // Attempt to connect using the URI from environment variables.
        // I changed the database name to 'voice-assistant' for your project context.
        await mongoose.connect(`${process.env.MONGODB_URI}/voice-assistant`)
    } catch (error) {
        // Log error and exit the process if connection fails
        console.error("[DB] Could not connect to MongoDB:", error.message)
        process.exit(1)
    }
}

export default connectDB
