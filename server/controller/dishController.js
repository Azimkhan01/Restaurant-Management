const {categoryModel,dishModel} = require('../database/db')
const Log = require('./logController')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()
const addDish = async(req,res)=>{

    const {dish_name,priceCol,category_id} = req.body
    console.log(priceCol)
   try{

    if(!dish_name)
        return res.status(422).json({message:"The dish name is required",flag:false})

    if(!category_id)
        return res.status(422).json({message:"The Category of the dish is required",flag:false})

    const  findCategory = await categoryModel.findById(category_id)
        if(findCategory == null && !findCategory)
            return res.status(404).json({message:"The categroy provided is not exist.",flag:false})
    const findDish = await dishModel.find({dish_name:dish_name,category_id:category_id})
        // console.log(findDish)
        if(findDish.length > 0)
        return res.status(409).json({message:"The dish name already exist.",flag:false})

    const addNewModel = await dishModel.create({category_id,dish_name,priceCol})
        if(addNewModel)
            {
                const editCategory = await categoryModel.findByIdAndUpdate(category_id,{$inc:{"dishes":1}},{new:true})
                
                if(editCategory)
                {
                const m = `The dish with the name : ${dish_name.toUpperCase()} with category name: ${(findCategory.category_name).toUpperCase()} is added succesfully`
                Log.init_req(m,req)
                res.status(201).json({message:"The data is created succesfully",flag:true})
                }
                else
                {
                    return res.status(500).json({message:`The category with  id: ${category_id} and name: ${findCategory.name} is not updated but dish is added`})
                }

            }
        else
            res.status(500).json({message:"Some server error happen.",flag:false})

   }
   catch(err)
   {
       return res.status(500).json({message:`Dish with ${dish_name} is not created please try in some type ${err}`})
   } 

}

const showDish = async (req, res) => {
    try {
      const result = await dishModel.aggregate([
        {
          $sort: { category_id: 1, dish_name: 1 }
        },
        {
          $group: {
            _id: "$category_id",
            dishes: {
              $push: {
                _id: "$_id",
                dish_name: "$dish_name",
                priceCol:"$priceCol",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
              }
            }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      // Transform the output as requested
      const formatted = result.map(group => ({
        [group._id]: group.dishes
      }));
  
      return res.json({
        message: "The dishes found successfully.",
        data: formatted,
        flag: true
      });
  
    } catch (err) {
      console.error("Aggregation error:", err);
      return res.json({
        message: "Some error happened, please try again later.",
        flag: false
      });
    }
  };

const ShowDishById = async(req,res)=>{
  try{

    if(!req.params.id)
      res.status(429).json({message:"The Category id is not Provide Please Provide Category Id"})

    const  checkCategory = await categoryModel.findById({_id:req.params.id})
    if(checkCategory)
    {
      const data = await dishModel.find({category_id:req.params.id})
        console.log(data)
      if(data.length > 0)
      {
        return res.status(200).json({message:"The Dishes is found",data:data,flag:true})
      }
      else
        return res.status(200).json({message:`There is no dishes so first add the dishes in category name :${checkCategory.category_name}`,flag:false})
    }
    else
    return res.status(404).json({message:"The category is not found so there is no dishes"})

  }
  catch(err)
  {
    return res.status(500).json({ message: "Some error happened, please try again later.",
      flag: false})
  }
}
  
  


module.exports = {addDish,showDish,ShowDishById}