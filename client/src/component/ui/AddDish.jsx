import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
function AddDish({setChanges}) {
    const [category,setCategory] = useState([])
    const [priceCol,setPriceCol] = useState([])
    const [isDisable,setIsDisable] = useState(false)
    useEffect(()=>{
        fetch("/api/show-category").then(res=>res.json()).then((data)=>{
             if(data.flag)
            {
                setIsDisable(true)
                setChanges(prev=>!prev)
                setCategory(data.category)
                // setPriceCol(data.category)
                // console.log(data.category[0]["priceCol"])
                return
            }
            else{
                setIsDisable(false)
               return   toast("Category Name is required",{
                        style: {
                            
                            backgroundColor: '#ffedd5', // Tailwind orange-500
                            color: 'tomato',
                          }
                    }) ;
            }

        })
    },[])
    const handleSubmit = async (prev, formData) => {
           
            const f = Object.fromEntries(formData.entries());
            console.log(f)
          
            if (!formData.get("dish_name"))
              return  toast("Dish Name is required.",{
                style: {
                    
                    backgroundColor: '#ffedd5', // Tailwind orange-500
                    color: 'tomato',
                  }
            }) ;
            if (!formData.get("category_id"))
                return  toast("Category Name is required.",{
                    style: {
                        
                        backgroundColor: '#ffedd5', // Tailwind orange-500
                        color: 'tomato',
                      }
                }) ;
                let pc = priceCol.map((el)=> {
                    let temp = {name:el,price:Number(f[`${el}`])}
                    console.log(temp)
                    delete f[`${el}`]
                    return temp
                } )
                f["priceCol"] = pc
                console.log("pc")
                console.log(pc)
                console.log("f")
                console.log(f)
          
            fetch('/api/add-dish',{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(f),
                credentials:"include"
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
                if(data.flag)
                    toast(data.message,{
                        style: {
                            backgroundColor: '#f97316', // Tailwind orange-500
                            color: 'white',
                          }
                    })
                else 
                 toast(data.message,{
                    style: {
                        backgroundColor: '#ffedd5', // Tailwind orange-500
                        color: 'tomato',
                      }
                })
            }).catch((err)=>{
                {err,":Some error happen please wait ."}
            })
            
            return { success: true };
          };
          
          const [error, submitAction, isPending] = useActionState(handleSubmit, undefined);
          function handleCategoryChange(e)
          {
            console.log(e.target.value)
            category.forEach((el) => {
                if(el["_id"] == e.target.value)
                {
                    console.log(el.priceCol)
                    return setPriceCol(el.priceCol)
                }
            });
          }

  return (
    <div className='border-t-2 border-orange-300 '>
        
    <form action={submitAction} className='flex flex-col gap-5 items-center p-4'>

        
    <div className='p-2 flex gap-5 item font-semibold '>
        <label htmlFor='dish_name'>Dish Name:</label>
        <input className='outline-none border-1 border-gray-400 p-2 rounded' type='text' name='dish_name' placeholder='Enter Dish Name  ex : Dubia Special' />
    </div>

    <div className=' w-full md:w-auto p-2 flex gap-5 items-center font-semibold '>
        <label className='w-1/2 md:w-auto' htmlFor='category'>Category:</label>
        <select className=' w-1/2 md:w-auto outline-none border-1 p-2 rounded' name='category_id' onChange={(e)=>{handleCategoryChange(e)}}>
            <option value={""}disabled selected>Select Category</option>
            {
                
                (category.length>0 && category.map((category,i)=>{
                    return <option key={i} value={category['_id']} >{category.order}. {category.category_name}</option>
                }))

            }
        </select>
        {/* <input className='outline-none border-1 border-gray-400 p-2 rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' name='order' placeholder='Enter order  ex :  12' /> */}
    </div>

    <div className='flex flex-wrap gap-2'>
            {
                (priceCol.length>0)
                ?   
                priceCol.map((el,i)=>{
            return <input key={i} min={0} onChange={(e)=>{if(e.target.value < 0 )
            {
                e.target.value  = 0
            }else{
                if(e.target.value == "")
                {
                    toast(`The ${el} is required` )
                    e.target.value = ""
                }
            }
            }}  className='outline-none border-1 border-gray-400 p-2 rounded font-semibold' type='number' name={el} placeholder={`Enter ${el} ex: 500  `} required/>
                })
                :""
            }
    </div>            

    <div className=' flex flex-row gap-6 w-full md:w-auto justify-center'>
        <input type='submit' disabled={isPending && isDisable} value={"Add Dish"} className={` ${(isPending && isDisable) ? "bg-orange-400" : "bg-orange-500" } px-4 py-2 text-white  rounded-4xl w-auto`} />
    </div>

    

    </form>
    
</div>
  )
}

export default AddDish
