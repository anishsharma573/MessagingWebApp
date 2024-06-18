const mongoose = require('mongoose')
import validator from 'validator'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[40,"Name should not exceed 40 words"]
    },
    email:{
        type:email,
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
    forgotPasswordToken :String,
    forgotPasswordExpiry:Date
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

// encryption before save - hooks 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password=await bcrypt.hash(this.password,10)
})



///methods

// validate the password check the password send by the user matches the password in the database



userSchema.methods.isValidatedPassword = async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}

