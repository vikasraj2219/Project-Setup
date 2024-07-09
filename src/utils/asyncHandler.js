const asyncHandle=(fn)=>async(req,res,next)=>{
    try{
        await fn(req,res,next);
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

module.exports=asyncHandle;