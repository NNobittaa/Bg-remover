import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const PORT=3000
import connectDB from '../configs/mongodb.js'

const app = express()
app.use(express.json())
app.use(cors())

await connectDB()
app.listen(PORT, ()=> console.log('server running on port' + PORT) )
app.get('/', (req, res) => res.send('API Working ✅'))  

export default app
