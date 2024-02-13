const {Configuration} =require('openai')
const { AI_SECRET_KEY, ORGANIZATION_ID } =require('./config') 


const configureOpenAI = ()=>{
    const config = new Configuration({
        apiKey:AI_SECRET_KEY,
        organization:ORGANIZATION_ID
    })
    return config
}

module.exports = configureOpenAI