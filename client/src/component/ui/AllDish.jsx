import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import AllCategoryCard from './AllCategoryCard';
import DishCard from './dishCard';
import { toast } from 'react-toastify';
function AllDish({changes}) {
  console.log("rendering all dishes ...")
  const [isBack,setIsBack] = useState(false)
  const [dishCategory,SetDishCategory] = useState([])
  const [dish,setDish] = useState([])
  const [category,setCategory] = useState([])
  const [type,setType] = useState("Category")
  const [changed,setIsChanged] = useState(false)
  const [changes2,setIsChanges2] = useState(false)
  useEffect(()=>{console.log('changes chaged 22')},[changes2])
  useEffect(()=>{
    console.log("running the category state")
    fetch('/api/show-category',{method:"GET"}).then(res=>res.json()).then((res)=>{setCategory(res.category)})
  },[changes,changes2])
  // useEffect(()=>{
  //   fetch(`/api/show-dishes`,{method:"GET"}).then(res=>res.json()).then((res)=>{setDish(res.data)})
  // },[])

 useEffect(()=>{
  if(dishCategory.id != undefined)
  {
    fetch(`/api/show-dishes/${dishCategory.id}`).then(res=>res.json()).then((data)=>{
      setDish(data.data)
    })
  }
 },[dishCategory,changed,changes])

     function handleDelete(id)
     {
         fetch(`/api/delete-dish/${id}`,{
             method:"DELETE"
         }).then(res=>res.json()).then((r)=>{
          console.log(r)
             if(r.flag)
             {
                  console.log("deleted",r.message)              
                 toast(r.message)
                 setIsChanged(!changed)
             }else{
                 toast(r.message)
             }
         })
     }
 

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
            <>
              <div>
                <h1 className='font-semibold text-xl md:text-2xl' >{dishCategory.name}</h1>
              </div>
              <div className='p-4 flex flex-wrap gap-5'>
                  {
                    dish?.length>0
                    ?
                      dish.map((n,i) => <DishCard key={i} dish={n} handleDelete={handleDelete} />)
                    :
                      <p>There is not Dish for the category: {dishCategory.name}</p>
                  }
              </div>
            </>
          :
          <AllCategoryCard changes2={changes2}  setIsChanges2={setIsChanges2} setType={setType} setIsBack={setIsBack} SetDishCategory={SetDishCategory}  category={category} />
        }

    </div>
  )
}

export default AllDish
