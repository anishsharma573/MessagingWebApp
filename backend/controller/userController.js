const User = require("../models/user")
const fileUpload = require("express-fileupload");
const BigPromise = require("../middleware/BigPromise");
const user = require("../models/user");
const CustomError = require("../utils/CustomError");
const cloudinary = require('cloudinary') 
const cookieToken = require("../utils/cookieToken")
exports.signUp =BigPromise(async (req,res,next)=>{
try {
    
    if(!req.files){
        throw new CustomError("Photos are required for signUp",400)
    }

    const file = req.files.photo;

    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        folder:'users',
        widyh:150,
        crop:'scale'
    })


    const {name,email,password}=req.body

    if(!email  || !name || !password){
        return new CustomError("Name ,email and password are requried for SignUp",400)
    }

    const user = await User.create({
        name,
        email,
        password,
        photo:{
            id:result.public_id,
            secure_url:result.secure_url
        }
    })

    cookieToken(user,res)
} catch (error) {
    next(error)
}
})

