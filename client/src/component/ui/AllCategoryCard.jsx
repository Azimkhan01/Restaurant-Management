import React from 'react'
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { FaDotCircle } from "react-icons/fa";
function AllCategoryCard({changes2,setIsChanges2,setType,setIsBack,SetDishCategory,category}) {
  console.log(changes2)
  async function handleOnDelete(id)
  {
    await fetch(`/api/delete-category/${id}`,{method:"DELETE"}).then(res=>res.json()).then((r)=>{
      console.log(r)
      if(r.flag == true )
      {
        setIsChanges2(!changes2)
        // console.log(category)
        console.log("The is succesfull")
        return toast(r.message)
      }
        else
        {
          console.log("This is not succesfull")
          toast(r.message)
        } 
    }).catch((err)=>{
      toast(err)
    })
  }

  return (

    <>
      <div className='flex justify-center w-full md:w-5/6 gap-5'>

<div className='  w-full md:min-w-1/6 p-2 flex flex-row flex-wrap gap-5 '>

{
  (category?.length > 0) 
  ? 
    category.map((category,i)=>{
      console.log(category)
      return <div key={i} className="relative flex-auto w-2/6 group hover:text-white flex  flex-col items-center gap-5 bg-white p-4 shadow rounded-2xl hover:bg-orange-400 transition-all ease-in-out duration-200">
      <h1 className='font-semibold'>{category.order}: {category.category_name}</h1>
      <p className='text-sm font-thin flex justify-center items-center gap-0.5 text-gray-400  group-hover:text-white'> <BiSolidFoodMenu className='text-xl' /> {category.dishes  || 'NA'} </p>
      <div className="min-w-12 border border-orange-300 transition-all ease-in-out duration-400 group-hover:min-w-20  group-hover:border-white"></div>
       <button
             className="text-orange-500 text-xl group-hover:text-2xl  group-hover:text-white transition-all ease-in-out duration-200"
            onClick={()=>{
                setIsBack(true)
                SetDishCategory({id:category["_id"],name:category.category_name,order:category.order})
                setType("Dishes")
            }}
        >
           <BsArrowRightCircleFill />
      </button>
      <button onClick={()=>{handleOnDelete(category["_id"])}} className='absolute top-5 right-5 hover:text-red-700 hover:animate-bounce'>
        <MdDelete/>
      </button>
      <button onClick={()=>{handleOnDelete(category["_id"])}} className={` ${category.status== "Available" ? 'text-green-300' : 'text-red-300' } absolute top-2.5 left-2.5 animate-pulse text-xs`}>
        <FaDotCircle/>
      </button>
    </div>
      
    })
  :
  <div className='min-w-8 border-orange-500 animate-spin rounded-full p-4 border-t-2 border-l-2' >
    {/* <p>Add Category here.</p> */}
  </div>
}

</div>


</div>
    </>
  )
}

export default AllCategoryCard
