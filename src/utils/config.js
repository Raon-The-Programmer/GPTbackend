require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_SECRET = process.env.COOKIE_SECRET
const COOKIE_NAME = process.env.COOKIE_NAME
const AI_SECRET_KEY = process.env.AI_SECRET_KEY
const ORGANIZATION_ID = process.env.ORGANIZATION_ID

module.exports={MONGODB_URL,PORT,JWT_SECRET,COOKIE_SECRET,COOKIE_NAME,ORGANIZATION_ID,AI_SECRET_KEY}