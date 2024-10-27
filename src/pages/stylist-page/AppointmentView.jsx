import React from 'react'

function AppointmentView() {
    return (
        <div>
            <div className='mx-auto mt-10 py-2 px-2 font-bold text-xl text-center'>Appointment</div>
            <div className='shadow-lg flex flex-col mt-10 mb-10 mx-1 lg:mx-10 text-sm lg:text-lg'>
                <table className='table-auto border border-solid border-l-0 border-r-0'>
                    <thead className=''>
                        <tr>
                            <th>Stt</th>
                            <th>Customer Name</th>
                            <th>Service Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>

                    </thead>
                    <tbody className='text-center  '>
                        <tr className=''>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>Haircut</td>
                            <td>2023-09-01</td>
                            <td>10:00 AM</td>
                            <td className='flex justify-center'>
                                <div className='bg-red-600 text-white w-1/2 py-1'>Reject</div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td>2</td>
                            <td>Jane Smith</td>
                            <td>Haircut</td>
                            <td>2023-09-02</td>
                            <td>11:00 AM</td>
                            <td className='flex justify-center'>
                                <div className='bg-green-600 text-white w-1/2 py-1'>Appoved</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AppointmentView
