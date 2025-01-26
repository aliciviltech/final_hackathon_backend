import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoutes } from './routes/authRoutes.js'
import mongoose from 'mongoose'
import { beneficiaryRoutes } from './routes/beneficiaryRoutes.js'
dotenv.config()

// routes and middleware
const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req,res)=>{
    res.status(200).send('Welcome to backend')
})
app.use('/auth', authRoutes);
app.use('/beneficiary', beneficiaryRoutes);



// mongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(()=>console.log('MongoDB Connected successfully'))


// server connection
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Server started:', PORT)
})
console.log(PORT)