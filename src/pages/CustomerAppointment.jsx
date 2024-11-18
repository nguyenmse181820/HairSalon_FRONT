import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerAppointment = () => {
    const [activeTab, setActiveTab] = useState('UPCOMING');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [appointments, setAppointments] = useState([]);

    const fetchUserAppointments = async () => {
        try {
            const response = await axios.get(
                `https://671f29bf1dfc429919842514.mockapi.io/api/appointment/UserAppointment`
            );
            console.log("Fetched appointments data:", response.data);
            setAppointments(response.data);
        } catch (error) {
            console.error("Failed to fetch appointments data:", error);
        }
    };

    useEffect(() => {
        fetchUserAppointments();
        console.log("Appointments:", appointments);
    }, []);


    const getDisplayDate = (date) => {
        const appointmentDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (appointmentDate.toDateString() === today.toDateString()) {
            return "TODAY";
        } else if (appointmentDate.toDateString() === yesterday.toDateString()) {
            return "YESTERDAY";
        } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
            return "TOMORROW";
        } else {
            return appointmentDate.toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
            }).toUpperCase();
        }
    };


    const getFilteredAppointments = () => {
        const today = new Date();
        const upcomingLimitDate = new Date(today);
        upcomingLimitDate.setDate(today.getDate() + 5);

        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);

            if (activeTab === 'UPCOMING') {
                return appointmentDate >= today && appointment.status !== "Canceled";
              } else if (activeTab === 'CANCELED') {
                return appointment.status === "Canceled";
              } else if (activeTab === 'SUCCESS') {
                return appointment.status === "Success";
              }
            return false;
        });
    };


    const filteredAppointments = getFilteredAppointments();

    const handleCancelOrder = () => {
        setShowConfirmPopup(true);
    };

    const handleConfirmCancel = () => {
        console.log("Cancellation Reason:", cancelReason);
        setShowConfirmPopup(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="p-6 bg-white">
            <div className="flex border-b">
                {['UPCOMING', 'SUCCESS', 'CANCELED'].map((tab) => (
                    <a
                        key={tab}
                        href="#"
                        className={`px-4 py-2 ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </a>
                ))}
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-4 mt-6 text-gray-500 font-semibold">
                <div className="col-span-1">DATE</div>
                <div className="col-span-1">STYLIST NAME</div>
                <div className="col-span-1">SERVICE TYPE</div>
                <div className="col-span-1"></div>
            </div>

            {/* Appointment Rows */}
            <div className="divide-y mt-4">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => {
                        const displayDate = appointment.date ? getDisplayDate(appointment.date) : "Invalid Date";
                        const services = appointment.serviceType ? appointment.serviceType.split(', ') : ["UNKNOWN SERVICE"];

                        return (
                            <div key={index} className="flex items-center py-4">
                                <div className="col-span-1 w-1/4 text-sm">
                                    <div className="font-semibold">{displayDate}</div>
                                    <div>{appointment.time || "Unknown Time"}</div>
                                </div>
                                <div className="col-span-1 w-1/4 text-sm">
                                    <div className="font-semibold">{appointment.stylistName || "Unknown Stylist"}</div>
                                    <div>{appointment.stylistEmail || "No Email"}</div>
                                </div>
                                <div className="col-span-1 w-1/4 text-sm font-semibold whitespace-pre-line">
                                    {services.map((service, idx) => (
                                        <div key={idx}>{service.toUpperCase()}</div>
                                    ))}
                                </div>
                                <div className="col-span-1 w-1/4 text-blue-500 flex justify-end pr-10">
                                    <a href="#" onClick={() => setSelectedAppointment(appointment)}>DETAIL &gt;</a>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 mt-4">
                        No appointments found.
                    </div>
                )}

            </div>

            {/* Detail and Confirmation Popups */}
            {selectedAppointment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-6 max-w-xl w-full space-y-10 border border-gray-300 ">
                        <button onClick={() => setSelectedAppointment(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold text-center">DETAIL BOOKING</h2>
                        <div className="grid gap-y-4 text-sm"> {/* Single-column grid layout */}
                            <div className="flex">
                                <div className="text-gray-600 w-1/3">STYLIST NAME</div>
                                <div className="font-semibold">{selectedAppointment.stylistName.toUpperCase()}</div>
                            </div>

                            <div className="flex">
                                <div className="text-gray-600 w-1/3">EMAIL</div>
                                <div>{selectedAppointment.stylistEmail}</div>
                            </div>

                            <div className="flex">
                                <div className="text-gray-600 w-1/3">SERVICE TYPE</div>
                                <div className="font-semibold">{selectedAppointment.serviceType.toUpperCase()}</div>
                            </div>

                            <div className="flex">
                                <div className="text-gray-600 w-1/3">DESCRIPTION</div>
                                <div className="whitespace-pre-line">{selectedAppointment.description}</div>
                            </div>

                            <div className="flex">
                                <div className="text-gray-600 w-1/3">DATE & TIME</div>
                                <div>
                                    <div className="font-semibold">{getDisplayDate(selectedAppointment.date)}</div>
                                    <div>{selectedAppointment.time}</div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="text-gray-600 w-1/3">STATUS</div>
                                <div className="font-semibold">{selectedAppointment.payment ? "PAID" : "UNPAID"}</div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleCancelOrder}
                                className="bg-black text-white py-1 px-4 font-semibold"
                            >
                                CANCEL ORDER
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full space-y-4">
                        <h2 className="text-lg font-bold text-center">Confirm Cancellation</h2>
                        <textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full h-24 p-2 border rounded resize-none" placeholder="Enter your reason here..." />
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowConfirmPopup(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Close</button>
                            <button onClick={handleConfirmCancel} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button className="text-gray-500">← Previous</button>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-200">1</button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100">2</button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100">3</button>
                    <span className="text-gray-500">...</span>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100">6</button>
                </div>
                <button className="text-gray-500">Next →</button>
            </div>
        </div>
    );
};

export default CustomerAppointment;
