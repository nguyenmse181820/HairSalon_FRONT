import React from 'react'
import Unauthorized from '../assets/unauthorized.jpg'
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    const handleBackToLandingPage = () => {
        navigate('/'); 
    };
    return (
        <div>
            <div className='flex relative'>
                <img src={Unauthorized} alt='Unauthorized Access' className='w-full h-screen object-cover z-1' />
                <div className='flex absolute inset-0 flex-col justify-center items-center space-y-4'>
                    <p className='z-2 text-4xl text-white font-montserrat italic pb-4'>Unauthorized access </p>
                    <button className='z-2 px-6 py-4 font-montserrat font-bold italic bg-black border-2
                         border-black text-white hover:bg-transparent hover:text-black border-solid 
                         transform transition-all duration-300 ease-in-out uppercase'
                         onClick={handleBackToLandingPage}>
                        Back To Landing Page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedAccess
