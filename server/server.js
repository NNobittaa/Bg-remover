import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express() 

// Raw body parser ONLY for Clerk webhooks  
app.use('/api/user/webhooks', express.raw({ type: "*/*" }));

// Normal body parser for everything else
app.use(express.json());
app.use(cors());

await connectDB()

// Initialize middleware 
app.use("/api/user", userRouter);

app.get('/',(req, res)=>res.send("API Working"))

app.listen(PORT, ()=> console.log('server running on port : http://localhost:'+PORT))