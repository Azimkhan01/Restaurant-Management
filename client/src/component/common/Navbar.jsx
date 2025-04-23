import React, { useEffect, useState } from 'react'
import Top from '../ui/Top'
import SideNavbar from '../ui/SideNavbar'

function Navbar() {
      const [logo,setLogo] = useState("DineIn")
      const [isNavOpen,setIsNavOpen] = useState(false)
          const [handlerName,setHandlerName] = useState('Handler Name')
          const [handlerRole,setHandlerRole] = useState('Handler Role')
      useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        setHandlerName(user.name)
        setHandlerRole(user.role)
      },[])
      return (
    <>
        <Top Logo={logo} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} handlerName={handlerName} setHandlerName={setHandlerName} handlerRole={handlerRole} setHandlerRole={setHandlerRole} />
        <SideNavbar  logo={logo} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </>
  )
}

export default Navbar
