import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())

try {
  await connectDB()
  console.log('✅ MongoDB Connected')
} catch (err) {
  console.error('❌ MongoDB Connection Failed:', err.message)
}

app.get('/', (req, res) => res.send('API Working'))

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}/`))
