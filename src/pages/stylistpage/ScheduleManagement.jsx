import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/ScheduleManagement.css';

function ScheduleManagement() {
    const [showModal, setShowmodal] = useState(false);
    const [showDetail, setShowdetail] = useState(false);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios
            .get('https://6721ddfa98bbb4d93caa0c5e.mockapi.io/schedule')
            .then((response) => {
                setSchedules(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleModal = () => {
        setShowmodal(!showModal);
    };

    const toggleDetail = () => {
        setShowdetail(!showDetail);
    };

    // Hide scrollbar for modal
    if (showModal || showDetail) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <div>
            {/* Title */}
            <div className="mt-5 font-bold text-2xl text-center uppercase tracking-wider">
                Schedule Management
            </div>

            {/* Table */}
            <div className=" flex flex-col mt-10 mb-10 mx-6 md:mx-10 text-sm md:text-lg">
                <table className="table-auto w-full border border-gray-300 text-center">
                    <thead>
                        <tr>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Id</th>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Customer Name</th>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Service Type</th>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Date</th>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Note</th>
                            <th className="py-3 px-2 font-semibold text-center uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="py-3 px-2">{item.id}</td>
                                <td className="py-3 px-2">{item.customerName}</td>
                                <td className="hidden sm:table-cell py-3 px-2">{item.serviceType}</td>
                                <td className="py-3 px-2">{item.date}</td>
                                <td className="hidden sm:table-cell py-2 px-2">{item.note}</td>
                                <td className="py-3 px-2 flex justify-center items-center gap-2">
                                    <button
                                        className="bg-blue-600 text-white py-1 px-4 hover:bg-blue-500 transition duration-300"
                                        onClick={toggleDetail}
                                    >
                                        Detail
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-1 px-4 hover:bg-red-500 transition duration-300"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cancel Modal */}
            {showModal && (
                <div className="modal">
                    <div className="bg-black opacity-50 fixed w-full h-full left-0 top-0" onClick={toggleModal}></div>
                    <div className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-xl font-semibold mb-6 uppercase tracking-wider text-center">
                            Are you sure you want to cancel this appointment?
                        </div>
                        <div className="flex items-center mb-6">
                            <label className="basis-1/4">Reason for cancellation:</label>
                            <input type="text" className="w-full border px-2 py-1" />
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button className="bg-blue-600 text-white py-1 px-4 hover:bg-blue-500 transition duration-300">
                                Submit
                            </button>
                            <button
                                className="bg-red-600 text-white py-1 px-4 hover:bg-red-500 transition duration-300"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetail && (
                <div className="modal">
                    <div className="bg-black opacity-50 fixed w-full h-full left-0 top-0" onClick={toggleDetail}></div>
                    <div className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-xl font-semibold mb-6 uppercase tracking-wider text-center">
                            Customer Booking Information
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Customer Name:</div>
                            <div className="font-light">Nguyen Thanh Phong</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Email:</div>
                            <div className="font-light">NguyenThanhPhong@gmail.com</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Phone Number:</div>
                            <div className="font-light">0998762652</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Address:</div>
                            <div className="font-light">Quan Dong Da, Ha Noi</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Service Type:</div>
                            <div className="font-light">Hair Cut</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Note:</div>
                            <div className="font-light">Professional</div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold">Date:</div>
                            <div className="font-light">10:00 AM, 2023-09-01</div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-red-600 text-white py-1 px-4 hover:bg-red-500 transition duration-300"
                                onClick={toggleDetail}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScheduleManagement;
