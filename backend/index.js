const express = require("express")

require('dotenv').config()
const app = express()

const PORT = process.env.PORT
const home = require("./routes/home")

app.use('/api/v1',home)

app.listen(PORT,(req,res)=>{
    console.log(`Server is Running at ${PORT}`);
})