const { OpenAI, } = require("openai")
const User = require("../models/User")
const configureOpenAI = require('../utils/openAiConfig')

const chatController = {
    generateChat:async(req,res)=>{
        const {message} = req.body
        try{
        const user = User.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).josn({message:"User not registered!"})
        }
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
          }));
          chats.push({ content: message, role: "user" });
          user.chats.push({ content: message, role: "user" });

          const config = configureOpenAI()
          const openAi = new OpenAI(config)
          const chatResponse = await openAi.createChatCompletion({model:"gpt-3.5-turbo",messages:chats})

          user.chats.push(chatResponse.data.choices[0].message);
          await user.save();
          return res.status(200).json({ chats: user.chats });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }

    }
}



module.exports = chatController