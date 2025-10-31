import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from '../configs/mongodb.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('API Working ✅')
})

// Connect to MongoDB (on first cold start)
await connectDB()

export default app
