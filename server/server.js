import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Initialize middleware 
app.use(cors())

// Use raw body parser for webhooks BEFORE json parser
app.use('/api/user/webhooks')

// Use json parser for other routes
app.use(express.json())

app.use('/api/user', userRouter)

// API Routes 
app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, () => console.log('server running on port : http://localhost:' + PORT))