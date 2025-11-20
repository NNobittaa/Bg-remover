import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

await connectDB()

// Allow multiple origins (development and production)
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4000', 
    'https://bg-remover-tau-ten.vercel.app',
    'https://bg-remover-backend-3-sobx.onrender.com',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


// RAW BODY for Clerk
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }))

// JSON parser for all other routes
app.use(express.json()) 

// Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// Root route
app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port: ' + PORT))
