import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';

function AppointmentView() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment')
            .then((res) => setAppointments(res.data))
            .catch((err) => console.log(err));
    }, []);

    const [filterModal, setFilterModal] = useState(false);
    const toggleFilterModal = () => {
        setFilterModal(!filterModal);
    };
    return (
        <div className="">
            <h4 className="text-2xl font-bold text-black mb-10 uppercase text-center">Appointment</h4>

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
                                    {appointments.map((item, index) => (
                                        <option key={index} value={item.serviceType}>
                                            {item.serviceType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2 items-center justify-between'>
                                <div>Status</div>
                                <select className='border p-2 w-[155px] mr-10' name="" id="">
                                    {appointments.map((item, index) => (
                                        <option key={index} value={item.status}>
                                            {item.status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
            {/* table */}
            <div className='mt-2 xs:p-6 p-2'>
                <table className="w-full mt-1">
                    <thead>
                        <tr className="sm:text-base text-sm font-semibold text-black ">
                            <th className="py-2 px-3 font-semibold text-center uppercase">Stt</th>
                            <th className="py-2 px-3 font-semibold text-center uppercase">Customer Name</th>
                            <th className="py-2 px-3 font-semibold hidden sm:table-cell text-center uppercase">Service Type</th>
                            <th className="py-2 px-3 font-semibold text-center uppercase">Date</th>
                            <th className="py-2 px-3 font-semibold hidden sm:table-cell text-center uppercase">Time</th>
                            <th className="py-2 px-3 font-semibold text-center uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="6">
                                <hr className="w-full border-gray-300 my-2" />
                            </td>
                        </tr>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id} className='sm:text-base text-sm'>
                                <td className="py-2 px-3 text-center">{appointment.id}</td>
                                <td className="py-2 px-3 text-center">{appointment.customerName}</td>
                                <td className="py-2 px-3 hidden sm:table-cell text-center">{appointment.serviceType}</td>
                                <td className="py-2 px-3 text-center">{appointment.date}</td>
                                <td className="py-2 px-3 hidden sm:table-cell text-center">{appointment.time}</td>
                                <td
                                    className={`p-2 text-center uppercase ${appointment.status === 'Success' ? 'text-green-500' :
                                        appointment.status === 'Canceled' ? 'text-red-500' :
                                            appointment.status === 'Waiting' ? 'text-yellow-500' : ''
                                        }`}
                                >
                                    {appointment.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className='flex gap-2 justify-between p-4 w-[50%] translate-x-1/2 my-10 cursor-pointer text-sm sm:text-lg'>
                <div className='w-24 text-center'>
                    <p className='italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>← Prevous</p>
                </div>
                <div className='flex gap-1'>
                    <p className='w-4 sm:w-12 text-center bg-black rounded text-white'>1</p>
                    <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>2</p>
                    <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>3</p>
                    <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>...</p>
                    <p className='w-4 sm:w-12 text-center hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>9</p>
                </div>
                <div className='w-24 text-center'>
                    <p className='italic hover:bg-black rounded hover:text-white trasion-all ease-in-out duration-300'>Next →</p>
                </div>
            </div>
        </div>
    );
}

export default AppointmentView;
