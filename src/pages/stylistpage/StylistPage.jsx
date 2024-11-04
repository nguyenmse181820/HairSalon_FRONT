import React from 'react'
import BackGroundStylist from '../../assets/stylist-home-page.jpg';

function StylistPage() {
    const data = [
        {
            id: 1,
            name: 'John Doe',
            service: 'Haircut',
            date: '2023-09-01',
            time: '35 min',
            status: 'Completed',
        },
        {
            id: 2,
            name: 'Jane Smith',
            service: 'Haircut',
            date: '2023-09-02',
            time: '60 min',
            status: 'Doing',
        }
    ]
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
                            data.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td className='hidden sm:table-cell'>{item.service}</td>
                                        <td>{item.date}</td>
                                        <td className='hidden sm:table-cell'>{item.time}</td>
                                        <td>{item.status}</td>
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
