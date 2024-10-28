import React, { useState } from 'react';

const CustomerAppointment = () => {
    const [activeTab, setActiveTab] = useState('UPCOMING');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const appointments = [
        {
            dateLabel: 'TODAY',
            time: '10:00 - 11:00',
            stylistName: 'HOANG THACH',
            stylistEmail: 'thachstylist@gmail.com',
            serviceType: 'BLEACH HAIR HAIR STYLING',
            description: `Color: Ranges from golden blonde to icy platinum, depending on the level of bleach used and the natural hair color.\n\nTexture: Bleaching can make hair more porous and potentially drier, so it's important to use moisturizing products to maintain softness.\n\nVolume: Depending on the cut and styling, bleached hair can appear voluminous and textured, especially with added layers or waves.`,
            date: 'TODAY\n10:00 - 11:00',
            status: 'UNPAID',
            statusLabel: 'UPCOMING'
        },
    ];

    // Filter appointments based on the active tab
    const filteredAppointments = appointments.filter(appointment => appointment.statusLabel === activeTab);


    const handleCancelOrder = () => {
        // Show confirmation popup
        setShowConfirmPopup(true);
    };

    const handleConfirmCancel = () => {
        // Logic to cancel the order with reason
        console.log("Cancellation Reason:", cancelReason);
        setShowConfirmPopup(false);
        setSelectedAppointment(null); // Close detail popup
    };

    return (
        <div className="p-6 bg-white">
            {/* Tabs */}
            <div className="flex border-b">
                {['UPCOMING', 'SUCCESS', 'CANCELLED'].map((tab) => (
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
                {filteredAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center py-4">
                        <div className="col-span-1 w-1/4 text-sm">
                            <div className="font-semibold">{appointment.dateLabel}</div>
                            <div>{appointment.time}</div>
                        </div>
                        <div className="col-span-1 w-1/4 text-sm">
                            <div className="font-semibold">{appointment.stylistName}</div>
                            <div>{appointment.stylistEmail}</div>
                        </div>
                        <div className="col-span-1 w-1/4 text-sm font-semibold whitespace-pre-line">
                            {appointment.serviceType}
                        </div>
                        <div className="col-span-1 w-1/4 text-right text-blue-500">
                            <a href="#" onClick={() => setSelectedAppointment(appointment)}>DETAIL &gt;</a>
                        </div>
                    </div>
                ))}
            </div>


            {selectedAppointment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-10 rounded-lg max-w-xl w-full space-y-10">
                        {/* X icon to close the popup */}
                        <button
                            onClick={() => setSelectedAppointment(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-lg font-bold text-center">DETAIL BOOKING</h2>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-700 font-semibold">STYLIST NAME</div>
                            <div className="font-semibold">{selectedAppointment.stylistName}</div>

                            <div className="text-gray-700 font-semibold">EMAIL</div>
                            <div>{selectedAppointment.stylistEmail}</div>

                            <div className="text-gray-700 font-semibold">SERVICE TYPE</div>
                            <div className="font-semibold">{selectedAppointment.serviceType}</div>

                            <div className="text-gray-700 font-semibold">DESCRIPTION</div>
                            <div className="whitespace-pre-line">
                                {selectedAppointment.description.split('\n').map((line, index) => (
                                    <p key={index} className={index === 0 ? "font-bold" : ""}>{line}</p>
                                ))}
                            </div>

                            <div className="text-gray-700 font-semibold">DATE</div>
                            <div>{selectedAppointment.date}</div>

                            <div className="text-gray-700 font-semibold">STATUS</div>
                            <div className="font-semibold">{selectedAppointment.status}</div>
                        </div>
                        <button
                            onClick={handleCancelOrder}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded font-semibold"
                        >
                            CANCEL ORDER
                        </button>
                    </div>
                </div>
            )}

            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
                        <h2 className="text-lg font-bold text-center">Confirm Cancellation</h2>
                        <p className="text-sm text-gray-700">Please provide a reason for the cancellation:</p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full h-24 p-2 border rounded"
                            placeholder="Enter your reason here..."
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowConfirmPopup(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>
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
