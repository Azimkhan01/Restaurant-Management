import React, { useActionState, useState } from 'react'
import { toast } from 'react-toastify';

function NewTable() {
    const [err, submitAction, isPending] = useActionState(handleSubmit, undefined);
    const [tableNumber,setTableNumber] = useState(1);
    function handleSubmit(prev,formData)
    {
        // const d = Object.fromEntries(formData.entries())
        const total_table = []
        for(let i=0;i<tableNumber;i++)
        {
            
            total_table[i]=Number((formData.get('t'+i))) 
        }
        const temp = {}
         temp["name"] = formData.get('name')
         temp['total_table'] = Number(tableNumber)
         temp['table_size'] = total_table 
         fetch('/api/add-table',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(temp),
            credentials:"include"
         }).then(res=>res.json()).then((r)=>{
            toast(r.message)
         }).catch((err)=>{
        toast(err)
        })
    }
   
  return (
    <>
      <form className='flex flex-col gap-5' action={submitAction} >

<div>
    <input type='text' name='name'  className='p-2 outline-0 border-1 rounded' placeholder='Enter Room Name' />
</div>

<div>
    <input 
    type='number' 
    value={tableNumber} 
    name='total'
    onChange={(e)=>{
      if(e.target.value > 50 || e.target.value < 0)
      {
        setTableNumber(prev=>prev) 
      }
      else
      setTableNumber(e.target.value)
    }}  
    className='p-2 outline-0 border-1 rounded' 
    placeholder='Enter Number of Seat at table ' 
    />
</div>

{
  Array.from({ length:tableNumber}).map((_,i)=>{
    return(
         <div key={i}>
            <input type='number' name={'t'+i} className='p-2 outline-0 border-1 rounded' placeholder={`Person on Table ${i + 1}`} />
        </div>
    )
  })
}

<div>
  <input disabled={isPending} className={`${isPending ? 'bg-amber-400' : 'bg-amber-600' } rounded-4xl text-white py-2 px-4`}  value={"Add Table"}  type='submit' />
</div>

</form>
    </>
  )
}

export default NewTable
