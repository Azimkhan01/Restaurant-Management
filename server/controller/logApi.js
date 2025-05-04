const {logModel}  = require('../database/db')
const logApi = async(req,res)=>{
    
    const limit = req.query.limit
    const skip =  req.query.skip   
    console.log(limit,skip)
    
    try{

        const a = await logModel.find({}).sort({createAt: -1 }).skip(skip).limit(limit)
        if(a?.length <= 0 )
        {
            res.setHeader("length",0)
            return res.status(200).json({message:"No Log to Show.",flag:false})
        }
        else{
            return res.status(200).json({message:"Log Find succesfully",flag:true,data:a});
        }

    }
    catch(err)
    {
        return res.status(500).json({message:"Server Broke Try in sometime.",flag:false})
    }

}

module.exports = {logApi}