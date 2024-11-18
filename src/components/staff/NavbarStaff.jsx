

import React, { useState, useEffect, useContext } from 'react'
import Logo from '../../assets/coiffure-logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../main.jsx';
function NavBarStaff() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                            <FontAwesomeIcon className='cursor-pointer hover:scale-110 transition-transform duration-200 pr-1' icon={faUser} onClick={toggleLogout} />
                            <p className='hidden lg:inline-block cursor-pointer' onClick={toggleLogout}>My Account</p>
                            {logoutOpen && (
                                <ul className='absolute bg-white text-black w-[70px] lg:w-[100px] right-[1%] lg:right-[1.1%] mt-16 border inline-block '>
                                    <li className='py-2 text-center px-2 font-semibold text-xs lg:text-sm uppercase hover:scale-110 hover:bg-black hover:bg-opacity-90 hover:text-white transition-all ease-in-out duration-500'>
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            )

                            }
                        </div>

                    </div>
                </div>

                <div className='middle-header-row flex items-center justify-center'>
                    <a className='flex justify-center  ' href="/staff/bookings"><img className='w-1/4 lg:w-1/5' src={Logo} alt="Logo Coiffure" /></a>
                </div>

                <div className="menustylist-bar">
                    <ul className="hidden lg:flex justify-center items-center space-x-[7rem] list-none pt-2">

                        <li><a href="/staff/bookings" className="nav-link font-semibold text-sm uppercase">Bookings</a></li>
                        <li><a href="/staff/stylist_assignment" className="nav-link font-semibold text-sm uppercase">Stylist Assignment</a></li>
                        <li><a href="/staff/management" className="nav-link font-semibold text-sm uppercase">Appointment Management</a></li>

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
                            <li><a href="/staff/bookings" className="nav-link font-semibold uppercase">Bookings</a></li>
                            <li><a href="/staff/stylist_assignment" className="nav-link font-semibold  uppercase">Stylist Assignment</a></li>
                            <li><a href="/staff/management" className="nav-link font-semibold  uppercase">Appointment Management</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBarStaff
