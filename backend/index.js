const express = require("express")
const app = express()
const connectWithDb = require("./config/db")

require('dotenv').config()
const cloudinary = require('cloudinary')

// connect with database
connectWithDb();
// cloudinary goes here 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});


const PORT = process.env.PORT


const morgan = require('morgan')
//morgan middleware
app.use(morgan('tiny'))
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload')

//regular middleware

app.use(express.json())
app.use(express.urlencoded({extended:true})) //. The extended: true option allows for parsing of nested objects in the URL-encoded data.
//cookie and file upload middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

const home = require("./routes/home")
const user = require("./routes/user")



app.use('/api/v1',home)
app.use('/api/v1',user)

app.listen(PORT,(req,res)=>{
    console.log(`Server is Running at ${PORT}`);
})