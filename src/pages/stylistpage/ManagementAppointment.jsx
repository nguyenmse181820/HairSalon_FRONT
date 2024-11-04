import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ManagementAppointment() {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment').then((res) => {
            setAppointments(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <div className='mx-auto py-2 px-2 font-bold text-xl ml-10 text-center'>Appointment Management</div>
            <div className='flex flex-col lg:flex-row items-start mt-6  lg:items-center ml-10'>
                <div className='mr-10 font-bold' >Sort: </div>
                <div className='mr-10'><button className='border-solid border bg-black text-white hover:bg-white hover:text-black transition-all ease-in-out duration-500 py-2 px-6 mt-4'>Date</button></div>
                <div className='mr-10'><button className='border-solid border bg-black text-white hover:bg-white hover:text-black transition-all ease-in-out duration-500 py-2 px-6 mt-4'>Time</button></div>
            </div>
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-6 lg:mx-10 text-sm lg:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Stt</th>
                            <th>Customer Name</th>
                            <th className='hidden sm:table-cell'>Service Type</th>
                            <th>Date</th>
                            <th className='hidden sm:table-cell'>Time</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {
                            appointments.map((item) => {
                                return (
                                    <tr key={item.id} className=''>
                                        <td className='py-4'>{item.id}</td>
                                        <td className='py-4'>{item.customerName}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.serviceType}</td>
                                        <td className='py-4'>{item.date}</td>
                                        <td className='hidden sm:table-cell py-4'>{item.time}</td>
                                        <td className='py-4'>
                                            <select name="" id="" className='w-[100px]'>
                                                <option className=' bg-black text-white' value="" >Approved</option>
                                                <option className=' bg-black text-white' value="">Reject</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManagementAppointment
