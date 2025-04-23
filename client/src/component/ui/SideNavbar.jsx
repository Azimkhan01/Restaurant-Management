import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
function SideNavbar({logo,isNavOpen,setIsNavOpen}) {
    const {pathname} = useLocation()
    const structure = [{name:'Menu',link:'/menu'},{name:'Table',link:'/table'},{name:'Restaurant',link:'/add-table'}]

  return (
    <nav className={`${isNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} z-5 group w-full md:w-1/18 hover:md:w-1/6 transition-all ease-in-out duration-200 fixed top-0  bg-[#FBF9F0] h-screen`}>
        
        <div className='w-full flex justify-between md:justify-center items-center p-4 ' >
        <Link className='text-2xl p-2 font-semibold rounded-full bg-[#F8CFB3] text-center w-full font-serif hidden md:block group-hover:hidden  transition-all ease-in-out duration-100' to={'/'}>
            <h1>{logo[0]}</h1>
        </Link>
        <Link className='text-2xl p-2  font-semibold rounded-full bg-[#F8CFB3] text-center w-5/6 md:w-full font-serif block md:hidden group-hover:block  transition-all ease-in-out duration-100' to={'/'}>
            <h1>{logo}</h1>
        </Link>
            <button className='md:hidden'
            onClick={()=>{setIsNavOpen(false)}}
            >
                <span className='w-1/6 text-2xl text-orange-500'><BsArrowLeftCircleFill/></span>
            </button>
        </div>

        <div className='w-full flex flex-col gap-1.5 items-center'>
            {
                structure.map((name,index)=>{
                    return <Link  className={`${pathname == name.link ? 'bg-orange-500 text-white font-semibold' : 'bg-white text-[gray]' }  w-1/2 p-2 rounded-full   hidden md:flex justify-center items-center font-normal text-lg group-hover:hidden`} key={index} to={name.link}>{name.name[0].toUpperCase()}</Link>
                })
            }
            {
                 structure.map((name,index)=>{
                    return <Link  className={`transition-all ease-linear duration-150 w-5/6 px-4 py-2 rounded-full  ${pathname==name.link ? "bg-amber-600 text-white font-semibold" : "bg-white black"} flex md:hidden  items-center font-normal text-lg gap-5 group-hover:flex`} key={index} to={name.link}>
                        <GoDotFill className={`text-sm  ${(pathname == name.link) ? "text-white" : "text-[gray]"}`} />
                        <span className={`${(pathname == name.link) ? "text-white" :  "text-[gray]"}`}>{name.name}</span>
                         </Link>
                })
            }
        </div>

    </nav>
  )
}

export default SideNavbar
