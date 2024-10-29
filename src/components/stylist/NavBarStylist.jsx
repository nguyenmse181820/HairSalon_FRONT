import React, { useState, useEffect } from 'react'
import Logo from '../../assets/coiffure-logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHeadphonesSimple, faMagnifyingGlass, faUser, faCalendar, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavBarStylist() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <div className='sticky-container fixed w-full z-10 bg-white'>
                <div className='top-header-row flex items-center px-4 pt-3'>
                    <div className='left-container w-1/2 flex space-x-5 font-montserrat text-sm'>

                        <div>
                            <FontAwesomeIcon className='cursor-pointer hover:scale-110 transition-transform duration-200 pr-1' icon={faMagnifyingGlass} />
                            <a className='hidden lg:inline-block' href="">Search</a>
                        </div>
                    </div>
                    <div className='right-container w-1/2 flex justify-end space-x-5 font-montserrat text-sm'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='cursor-pointer hover:scale-110 transition-transform duration-200 pr-1' icon={faBell} />
                            <a className='hidden lg:inline-block' href="">Notification</a>
                        </div>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='cursor-pointer hover:scale-110 transition-transform duration-200 pr-1' icon={faUser} />
                            <a className='hidden lg:inline-block' href="">My Account</a>
                        </div>

                    </div>
                </div>

                <div className='middle-header-row flex items-center justify-center'>
                    <a className='flex justify-center  ' href="/stylist"><img className='w-1/4 lg:w-1/5' src={Logo} alt="Logo Coiffure" /></a>
                </div>

                <div className="menustylist-bar">
                    <ul className="hidden lg:flex justify-center items-center space-x-[7rem] list-none pt-2">

                        <li><a href="/stylist/home" className="nav-link font-semibold text-sm uppercase">HOME</a></li>
                        <li><a href="/stylist/services" className="nav-link font-semibold text-sm uppercase">SERVICE STATUS</a></li>
                        <li><a href="/stylist/earning" className="nav-link font-semibold text-sm uppercase">EARNING</a></li>
                        <li>
                            <button onClick={() => setIsOpen((prev) => !prev)} type='button' className='nav-link font-semibold text-sm uppercase'>Appointment</button>
                            {isOpen && (
                                <ul className='absolute bg-white text-black w-[220px] border'>
                                    <li className='py-2 px-2 font-semibold text-sm uppercase hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'><a href="/stylist/appointmentView" >View Appointment</a></li>
                                    <li className='py-2 px-2 font-semibold text-sm uppercase hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'><a href="/stylist/appointmentManagement" >Management Appointment</a></li>
                                </ul>
                            )
                            }
                        </li>
                        <li><a href="/stylist/schedule" className="nav-link font-semibold text-sm uppercase">Schedule</a></li>

                    </ul>

                    <div className='flex justify-end pr-5 text-2xl'>
                        <FontAwesomeIcon className='lg:hidden cursor-pointer hover:rotate-90 transition-transform duration-500 ease-in-out' icon={faBars} onClick={toggleMenu} />
                    </div>

                    <div className={`fixed inset-0 bg-white p-8 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
                        <div className='flex justify-end'>
                            <FontAwesomeIcon icon={faTimes} size="2x" className="cursor-pointer hover:rotate-90 transition-transform duration-500 ease-in-out" onClick={toggleMenu} />
                        </div>
                        <div>
                            <div className='flex items-center justify-center'>
                                <img className='w-1/2 mb-12' src={Logo} alt="Logo Coiffure" />
                            </div>
                        </div>
                        <ul className="flex flex-col items-center space-y-8 text-xl">
                            {['DATE', 'SERVICE STATUS', 'EARNING'].map((menuItem, i) => (
                                <li key={i} className="nav-link font-semibold cursor-pointer">{menuItem}</li>
                            ))}
                            <li className='flex flex-col items-center relative'>
                                <button onClick={() => setIsOpen((prev) => !prev)} type='button' className='nav-link font-semibold text-xl uppercase '>Appointment</button>
                                {isOpen && (
                                    <ul className='absolute flex flex-col items-center bg-black text-white w-[220px] my-10 '>
                                        <li className='py-2 px-[46px] font-semibold text-sm uppercase hover:bg-white hover:bg-opacity-30'><a href="" >View Appointment</a></li>
                                        <li className='py-2 px-[14px] font-semibold text-sm uppercase hover:bg-white hover:bg-opacity-30'><a href="" >Management Appointment</a></li>
                                    </ul>
                                )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBarStylist
