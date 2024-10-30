import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
    })
    return (
        <div>

            <div className='flex justify-center  mt-10'>
                <img className='bg-no-repeat bg-cover bg-center w-3/4 lg:w-full' src={BackGroundStylist} alt="" />
            </div>

            <div className='mx-auto mt-10 py-2 px-2 font-bold text-xl text-center'>Daily Appointments</div>
            <input type='date' className='mx-auto ml-10 mt-10 py-2 px-6 border-2 border-gray-400'></input>
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
