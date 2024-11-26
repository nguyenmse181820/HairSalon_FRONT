import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CustomerFrame = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    return (
        <div>
            <Toaster position='top-right' richColors expand={true}></Toaster>
            <NavigationBar />
            <div className='pt-32 lg:pt-44'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default CustomerFrame;