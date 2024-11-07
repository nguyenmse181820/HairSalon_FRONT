import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/ScheduleManagement.css';

function ScheduleManagement() {
    const [showModal, setShowmodal] = useState(false);
    const [showDetail, setShowdetail] = useState(false);

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios
            .get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/schedule')
            .then((response) => {
                setSchedules(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleModal = () => {

        setShowmodal(!showModal);
    };

    const toggleDetail = () => {
        setShowdetail(!showDetail);
    };
    // hidden scrollbar for modal
    if (showModal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    // hidden scrollbar for detail modal
    if (showDetail) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <div>
            <div>
                <div className='mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider'>Schedule Management</div>
            </div>
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 md:mx-10 text-sm md:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Id</th>
                            <th>Customer Name</th>
                            <th className='hidden sm:table-cell'>Service Type</th>
                            <th>Date</th>
                            <th className='hidden sm:table-cell'>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            schedules.map((item) => {
                                return (
                                    <tr key={item.id} className=''>
                                        <td className='py-4'>{item.id}</td>
                                        <td className='py-4'>{item.customerName}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.serviceType}</td>
                                        <td className='py-4'>{item.date}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.note}</td>
                                        <td className='flex flex-col justify-center items-center py-4'>
                                            <div className='flex gap-2 sm:flex-row flex-col'>
                                                <button type='submit' className='bg-blue-600 text-white py-1 px-4 hover:bg-blue-500 hover:opacity-85 transition-all ease-in-out duration-500' onClick={toggleDetail}>Detail</button>
                                                <button type='submit' className='bg-red-600  text-white py-1 px-4 hover:bg-red-500 hover:opacity-85 transition-all ease-in-out duration-500' onClick={toggleModal}>Cancel</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className='modal'>
                    <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0' onClick={toggleModal}></div>
                    <div className='modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 '>
                        <div className='text-xl font-semibold mb-8 uppercase tracking-wider'>Are you sure you want to cancel this appointment ?</div>
                        <div className='flex mb-10'>
                            <div className='basis-1/4'>Reason cancel:</div>
                            <input type="text" className='h-full w-full border border-solid' />
                        </div>
                        <div className='flex gap-2 justify-center'>
                            <button className='bg-blue-600 text-white py-1 px-4 hover:bg-blue-500 hover:opacity-85 transition-all ease-in-out duration-500'>Submit</button>
                            <button className='bg-red-600 text-white py-1 px-4 hover:bg-red-500 hover:opacity-85 transition-all ease-in-out duration-500' onClick={toggleModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Detail modal */}
            {showDetail && (
                <div className='modal'>
                    <div className='bg-black opacity-50 fixed w-full h-full left-0 top-0 right-0 bottom-0 ' onClick={toggleDetail}></div>
                    <div className='modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-16 py-16 z-20'>
                        <div className='text-xl font-semibold mb-8 uppercase tracking-wider'>Information customer booking</div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Customer name:</div>
                            <div className='basis-2/3 font-light'>Nguyen Thanh Phong</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Email:</div>
                            <div className='basis-2/3 font-light'>NguyenThanhPhong@gmail.com</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Phone Number:</div>
                            <div className='basis-2/3 font-light'>0998762652</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Address:</div>
                            <div className='basis-2/3 font-light'>Quan Dong Da, Ha Noi</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Service type:</div>
                            <div className='basis-2/3 font-light'>Hair Cut</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Note:</div>
                            <div className='basis-2/3 font-light'>profestional</div>
                        </div>
                        <div className='flex mb-10 gap-4'>
                            <div className='basis-1/3'>Date:</div>
                            <div className='basis-2/3 font-light'>10:00 AM, 2023-09-01</div>
                        </div>

                        <div className='flex gap-2 justify-center'>
                            <button className='bg-red-600 text-white py-1 px-4 hover:bg-red-500 hover:opacity-85 transition-all ease-in-out duration-500' onClick={toggleDetail}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default ScheduleManagement
