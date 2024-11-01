import React from 'react'
import Logo from '../assets/coiffure-logo.png'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Check if the current path matches the provided path
  const isActive = (path) => location.pathname === path

  return (
    <div className="w-1/5 bg-gray-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-5/6 h-auto" />
        </div>
        <button
          onClick={() => navigate('/admin/manage-customer')}
          className={`w-full text-left px-4 py-2 text-lg font-semibold mb-4 ${isActive('/admin/manage-customer') ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          Customer Management
        </button>
        <button
          onClick={() => navigate('/admin/manage-staff')}
          className={`w-full text-left px-4 py-2 text-lg font-semibold ${isActive('/admin/manage-staff') ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          Staff Management
        </button>
      </div>
      <div className="px-4 pb-5">
        <span className="text-gray-700">Admin</span>
      </div>
    </div>
  )
}

export default Sidebar
