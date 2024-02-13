const chatRouter = require('./chatRoutes')
const userRouter = require('./userRoutes')

const appRouter = require('express').Router()

appRouter.use('/user',userRouter)
appRouter.use('/chats',chatRouter)

module.exports=appRouter