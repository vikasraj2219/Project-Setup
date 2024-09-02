const mongoose=require("mongoose")
const bycrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    avtar:{
        type:String,
    },
    coverimage:{
        type:String,
    },
    history:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    ],
    password:{
        type:String,
        required:true
    },
    refreshtoken:{
        type:String
    },
},
{
    timestamps:true
}

)

userSchema.pre("save",async function(next){
        if(!this.isModified("password"))return next();
        this.password= await bycrypt.hash(this.password,10)
        next();
})

userSchema.methods.isPasswordCorrect=async function(password){
        return await bycrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User=mongoose.model("user",userSchema);
module.exports=User;