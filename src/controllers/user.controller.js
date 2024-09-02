const asyncHandle=require("../utils/asyncHandler");
const ApiError=require("../utils/ApiError");
const ApiResponse=require("../utils/ApiResponse");
const user=require("../models/user.model");
const uploadOnCloudinary=require("../utils/cloudinary");

const registerUser=asyncHandle(async(req,res)=>{
    const {username,fullname,email,password}=req.body;
    if([username,fullname,password,email].some((field)=>
    field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }
    const userExist=await user.findOne({email});
    if(userExist){
        throw new ApiError(409,"user already exist")
    }
    const avtarLocalPath=req.files?.avtar[0]?.path;
    const coverimageLocalPath=req.files?.coverimage[0]?.path;
    if(!avtarLocalPath){
        throw new ApiError(400,"avtar file is required")
    }
    const avtar=await uploadOnCloudinary(avtarLocalPath);
    console.log(avtar)
    const coverimage=await uploadOnCloudinary(coverimageLocalPath);

    if(!avtar){
        throw new ApiError(400,"avtar file is required")
    }
    const userDetails=new user({
        username:username.toLowerCase(),
        fullname,
        password,
        email,
        avtar:avtar.url,
        coverimage:coverimage?.url || ""
    })
    await userDetails.save();
    const createdUser=await user.findById(userDetails._id).select(
        "-password -refreshtoken",
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    return  res.status(201).json(
        new ApiResponse(200,createdUser,"registration successfully completed")
    )

})

module.exports={registerUser}