import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const client = mongoose.connect(process.env.CONNECTION_STRING)

const db = mongoose.connection

export default db
