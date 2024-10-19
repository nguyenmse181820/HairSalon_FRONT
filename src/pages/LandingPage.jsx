import React from 'react'
import LeftAboveImage from '../assets/left-above-container.png'
import LeftUnderImage from '../assets/left-under-container.png'
import RightImage from '../assets/right-container.png'
import BookingBanner from '../assets/booking-banner.png'

const LandingPage = () => {
    return (
        <div className='mt-2 mx-8'>
            <div className='top-banner flex justify-center w-full h-auto z-0'>
                <div className='flex relative justify-center'> {/* Relative to control the absolute element */}
                    <img className='w-3/4 lg:w-full h-auto' src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw15214ca2/homepage/2024/OCTOBER/W1/2560x996%20-LOVE%20STACKING%20BRACELETS%20WOMEN%20NOVELTIES%20N18.1%20-%20STATIC.jpg" alt="BigBanner" />
                    <div className='hidden lg:flex absolute bottom-20 right-20'>
                        <p className='text-xl font-montserrat italic'>Confidence begins with Coiffure.</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center text-2xl items-center mt-10 mb-10 font-bold font-montserrat'>
                <p>VOTED BEST HAIR SALON IN VIETNAM</p>
            </div>
            <div className='middle-banner'>
                <div className='lg:flex relative'> {/* Parent container, relative divide screen */}
                    <div className='left-container lg:w-1/2 flex flex-col justify-between'> {/* Left child container, flex-col to set 2 parts into col */}
                        <div className='image flex justify-center items-center'>
                            <div className='flex-col w-3/4'>
                                <img className='w-full h-auto' src={LeftAboveImage} alt="Salon" />
                                <div className='content px-4 mt-6 mb-6'>
                                    <p className='text-xl font-bold font-montserrat'>OUR SALON</p>
                                    <p className='text-base font-light'>At Coiffure, we blend style and expertise to give you the perfect look. From cuts to color,
                                        our skilled stylists deliver results that enhance your beauty and confidence.</p>
                                </div>
                            </div>
                        </div>
                        <div className='image flex justify-center items-center'>
                            <div className='flex-col w-3/4'>
                                <img className='w-full h-auto' src={LeftUnderImage} alt="Hairdresser" />
                                <div className='content px-4 mt-6 mb-6'>
                                    <p className='text-xl font-bold font-montserrat'>ABOUT</p>
                                    <p className='text-base font-light'>With a passion for great hair, Coiffure which established in 2024 provides exceptional service
                                        in a relaxing, welcoming environment. Let us make every visit a great hair day!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-container lg:w-1/2 flex justify-center'>
                        <div className='flex-col w-3/4'>
                            <img className='w-full h-auto' src={RightImage} alt="Model" />
                            <div className='content px-4 mt-6 mb-6'>
                                <p className='text-xl font-bold font-montserrat'>SERVICES</p>
                                <p className='text-base font-light'>With a passion for great hair, Coiffure which established in 2024 provides exceptional service
                                    in a relaxing, welcoming environment. Let us make every visit a great hair day!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='booking-banner flex justify-center w-full h-auto z-0'>
                <div className='flex relative justify-center'>
                    <img className='w-3/4 lg:w-full h-auto' src={BookingBanner} alt="Booking Banner" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
