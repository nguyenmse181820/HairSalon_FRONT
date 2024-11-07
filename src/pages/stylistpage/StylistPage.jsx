import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import BackGroundStylist from '../../assets/stylist-home-page.jpg';

function StylistPage() {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment').then((res) => {
            setAppointments(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    });

    const [filterModal, setFilterModal] = useState(false);
    const toggleFilterModal = () => {
        setFilterModal(!filterModal);
    };

    return (
        <div>

            <div className='flex justify-center  mt-10'>
                <img className='bg-no-repeat bg-cover bg-center w-3/4 lg:w-full' src={BackGroundStylist} alt="" />
            </div>

            <div className='my-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Daily Appointments</div>
            {/* **FILTER BUTTON** */}
            <div className='ml-6 lg:ml-10 text-sm sm:text-base border text-center w-[100px] sm:w-[150px] py-2 sm:py-4 flex items-center justify-center trasform hover:scale-110 duration-500 hover:shadow hover:bg-black hover:text-white' onClick={toggleFilterModal}>
                <FontAwesomeIcon className='cursor-pointer' icon={faFilter} />
                <button className='w-[60px] font-semibold '>Filter</button>
            </div>

            {/* ** FILTER MODAL ** */}
            <div className={
                `inset-0 fixed z-50 transform 
                ${filterModal ? "trasnslate-x-0" : "-translate-x-full"}  
                transition-transform duration-700 ease-in-out`
            }
            >

                <div className='bg-white opacity-70 top-0 left-0 right-0 bottom-0 w-full h-full fixed' onClick={toggleFilterModal} ></div>
                <div className='shadow-lg bg-white top-0  bottom-0 fixed z-50 xs:w-[340px]'>
                    <div className='ml-5'>
                        <div className='my-10'>
                            <div className='flex justify-between items-center mb-5'>
                                <div className='text-3xl uppercase'>Filter</div>
                                <button className='close-modal mr-10 text-2xl' onClick={toggleFilterModal}><FontAwesomeIcon icon={faXmark} /></button>
                            </div>
                            <div className='lg:w-full h-[1px] bg-black'></div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex gap-2 items-center justify-between mb-6'>
                                <div>Date</div>
                                <input className='border mr-10 p-2 w-[155px]' type="date" />
                            </div>

                            <div className='flex gap-2 items-center justify-between mb-6'>
                                <div>Service Type</div>
                                <select className='border p-2 w-[155px] mr-10' name="" id="">
                                    <option value="">Service 1</option>
                                    <option value="">Service 2</option>
                                    <option value="">Service 3</option>
                                    <option value="">Service 4</option>
                                    <option value="">Service 5</option>
                                </select>
                            </div>
                            <div className='flex gap-2 items-center justify-between'>
                                <div>Status</div>
                                <select className='border p-2 w-[155px] mr-10' name="" id="">
                                    <option value="">All</option>
                                    <option value="">Doing</option>
                                    <option value="">Completed 1</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
            
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 lg:mx-10 text-sm lg:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Stt</th>
                            <th>Customer Name</th>
                            <th className='hidden sm:table-cell'>Service Type</th>
                            <th>Date</th>
                            <th className='hidden sm:table-cell'>Time</th>
                            <th>Status</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {
                            appointments.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className='py-4'>{item.id}</td>
                                        <td className='py-4'>{item.customerName}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.serviceType}</td>
                                        <td className='py-4'>{item.date}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.time}</td>
                                        <td className='py-4'>{item.status}</td>
                                    </tr>
                                )
                            }
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StylistPage
