import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const startServer = async () => {
  try {
    await connectDB()
    console.log('✅ MongoDB Connected')

    app.get('/', (req, res) => res.send('API Working'))

    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}/`)
    )
  } catch (err) {
    console.error('❌ Server error:', err.message)
  }
}

startServer()
