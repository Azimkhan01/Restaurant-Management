import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { GoBellFill } from "react-icons/go";
import { BiSolidMessage } from "react-icons/bi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Top({logo,setIsNavOpen,handlerName,handlerRole,setHandlerName,setHandlerRole}) {
    const [search,setSearch] = useState("")
    const [isNotification,setIsNotification]=useState(false)
    const [isMessage,setIsMessage]=useState(false)
    const [isProfile,setIsProfile]=useState(false)
  return (
    <div className='w-full flex flex-col md:flex-row justify-end  items-center p-2 bg-[#FAF9F5]'>

        <div className=' w-full md:w-5/6 flex  self-end  items-center '>
               
               <div className='px-2 w-1/2 flex flex-row items-center md:hidden gap-3'>
                    <button 
                    onClick={()=>{setIsNavOpen(true)}}
                    >
                        <BsArrowRightCircleFill className='text-2xl text-orange-600' />
                    </button>
                    <h1 className='text-3xl font-semibold text-[gray]' >{logo}</h1>
               </div>

               <div className=' hidden md:flex gap-1 w-1/6 shadow p-2 rounded-l-2xl rounded-r-2xl'>
                    <span className='' >
                        <CiSearch className='text-2xl text-[gray]' />
                    </span>
                    <input 
                    type='search' 
                    placeholder='Search..' 
                    value={search} 
                    onChange={(e)=>{setSearch(e.target.value)}} 
                    className='outline-none text-[gray]  placeholder:text-[gray] '
                    />
               </div>
               <div className='flex justify-end w-5/6 items-center gap-3'>
                    <div className='flex '>
                        <div className='relative'>
                            <button onClick={()=>{
                                setIsProfile(false)    
                                setIsMessage(false)
                                setIsNotification(!isNotification)
                                }}>
                                <GoBellFill className='text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-200' />
                            </button>
                            <div className={` ${isNotification ? 'flex translate-y-0' : "opacity-0 -translate-y-[150%]"} transition-all ease-in-out duration-400 z-20  flex-col absolute top-10 -right-10 md:right-10 bg-orange-500 rounded-b-4xl rounded-t-4xl h-100 w-60`}>
                                 <div className='flex justify-center items-center p-5'>
                                    <h1 className=' text-lg md:text-2xl font-semibold text-white' >Notification</h1>
                                 </div>
                                 <div>

                                 </div>   
                            </div>
                        </div>
                        <div className='relative'>
                            <button
                                onClick={()=>{
                                    setIsProfile(false)  
                                    setIsNotification(false)  
                                    setIsMessage(!isMessage)
                                    }}
                            >
                                <BiSolidMessage className='text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-400' />
                            </button>
                            <div className={` ${isMessage ? 'flex translate-y-0' : "opacity-100 -translate-y-[150%]"} transition-all ease-in-out duration-300 z-20  flex-col absolute top-10 -right-10 md:right-10 bg-orange-500 rounded-b-4xl rounded-t-4xl h-100 w-60`}>
                                 <div className='flex justify-center items-center p-5'>
                                    <h1 className=' text-lg md:text-2xl font-semibold text-white' >Notification</h1>
                                 </div>
                                 <div className='bg-white'>

                                 </div>   
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <h1 className='text-black font-semibold'>{handlerName}</h1>
                            <h1 className='text-gray-500 font-semibold'>{handlerRole}</h1>
                        </div>
                        <div>
                            <div>
                                <button
                                 onClick={()=>{
                                     setIsNotification(false)    
                                     setIsMessage(false)    
                                    setIsProfile(!isProfile)
                                    }}
                                >
                                    <PiDotsThreeVertical className='text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-200' />
                                </button>
                                <div className={` ${isProfile ? 'flex shadow' : "opacity-0 -translate-y-[150%] "} transition-all ease-initial duration-400  flex-col absolute top-15 right-10 md:right-10 bg-white  h-40 w-60`}>
                                    <button className='text-left text-gray-500 p-2'>Profile</button>
                                    <button className='text-left text-gray-500 p-2'>Privacy Setting</button>
                                    <button className='text-left text-gray-500 p-2 border-t-1  '>Logout</button>
                                 <div className='bg-white'>

                                 </div>   
                            </div>
                            </div>
                        </div>
                    </div>
               </div> 
        </div>
    </div>
  )
}

export default Top
