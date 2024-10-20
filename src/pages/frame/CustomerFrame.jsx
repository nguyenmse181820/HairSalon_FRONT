import React, { useEffect } from 'react'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CustomerFrame = () => {
    return (
        <div>
            <NavigationBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default CustomerFrame;