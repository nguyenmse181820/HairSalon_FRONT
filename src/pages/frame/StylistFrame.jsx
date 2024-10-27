import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import NavigationBar from '../../components/stylist/NavBarStylist.jsx'
import Footer from '../../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CustomerFrame = () => {
    return (
        <div>
            <Toaster position='bottom-right' richColors expand={true}></Toaster>
            <NavigationBar />
            <div className='pt-32 lg:pt-48'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default CustomerFrame;