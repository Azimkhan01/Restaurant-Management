const {categoryModel,userModel,dishModel} = require('../database/db')
const Log = require('../controller/logController')
const jwt = require('jsonwebtoken')
const addCategory = async(req,res)=>{
        // console.log("asked")
    try{

        const {category_name,order,status,priceCol} = req.body
        // console.log(req.body)
    if(!category_name)
        return res.status(422).json({message:"Category name is required !!",flag:false})
    if(!order)   
        return res.status(422).json({message:"Order is required !!",flag:false})
    if(!status)
        return res.status(422).json({message:"Status is required !!",flag:false})
    const isCategoryName = await categoryModel.findOne({category_name:category_name})
    console.log(isCategoryName)
    if(isCategoryName != null)
        return res.status(409).json({message:`Category with order : ${isCategoryName.order} is already exist`})
    const isOrder = await categoryModel.findOne({order:order})
    // console.log(isOrder)
    if(isOrder != null)
       return res.status(409).json({message:`Order with Category name : ${isCategoryName.category_name} is already exist`})
    
    const newCategory = await categoryModel.create({category_name:category_name,order:order,status:status,priceCol:priceCol})
    // console.log(newCategory)
        if(newCategory)
        {
            let message,by,role
            message = `New Category is created with category name: ${newCategory.category_name} and order: ${newCategory.order}`
            const token = req.cookies.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            role = decoded.role
            const findUser = await userModel.findById(decoded.id,{name:1})
            by=findUser.name
            Log.init(message,by,role)
            
            return res.status(201).json({message:"The category is created succesfully",flag:true})
        }
        else{
            return res.status(500).json({message:"the category is not created ",flag:false})
        }
    }
    catch(err)
    {
            console.log(err)
            return res.status(500).json({message:"Some uncaught error happen please try in sometime."})
    }
    
}


const showCategory = async(req,res)=>{
    try{
      
        const getcategory = await categoryModel.find()
        if(getcategory.length > 0)
            res.status(200).json({category:getcategory,flag:true})
        else
            res.json(204).json({message:"There is not Category",flag:false})
    }
    catch(err)
    {
        return res.status(500).json({message:"Some internal Error happen",flag:false})
    }
}

const deleteCategory = async(req,res)=>{
    try{

        if(!req.params.id)
            return res.status(422).json({message:"The id is not provided please give id"})
        const checkCategory = await categoryModel.findById(req.params.id)
        if(!checkCategory)
            return res.status(404).json({message:"The category is already deleted.",flag:false})
        const deleteDish = await dishModel.deleteMany({category_id:req.params.id})
        if(!deleteDish)
            return res.status(500).json({message:"The error occur while deleting category related dishes",flag:false})
        const deleteCat = await categoryModel.deleteOne({_id:req.params.id},{new:true})
        if(!deleteCat)
            return res.status(500).json({message:'The dishes is deleted but the cateogory is not deleted',flag:false})
        if(deleteCat)
            {
                        const m = `The category with name ${checkCategory.category_name} and its related dishes are deleted`
                        Log.init_req(m,req)
                        return res.status(200).json({message:"The category is deleted succesfully",flag:true})
            }    
    }
    catch(err)
    {
        return res.status(500).json({message:"Some error occur try in some time",flag:false})
    }
}

module.exports = {addCategory, showCategory, deleteCategory}