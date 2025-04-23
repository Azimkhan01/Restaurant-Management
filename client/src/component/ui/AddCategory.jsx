import React,{useActionState, useEffect, useState} from 'react'
import { toast } from 'react-toastify';

function AddCategory() {
const [categoryOrder,setCategoryOrderValue] = useState(0)
const [isLoading,setIsLoading] = useState(false)
const [reload,setReload] = useState(false)
    useEffect(()=>{
        setIsLoading(true) 
        fetch("/api/show-category").then(res=>res.json()).then((data)=>{
            if(data.flag)
            {                

                setIsLoading(false)

                setCategoryOrderValue(Number(data.category[data.category.length-1].order) + 1) 
                return
            }
            else{
                setIsLoading(false)
                
                setCategoryOrderValue(0) 
            }

        })
    },[reload])

    const [priceCol,setPriceCol] = useState(1)
    const handleSubmit = async (prev, formData) => {
        
        const categoryName = formData.get("category_name");
        const order = formData.get("order");
        const status = formData.get("status");
        const pc = []
        for(let i=0;i<priceCol;i++)
        {
            let f =formData.get(`col-${i}`)
            pc.push(f)
            console.log(pc)
        }
        if (!categoryName)
          return  toast("Category Name is required",{
            style: {
                
                backgroundColor: '#ffedd5', // Tailwind orange-500
                color: 'tomato',
              }
        }) ;
        if (!order)
            return  toast("Category Name is required",{
                style: {
                    
                    backgroundColor: '#ffedd5', // Tailwind orange-500
                    color: 'tomato',
                  }
            }) ;
        if (!status)
            return  toast("Category Name is required",{
                style: {
                    
                    backgroundColor: '#ffedd5', // Tailwind orange-500
                    color: 'tomato',
                  }
            }) ;
      
        fetch('/api/add-category',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({category_name:categoryName,priceCol:pc,order:order,status:status}),
            credentials:"include"
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.flag)
            {
                setReload(!reload)
                toast(data.message,{
                    style: {
                        backgroundColor: '#f97316', // Tailwind orange-500
                        color: 'white',
                      }})
            }
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
      

    

  return (
    <div className='border-t-2 border-orange-300'>
        
        <form action={submitAction} className='flex flex-col gap-5 items-center p-4'>

            
        <div className=' w-full md:w-auto p-2 flex gap-2.5 md:gap-5 items-center font-semibold '>
            <label className='w-1/2 md:w-auto' htmlFor='category_name'>Category:</label>
            <input className='outline-none border-1 border-gray-400 p-2 rounded' type='text' name='category_name' placeholder='Enter Category Name  ex : Desert' />
        </div>

        <div className=' w-full md:w-auto p-2 flex gap-2.5 md:gap-5 items-center font-semibold '>
            <label className='w-1/2 md:w-auto'  htmlFor='order'>Order:</label>
            {
                isLoading
                ? 
                    <div className='rounded-full min-h-5 p-4 animate-spin border-t-2 border-l-2 border-orange-500'> 
                        
                    </div>
                :<input value={categoryOrder} onChange={(e)=>{setCategoryOrderValue(e.target.value)}} className='outline-none border-1 border-gray-400 p-2 rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ' type='number' name='order' placeholder='Enter order  ex :  12' />

            }
        </div>

        <div className=' w-full md:w-auto p-2 flex gap-2.5 md:gap-5 items-center font-semibold '>
            <label className='w-1/2 md:w-auto'  htmlFor='order'>Price Col:</label>
            <input className='outline-none border-1 border-gray-400 p-2 rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' value={priceCol} 
            onChange={(e)=>{ 
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= 20) {
                    setPriceCol(value);
                }
                 else if (e.target.value === '') {
                    toast("The Should be greater than 1 or less than 20 ")
                    setPriceCol('');
                }}}
                max={20} min={1}  placeholder='Enter Price Col' />
        </div>
        
        <div className={`flex justify-center gap-x-1 gap-y-4 w-full md:w-auto flex-wrap`}>
            {
                Array.from({length:priceCol}).map((_,i)=>{
                    return <>

                     <input className={`outline-none border-1 border-gray-400 p-2 rounded  w-5/6  md:w-auto`} type='text' name={'col-'+ i} placeholder={`Col name`} required/>                
                    </>
                })
            }
        </div>

        <div className='p-2 flex gap-5 font-semibold '>
            <label>Status:</label>
            <div className='flex gap-2.5'>
                <label htmlFor='status' >Available</label>
                <input   name='status' type='radio' value={"Available"} />
            </div>
            <div className='flex gap-2.5'>
                <label htmlFor='status'>Not Available</label>
                <input   name='status' type='radio' value={"Not Available"}   />
            </div>
        </div>

        <div>
            <input type='submit' disabled={isPending} value={"Add Category"} className={` ${isPending ? "bg-orange-400" : "bg-orange-500" } px-4 py-2 text-white  rounded-4xl`} />
        </div>

        

        </form>
        
    </div>
  )
}

export default AddCategory
