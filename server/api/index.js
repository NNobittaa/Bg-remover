import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from '../configs/mongodb.js'

const app = express()
const PORT = process.env.PORT || 3000 // ✅ use Render’s env var

app.use(express.json())
app.use(cors())

await connectDB()

app.get('/', (req, res) => res.send('API Working ✅'))

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))

export default app
