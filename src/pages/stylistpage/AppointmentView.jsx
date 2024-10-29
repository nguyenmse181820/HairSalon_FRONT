import React from 'react'

function AppointmentView() {
    const appointments = [
        {
            stt: 1,
            customerName: 'John Doe',
            serviceType: 'Haircut',
            date: '10:00 AM, 2023-06-01',
            time: '30 mins',
            status: 'Rejected',
        },
        {
            stt: 2,
            customerName: 'John Doe',
            serviceType: 'Haircut',
            date: '10:00 AM, 2023-06-01',
            time: '30 mins',
            status: 'Approved',
        },
    ]
    return (
        <div>
            <div className='mx-auto py-2 px-2 font-bold text-xl ml-10 text-center'>Appointment</div>
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
                                <tr key={appointment.stt} className=''>
                                    <td>{appointment.stt}</td>
                                    <td>{appointment.customerName}</td>
                                    <td className='hidden sm:table-cell'>{appointment.serviceType}</td>
                                    <td>{appointment.date}</td>
                                    <td className='hidden sm:table-cell'>{appointment.time}</td>
                                    <td className='flex justify-center'>
                                        <div className='bg-red-600 text-white px-2 py-1'>Reject</div>
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
