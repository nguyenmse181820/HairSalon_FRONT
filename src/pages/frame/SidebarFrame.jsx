import React from 'react'
import { Toaster } from 'sonner'
import Sidebar from '../../components/Sidebar.jsx'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const SidebarFrame = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="bottom-right" richColors expand={true} />
      <Sidebar />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  )
}

export default SidebarFrame
