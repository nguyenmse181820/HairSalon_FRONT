import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentView() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/appointment')
            .then((res) => setAppointments(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="bg-white rounded-lg p-6 shadow-lg">
            <h4 className="text-2xl font-bold text-black mb-10 uppercase text-center">Appointment</h4>

            <table className="w-full text-left mt-1">
                <thead>
                    <tr className="text-lg font-semibold text-black">
                        <th className="py-2 px-3 font-semibold text-center uppercase">Stt</th>
                        <th className="py-2 px-3 font-semibold text-center uppercase">Customer Name</th>
                        <th className="py-2 px-3 font-semibold hidden sm:table-cell text-center uppercase">Service Type</th>
                        <th className="py-2 px-3 font-semibold text-center uppercase">Date</th>
                        <th className="py-2 px-3 font-semibold hidden sm:table-cell text-center uppercase">Time</th>
                        <th className="py-2 px-3 font-semibold text-center uppercase">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6">
                            <hr className="w-full border-gray-300 my-2" />
                        </td>
                    </tr>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="p-2 text-center">{appointment.id}</td>
                            <td className="p-2 text-center">{appointment.customerName}</td>
                            <td className="p-2 hidden sm:table-cell text-center">{appointment.serviceType}</td>
                            <td className="p-2 text-center">{appointment.date}</td>
                            <td className="p-2 hidden sm:table-cell text-center">{appointment.time}</td>
                            <td
                                className={`p-2 text-center uppercase ${appointment.status === 'Success' ? 'text-green-500' :
                                    appointment.status === 'Canceled' ? 'text-red-500' :
                                        appointment.status === 'Waiting' ? 'text-yellow-500' : ''
                                    }`}
                            >
                                {appointment.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentView;
