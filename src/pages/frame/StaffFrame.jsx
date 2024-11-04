import React from 'react'
import NavBarStaff from '../../components/staff/NavbarStaff'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import { Toaster } from 'sonner'

function StaffFrame() {
  return (
    <div>
      <Toaster position='top-right' richColors expand={true}></Toaster>
      <NavBarStaff />
      <div className='pt-32 lg:pt-48'>
        <Outlet />
      </div>
      <Footer />
      
    </div>
  )
}

export default StaffFrame
