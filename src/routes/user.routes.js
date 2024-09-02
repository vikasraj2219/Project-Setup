const express=require("express");
const router=express.Router();
const {registerUser}=require("../controllers/user.controller");
const upload=require("../middleware/multer.middleware");

router.route("/register").post(upload.fields([
    {
        name:"avtar",
        maxCount:1
    },
    {
        name:"coverimage",
        maxCount:1
    }
]),registerUser)



module.exports = router;