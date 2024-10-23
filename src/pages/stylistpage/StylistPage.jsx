import React from 'react'
import NavBarStylist from '../../components/stylist/NavBarStylist';
import BackGroundStylist from '../../assets/stylist-home-page.jpg';

function StylistPage() {
    return (
        <div>
            <NavBarStylist />

            <div className='flex justify-center  mt-10'>
                <img className='bg-no-repeat bg-cover bg-center w-3/4 lg:w-full' src={BackGroundStylist} alt="" />
            </div>

            <div className='mx-auto mt-10 py-2 px-2 font-bold text-xl text-center'>Daily Appointments</div>
            <input type='date' className='mx-auto ml-10 mt-10 py-2 px-6 border-2 border-gray-400'></input>
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
                    <tbody className='text-center'>
                        <tr className=''>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>Haircut</td>
                            <td>2023-09-01</td>
                            <td>10:00 AM</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane Smith</td>
                            <td>Haircut</td>
                            <td>2023-09-02</td>
                            <td>11:00 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StylistPage
