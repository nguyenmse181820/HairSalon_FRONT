

import React, { useState, useEffect, useContext } from 'react'
import Logo from '../../assets/coiffure-logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../main.jsx';
function NavBarStylist() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    const toggleLogout = () => {
        setLogoutOpen(!logoutOpen);
    }

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setUser(null);
        navigate('/');
    }

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
                            <FontAwesomeIcon className='cursor-pointer hover:scale-110 transition-transform duration-200 pr-1' icon={faUser}
                                onClick={toggleLogout}
                            />
                            <p className='hidden lg:inline-block cursor-pointer' onClick={toggleLogout}>My Account</p>
                            {logoutOpen && (
                                <ul className='absolute bg-white text-black w-[70px] lg:w-[100px] right-[1%] lg:right-[1.1%] mt-16 border inline-block '>
                                    <li className='py-2 text-center px-2 font-semibold text-xs lg:text-sm uppercase hover:scale-110 hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'>
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>
                </div>

                <div className='middle-header-row flex items-center justify-center'>
                    <a className='flex justify-center  ' href="/stylist/home"><img className='w-1/4 lg:w-1/5' src={Logo} alt="Logo Coiffure" /></a>
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
                                    <li className='py-2 px-2 font-semibold text-sm uppercase hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'><a href="/stylist/appointment_view" >View Appointment</a></li>
                                    <li className='py-2 px-2 font-semibold text-sm uppercase hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'><a href="/stylist/appointment_management" >Management Appointment</a></li>
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
                            <li><a href="/stylist/home" className="nav-link font-semibold  uppercase">HOME</a></li>
                            <li><a href="/stylist/services" className="nav-link font-semibold uppercase">SERVICE STATUS</a></li>
                            <li><a href="/stylist/earning" className="nav-link font-semibold uppercase">EARNING</a></li>
                            <li className='flex flex-col items-center relative'>
                                <button onClick={() => setIsOpen((prev) => !prev)} type='button' className='nav-link font-semibold text-xl uppercase '>Appointment</button>
                                {isOpen && (
                                    <ul className='absolute flex flex-col text-center justify-center items-center bg-black text-white w-[280px] my-10 '>
                                        <li className='py-2 px-[46px] w-full font-semibold text-sm uppercase hover:bg-white hover:bg-opacity-30'><a href="/stylist/appointment_view" >View Appointment</a></li>
                                        <li className='py-2 px-[14px] w-full font-semibold text-sm uppercase hover:bg-white hover:bg-opacity-30'><a href="/stylist/appointment_management" >Management Appointment</a></li>
                                    </ul>
                                )
                                }
                            </li>
                            <li><a href="/stylist/schedule" className="nav-link font-semibold uppercase">Schedule</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBarStylist
