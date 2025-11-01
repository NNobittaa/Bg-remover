import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from '../configs/mongodb.js'

const app = express()
app.use(express.json())
app.use(cors())

await connectDB()

app.get('/', (req, res) => {
  res.send('API working ✅ (from Vercel)')
})

export default app
