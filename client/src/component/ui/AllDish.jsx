import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import AllCategoryCard from './AllCategoryCard';
function AllDish() {
  const [isBack,setIsBack] = useState(false)
  const [dishCategory,SetDishCategory] = useState([])
  const [dish,setDish] = useState([])
  const [category,setCategory] = useState([])
  const [filter,setFilter] = useState([])
  const [type,setType] = useState("Category")
  useEffect(()=>{
    fetch('/api/show-category',{method:"GET"}).then(res=>res.json()).then((res)=>{setCategory(res.category)})
  },[])
  useEffect(()=>{
    fetch('/api/show-dishes',{method:"GET"}).then(res=>res.json()).then((res)=>{setDish(res.data)})
  },[])

 useEffect(()=>{
  fetch(`/api/show-dishes/${dishCategory}`).then(res=>res.json()).then((data)=>{console.log(data)})
 },[dishCategory])

  return (
    <div className=' w-full md:w-auto flex flex-col items-center border-t-2 border-orange-300 bg-[#FBF9F0] p-4'>
        
        <div className='flex justify-between md:gap-20 items-center w-full md:w-auto' >
            {(isBack && <button 
            onClick={()=>{
              setIsBack(false)
              setType("Category")
            }} 
            className='p-2 rounded-full bg-orange-400 flex justify-center items-center text-white hover:bg-orange-50 hover:text-black transition-all ease-in-out duration-200'><IoIosArrowBack/></button>)}
            <h1 className=' text-2xl md:text-4xl text-gray-500  font-semibold p-4'>{type}</h1>
        </div>

        {
          isBack 
          ?
          <div><p>This is the page where Dishes will be shown</p></div>
          :
          <AllCategoryCard setType={setType} setIsBack={setIsBack} SetDishCategory={SetDishCategory}  category={category} />
        }

    </div>
  )
}

export default AllDish
