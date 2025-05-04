import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ExistingTable() {
    const [tables, setTables] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTable,setSelectedTable] = useState([])
    useEffect(() => {
        setIsLoading(true)
        fetch('/api/show-table')
            .then(res => res.json())
            .then((r) => {
                console.log(r);
                setTables(r.data); // Assuming 'r' is an array of tables
                setIsLoading(false); // Stop loading when data is fetched
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false); // Stop loading on error as well
            });
    }, []);

    function handleTable_NameChange(e)
    {
        // console.log(e.target.value)
        const temp = tables.filter(name=>name['_id'] == e.target.value )
        setSelectedTable([...temp])
        // console.log(selectedTable)
    }
    const deleteTable = async(id)=>{
        // console.log(id)
        setIsLoading(true)
        // setTimeout(()=>{
        // },2000)
       await fetch(`/api/remove-table/${id}`,{method:"DELETE"}).then(res=>res.json()).then((r)=>{
        
        if(r.flag)
        {
            
            toast(`The ${selectedTable[0].name} is deleted.`)
            setIsLoading(false)
            setSelectedTable([])
        }else{
            toast(`The table with name: ${selectedTable[0].name} is not deleted`)
            setIsLoading(false)
        }
       }).catch((err)=>{
        toast(`Some Server Error happen try in sometime.`)
        setIsLoading(false)
       })

    }
console.log(selectedTable)
    return (
        <div>
            {isLoading ? (
                <div className="space-y-4 p-4 w-[50rem]">
                    {/* Shimmer Effect Placeholders */}
                    <div className="min-w-full py-7 px-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-md"></div>
                    <div className="min-w-full py-7 px-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-md"></div>
                    <div className="min-w-full py-7 px-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-md"></div>
                </div>
            ) : (
                <form>
                   
                   <div>
                        <label className='font-semibold'> Select Table Name </label>
                        <select onChange={(e)=>{handleTable_NameChange(e)}} name='table_id'  className='p-2 outline-0'>
                            <option selected disabled >Select Table Name</option>
                            {
                                tables?.length>0
                                ?
                                tables.map((name,i)=>{
                                    return <option className='text-orange-400' key={i} value={name['_id']}>{name.name}</option>
                                })
                                : <option disabled >No Table</option>
                            }
                        </select>
                   </div>

                   <div className='font-sans'>
                            {
                                selectedTable?.length>0
                                ? 
                                <div className='flex flex-col gap-3'>
                                    <div>
                                    <label>Table Name: </label>
                                    <input className='border-1 outline-0 p-1 rounded border-gray-300'  type='text' value={selectedTable[0]["name"]}  readOnly />
                                    </div>
                                    <p className='self-center  text-gray-500' >TABLE</p>
                                    <table className=" border border-gray-300 rounded">
                                        <thead className="bg-orange-400 text-white">
                                            <tr>
                                                <th className="px-4 py-2 text-left border border-orange-500">Table No.</th>
                                                <th className="px-4 py-2 text-left border border-orange-500">Total Person</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-100 text-gray-800">
                                            {selectedTable[0].table_size.map((d, i) => (
                                                <tr
                                                     key={i}
                                                     className="hover:bg-orange-100 even:bg-gray-200 transition-colors"
                                                    >
                                                        <td className="px-4 py-2 border border-gray-400">{i + 1}</td>
                                                        <td className="px-4 py-2 border border-gray-400">{d}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                        <button className='p-4 bg-orange-400 text-white rounded-4xl hover:animate-pulse' type='button' onClick={()=>{deleteTable(selectedTable[0]["_id"])}} >
                                            Delete
                                        </button>
                                </div>
                                :<p>Please select the table name you want to edit and it not there created a new one</p>
                            }
                   </div>
                   
                </form>
            )}
        </div>
    );
}

export default ExistingTable;
