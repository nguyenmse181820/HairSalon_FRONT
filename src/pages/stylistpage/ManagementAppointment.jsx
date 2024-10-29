import React from 'react'

function ManagementAppointment() {
    const appointments = [
        {
            stt: 1,
            CustomertName: 'John Doe',
            serviceType: 'Haircut',           
            date: '10:00 AM, 2023-06-01',
            time: '30 mins',
        },
        {
            stt: 2,
            CustomertName: 'John Doe',
            serviceType: 'Haircut',           
            date: '10:00 AM, 2023-06-01',
            time: '30 mins',
        },
    ]

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
                            appointments.map((item) =>{
                                return(
                                    <tr key={item.stt} className=''>
                                        <td>{item.stt}</td>
                                        <td>{item.CustomertName}</td>
                                        <td className='hidden sm:table-cell'>{item.serviceType}</td>
                                        <td>{item.date}</td>
                                        <td className='hidden sm:table-cell'>{item.time}</td>
                                        <td>
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
