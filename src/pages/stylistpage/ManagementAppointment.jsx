import React from 'react'

function ManagementAppointment() {

    return (
        <div>
            <div className='mx-auto py-2 px-2 font-bold text-xl ml-10 text-center'>Appointment Management</div>
            <div className='flex flex-col lg:flex-row items-start mt-6  lg:items-center ml-10'>
                <div className='mr-10 font-bold' >Sort: </div>
                <div className='mr-10'><button className='border-solid border bg-black text-white hover:bg-white hover:text-black transition-all ease-in-out duration-500 py-2 px-6 mt-4'>Date</button></div>
                <div className='mr-10'><button className='border-solid border bg-black text-white hover:bg-white hover:text-black transition-all ease-in-out duration-500 py-2 px-6 mt-4'>Time</button></div>
            </div>
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-1 lg:mx-10 text-sm lg:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Stt</th>
                            <th>Service Type</th>
                            <th>Stylist Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        <tr className=''>
                            <td>1</td>
                            <td>Haircut</td>
                            <td>John Doe</td>
                            <td>2023-09-01</td>
                            <td>10:00 AM</td>
                            <td>
                                <select name="" id="" className='w-[100px]'>
                                    <option className=' bg-black text-white' value="" >Approved</option>
                                    <option className=' bg-black text-white' value="">Reject</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Haircut</td>
                            <td>Jane Smith</td>
                            <td>2023-09-02</td>
                            <td>11:00 AM</td>
                            <td>
                                <select name="" id="" className='w-[100px]'>
                                    <option className=' bg-black text-white ' value="" >Approved</option>
                                    <option className=' bg-black text-white ' value="">Reject</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManagementAppointment
