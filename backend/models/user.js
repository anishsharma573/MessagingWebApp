const mongoose = require('mongoose')
const  validator =  require('validator')
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[40,"Name should not exceed 40 words"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid email"],
        unique:true,
        trim:true,
        lowercase:true
       
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Please enter atleast 6 character"]
    },
    role:{
        type:String,
        default:'user'
    },
    photo:{
        id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        },
    
    },
    forgetPasswordToken :String,
    forgetPasswordExpiry:Date
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

// encrpytion before save


userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        return next()
        
    }

     this.password = await bcrypt.hash(this.password,10)
 next()
})


//methods comapare the user send password and the password in the backend



userSchema.methods.isValidatedPassword = async function(userSendPassword){
    return bcrypt.compare( userSendPassword, this.password)
}




// creating jwt Token

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}


// creating the forgot password token
userSchema.methods.forgotPasswordToken =function(){

    // generate long and random sTring

    const forgotToken = crypto.randomBytes(20).toString('hex')

    // get a hash on the backend as well

    this.forgetPasswordToken =crypto
    .createHash('sha256')
    .update(forgotToken)
    .digest('hex')

    // time of the  token

    this.forgetPasswordExpiry =Date.now()+30*60*1000

    return forgotToken
}

module.exports = mongoose.model("User",userSchema)