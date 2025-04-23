import React, { useState } from 'react'
import AddCategory from '../ui/AddCategory'
import AddDish from '../ui/AddDish'
import AllDish from '../ui/AllDish'
function AddProduct() {
  
  const [category,setCategory] = useState(false)
  const [dish,setDish] = useState(false)
  const [allDish,setAllDish] = useState(true)
  
    return (
    <>
      <section className='h-screen w-full'>
      <div className='w-full bg-[#FBF9F0]'>
          <div className='w-full p-4 flex gap-5 justify-center '>
                <button onClick={()=>{setCategory(!category)}} className={` ${category ? "bg-orange-500 text-white" : "bg-white text-black"} px-3 py-2 font-semibold transition-all ease-in-out duration-150 rounded-4xl  hover:bg-orange-400`}>Add Category</button>
                <button onClick={()=>{setDish(!dish)}} className={` ${dish ? "bg-orange-500 text-white" : "bg-white text-black"} px-3 py-2 font-semibold transition-all ease-in-out duration-150 rounded-4xl  hover:bg-orange-400`}>Add Dish</button>
                <button onClick={()=>{setAllDish(!allDish)}} className={` ${allDish ? "bg-orange-500 text-white" : "bg-white text-black"} px-3 py-2 font-semibold transition-all ease-in-out duration-150 rounded-4xl  hover:bg-orange-400`}>Show Dishes</button>
          </div>
          {
              (category === false && dish === false && allDish === false) 
              &&
              <div className='h-screen flex justify-center items-center '>
                <div>
                   <p className='text-black text-center text-2xl'>Add Category and Dishes to that category and see what dishes you have</p>
                </div>
              </div> 
          }
          {
            (category && <AddCategory/>)
          }
          {
            (dish && <AddDish/>)
          }
          {
            (allDish && <AllDish/>)
          }
      </div>  
     </section>
    </>
  )
}

export default AddProduct
