import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js' 
import userRouter from './routes/user.routes.js'

// --- Configuration & Initialization ---
const app = express()

// Middleware Setup
app.use(express.json())
app.use(cors())

// --- Initialize Database Connection State ---
// This ensures connectDB is only called once during the cold start phase.
let isDbConnected = false;
const connectOnce = async () => {
    if (!isDbConnected) {
        await connectDB();
        isDbConnected = true;
    }
}


// --- API Routes ---
app.get('/', (req, res)=> {
    res.json({ message: 'Personal Voice Assistant API is running!', version: '1.0.0' })
})

app.use('/api/users', userRouter)

app.use('/api/assistant', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'Assistant Core', 
        instructions: 'This endpoint is ready for your AI/ML models to manage data.' 
    });
});


// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'An unknown server error occurred!',
            status: err.status || 500,
        }
    })
})


// The main handler for Vercel:
// 1. Ensures DB is connected.
// 2. Uses the express 'app' instance to handle the request.
// 3. We export the 'app' instead of calling app.listen().
// 
// NOTE: Vercel often requires a 'vercel.json' file to correctly handle Express.
export default async function handler(req, res) {
    try {
        await connectOnce(); // Ensure DB connection before handling request
        app(req, res); // Let Express handle the request
    } catch (error) {
        console.error("Vercel Handler Error:", error);
        res.status(500).json({ error: "Failed to initialize server resources." });
    }
}
