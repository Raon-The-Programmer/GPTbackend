const userController = require('../controllers/userController')
const middlewares = require('../utils/middlewares')

const userRouter = require('express').Router()

userRouter.get('/', userController.getAllUser)
userRouter.post('/signup', userController.Signup)
userRouter.post('/signin', userController.Signin)
userRouter.get("/auth-status", middlewares.verifyToken, userController.verifyUser)

module.exports = userRouter