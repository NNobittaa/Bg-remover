import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

await connectDB()

app.use(cors())

// RAW BODY for Clerk
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }))

// JSON parser for all other routes
app.use(express.json())

// Routes
app.use('/api/user', userRouter)

// Root route
app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port: ' + PORT))
