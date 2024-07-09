const mongoose=require("mongoose")

const userSchema=new mongoose({
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
    avthar:{
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

const User=mongoose.model("user",userSchema);
module.exports=User;