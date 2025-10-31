import 'dotenv/config'
import express from 'express'
import cors from 'cors'
// Assuming './configs/mongodb.js' handles the connection logic
import connectDB from './configs/mongodb.js' 

// --- Configuration ---
const PORT = process.env.PORT || 4000
const app = express()

// --- Middleware Setup ---
app.use(express.json()) // Allows parsing of JSON request bodies
app.use(cors()) // Enables Cross-Origin Resource Sharing

// --- Database Connection ---
// The connectDB function is awaited here to ensure connection before starting the server.
await connectDB()

// --- API Routes ---

// 1. Root Route - simple health check
app.get('/', (req, res)=> {
    res.json({ message: 'Personal Voice Assistant API is running!', version: '1.0.0' })
})

// 2. Placeholder Route for Assistant Features
// This is the endpoint where your client-side voice assistant will send its commands.
// You will replace this with a dedicated router file for clean separation (e.g., assistantRoutes.js)
app.use('/api/assistant', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'Assistant Core', 
        instructions: 'This endpoint is ready for your AI/ML models to manage data.' 
    });
});


// --- Global Error Handler (MUST be the last middleware before the listen call) ---
// This catches all errors thrown during route processing.
app.use((err, req, res, next) => {
    console.error(err.stack) // Log the error stack for debugging
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'An unknown server error occurred!',
            status: err.status || 500,
        }
    })
})


// --- Server Start ---
app.listen(PORT, ()=> {
    console.log(`\n\n[INFO] 🚀 Server Running on port ${PORT}`)
    console.log(`[INFO] 🌐 Access the API at http://localhost:${PORT}`)
})
