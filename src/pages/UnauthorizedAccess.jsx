import React from 'react'
import Unauthorized from '../assets/unauthorized.jpg'

const UnauthorizedAccess = () => {
    return (
        <div>
            <div className='flex relative'>
                <img src={Unauthorized} alt='Unauthorized Access' className='w-full h-screen object-cover z-1' />
                <div className='flex absolute inset-0 flex-col justify-center items-center space-y-4'>
                    <p className='z-2 text-4xl text-white font-montserrat italic pb-4'>Unauthorized access </p>
                    <button className='z-2 px-6 py-4 font-montserrat font-bold italic bg-transparent border-2
                         border-black text-black hover:bg-black hover:text-white border-solid hover:scale-95 
                         transform transition-all duration-300 ease-in-out uppercase'>
                        Back To Landing Page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedAccess
