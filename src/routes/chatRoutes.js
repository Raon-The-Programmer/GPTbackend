const { generateChat } = require('../controllers/chatController')
const userController = require('../controllers/userController')
const { verifyToken } = require('../utils/middlewares')

const chatRouter = require('express').Router()

chatRouter.get('/new',verifyToken,generateChat)



module.exports=chatRouter