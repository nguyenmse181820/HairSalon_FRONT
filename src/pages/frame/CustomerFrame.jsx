import React, { useEffect } from 'react'
import NavigationBar from '../../components/NavigationBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CustomerFrame = () => {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export default CustomerFrame;