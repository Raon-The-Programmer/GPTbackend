const express = require('express')
const mongoose = require('mongoose')
const {PORT,MONGODB_URL, COOKIE_SECRET} = require('./src/utils/config')
const appRouter = require('./src/routes/app')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

mongoose.set('strictQuery',false)
console.log("Connecting..")
mongoose.connect(MONGODB_URL)
    .then(()=>{app.listen(PORT,()=>console.log(`Server connected at port ${PORT}`))})
    .catch((err)=>{
        console.log("Error caused while connecting server: ",err)
    })

app.use(cors({origin:'http://localhost:5173',credentials: true}))    
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))

app.use('/api',appRouter)



