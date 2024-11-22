

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagementAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment')
            .then((res) => setAppointments(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleSortDate = () => {
        const nextSortOrder = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc';
        setSortOrder(nextSortOrder);

        if (nextSortOrder === 'asc') {
            setAppointments([...appointments].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } else if (nextSortOrder === 'desc') {
            setAppointments([...appointments].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else {
            axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment')
                .then((res) => setAppointments(res.data))
                .catch((err) => console.log(err));
        }
    };
    
    return (
        <div className="xs:p-6 p-2">
            <h1 className="sm:text-2xl text-lg font-bold text-center mb-8 uppercase">Appointment Management</h1>
            <table className="w-full border-collapse text-center">
                <thead>
                    <tr className='sm:text-base text-sm'>
                        <th className="py-2 px-3 font-semibold text-center uppercase"   >ID</th>
                        <th className="py-2 px-3 font-semibold text-center uppercase">Customer Name</th>
                        <th className="py-2 px-3 font-semibold text-center uppercase hidden sm:table-cell">Service Type</th>
                        <th
                            className="p-4 font-semibold uppercase cursor-pointer"
                            onClick={handleSortDate}
                        >
                            Date
                            {sortOrder === 'asc' && ' ▲'}
                            {sortOrder === 'desc' && ' ▼'}
                        </th>
                        <th className="py-2 px-3 font-semibold text-center uppercase"   >Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td colSpan="6">
                            <hr className="w-full border-gray-300 my-2" />
                        </td>
                    </tr>
                    {appointments.map((item) => (
                        <tr key={item.id} className='sm:text-base text-sm'>
                            <td className="p-2">{item.id}</td>
                            <td className="p-2">{item.customerName}</td>
                            <td className="p-2 hidden sm:table-cell">{item.serviceType}</td>
                            <td className="p-2">{item.date}</td>
                            <td className="p-2">
                                <select className="border p-2 rounded">
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div>pagination</div> */}
            <div className="flex justify-end mt-10 mb-5 space-x-4 mr-10">
                <button className="bg-red-600 text-white py-2 px-4 rounded border border-red-600 hover:bg-white hover:text-red-600 transition duration-300">
                    Reset
                </button>

                <button className="bg-black text-white py-2 px-4 rounded border border-black hover:bg-white hover:text-black transition duration-300">
                    Save
                </button>
            </div>
        </div>
    );
}

export default ManagementAppointment;
