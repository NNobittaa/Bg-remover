import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express() 

await connectDB()

// CORS should be first
app.use(cors());

// Raw body parser ONLY for Clerk webhooks - MUST come before other routes
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }));

// Normal body parser for everything else
app.use(express.json());

// Initialize routes 
app.use("/api/user", userRouter);

app.get('/',(req, res)=>res.send("API Working"))

app.listen(PORT, ()=> console.log('server running on port : http://localhost:'+PORT))