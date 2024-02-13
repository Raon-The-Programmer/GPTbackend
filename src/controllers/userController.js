const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, COOKIE_NAME } = require("../utils/config")

const userController = {
    getAllUser:async(req,res)=>{
        try{
            const users = await User.find()
            return res.status(200).json({message:"OK",users})
        }
        catch(err){
            return res.status(400).json({message:"ERROR",cause:err.message})
        }
    },
    Signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!password || password.length < 2 || !email || !name) {
                return res.status(400).json({ message: "Please provide the credentials properly" });
            }
            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(401).json({ message: "Email already exists. Please use a different email." });
            }
    
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: passwordHash });
            const savedUser = await user.save();
            console.log(savedUser);
            return res.status(201).json({ message: "User Created!" });
        } catch (err) {
            return res.status(500).json({ message: "ERROR", cause: err.message });
        }
    },
    Signin:async(req,res)=>{
        try{
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(401).json({message:"User not registered"})
            }
            const checkPassword = await bcrypt.compare(password,user.password)
            if(!checkPassword){
                return res.status(403).json({message:"Incorrect Password"})
            }

            res.clearCookie(COOKIE_NAME,{
                path:'/',
                httpOnly:true,
                domain:'localhost',
                signed:true
            })
            
            const payload = {name:user.name,email:user.email,id:user._id}
            const token = jwt.sign(payload,JWT_SECRET,{expiresIn:'6hr'})
            const expires = new Date()
            expires.setDate(expires.getDate() + 1)
            res.cookie(COOKIE_NAME,token,{
                path:'/',
                domain:'localhost',
                httpOnly:true,
                expires,
                signed:true
            })
            return res.status(200).json({name:user.name,Token:token})
        }
        catch(err){
            return res.status(500).json({Error:err.message})
        }
    },
    verifyUser : async(req,res,next)=>{
        try {
            // User token check
            const user = await User.findById(res.locals.jwtData.id);
            if (!user) {
              return res.status(401).send("User not registered OR Token malfunctioned");
            }
            if (user._id.toString() !== res.locals.jwtData.id) {
              return res.status(401).send("Permissions didn't match");
            }
            return res.status(200).json({ message: "OK", name: user.name, email: user.email });
          } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "ERROR", cause: error.message });
          }
    }
    
    
}

module.exports = userController