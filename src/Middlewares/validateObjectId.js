const mongoose=require('mongoose');

module.exports=function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        throw new Error("Invalid Id")
    next();
}