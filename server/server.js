import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { connect } from 'mongoose'

// Configure app
const PORT = process.env.PORT || 4000
const app = express() 
await connectDB()

// Initialize middleware 
app.use(cors())
app.use(express.json())

//API Routes 
app.get('/',(req, res)=>res.send("API Working"))

app.listen(PORT, ()=> console.log('server running on port : http://localhost:'+PORT))



