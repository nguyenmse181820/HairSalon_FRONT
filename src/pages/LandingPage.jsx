import React from 'react'
import BigBanner from '../assets/big-banner.jpg'
import LeftAboveImage from '../assets/left-above-container.png'
import LeftUnderImage from '../assets/left-under-container.png'
import RightImage from '../assets/right-container.png'

const LandingPage = () => {
    return (
        <div className='mt-2'>
            <div className='flex justify-center w-full h-auto z-0'>
                <div className='flex relative'>
                    <img className='w-full h-auto' src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw15214ca2/homepage/2024/OCTOBER/W1/2560x996%20-LOVE%20STACKING%20BRACELETS%20WOMEN%20NOVELTIES%20N18.1%20-%20STATIC.jpg" alt="BigBanner" />
                    <div className='hidden lg:flex absolute bottom-20 right-20'>
                        <p className='text-xl font-montserrat italic'>Confidence begins with Coiffure.</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10 mb-10 font-bold'>
                <p>VOTED BEST HAIR SALON IN VIETNAM</p>
            </div>
            <div className='content flex'>
                <div className='left-container w-1/2 items-center'>
                    <div className='flex justify-center'>
                        <img src={LeftAboveImage} alt="Salon" />
                    </div>
                    <div className='flex justify-center mt-10'>
                        <img src={LeftUnderImage} alt="Hairdresser" />
                    </div>
                </div>
                <div className='right-container w-1/2'>
                    <img src={RightImage} alt="Model" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
