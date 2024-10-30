import React, { useEffect, useState } from 'react'
import axios from 'axios'
function AppointmentView() {
    
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
            <div className='mx-auto py-2 px-2 font-bold text-xl text-center'>Appointment</div>
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
                    <tbody className='text-center  '>
                        {appointments.map((appointment) => {
                            return (
                                <tr key={appointment.id} className=''>
                                    <td className='py-4'>{appointment.id}</td>
                                    <td className='py-4'>{appointment.customerName}</td>
                                    <td className='hidden sm:table-cell py-4'>{appointment.serviceType}</td>
                                    <td className='py-4'>{appointment.date}</td>
                                    <td className='hidden sm:table-cell py-4'>{appointment.time}</td>
                                    <td className='flex justify-center py-4'>
                                        <div className=''>{appointment.status}</div>
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

export default AppointmentView
