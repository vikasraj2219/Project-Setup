const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const userRouter=require("./routes/user.routes");


app.use("/api/v1/users",userRouter)

module.exports=app;