import React from 'react'
import Navbar from './common/Navbar'
function Skeleton({children}) {

    return (
     <>
        <Navbar/>
        {children}
     </>
  )
}

export default Skeleton