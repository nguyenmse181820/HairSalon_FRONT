import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const useFetchAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [balance, setBalance] = useState(0);
    const [compare, setCompare] = useState(0);
    const [monthlyEarnings, setMonthlyEarnings] = useState(Array(12).fill(0));

    useEffect(() => {
        const fetchUserAppointments = async () => {
            try {
                const { data } = await axios.get(`https://671f29bf1dfc429919842514.mockapi.io/api/appointment/UserAppointment`);
                processAppointmentsData(data);
                setAppointments(data);
            } catch (error) {
                console.error("Failed to fetch appointments data:", error);
            }
        };


        const processAppointmentsData = (data) => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            let yearlyBalance = 0;
            let lastMonthEarnings = 0;
            let thisMonthEarnings = 0;
            const earningsByMonth = Array(12).fill(0);

            data.forEach((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const month = appointmentDate.getMonth();
                const year = appointmentDate.getFullYear();

                if (appointment.status === 'Success' && year === currentYear) {
                    yearlyBalance += appointment.value;
                    earningsByMonth[month] += appointment.value;
                    if (month === currentMonth) {
                        thisMonthEarnings += appointment.value;
                    } else if (month === currentMonth - 1) {
                        lastMonthEarnings += appointment.value;
                    }
                }
            });
            setBalance(yearlyBalance);
            setCompare(lastMonthEarnings > 0 ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100 : 0);
            setMonthlyEarnings(earningsByMonth);
        };

        fetchUserAppointments();
    }, []);
    return { appointments, balance, compare, monthlyEarnings }
}

function Earning() {

    const { appointments, balance, compare, monthlyEarnings } = useFetchAppointments();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [income, setIncome] = useState(0);
    const [canceledAppointments, setCanceledAppointments] = useState(0);

    const currentDate = useMemo(() => ({ month: new Date().getMonth(), year: new Date().getFullYear() }), []);
    const daysInMonth = useMemo(() => new Date(currentDate.year, currentDate.month + 1, 0).getDate(), [currentDate]);
    const startDay = useMemo(() => new Date(currentDate.year, currentDate.month, 1).getDay(), [currentDate]);


    useEffect(() => {
        if (!startDate || !endDate) return;

        const start = new Date(currentDate.year, currentDate.month, startDate);
        const end = new Date(currentDate.year, currentDate.month, endDate);
        let totals = { total: 0, incomeSum: 0, canceledCount: 0 };

        appointments.forEach(({ date, status, value }) => {
            const appointmentDate = new Date(date);
            if (appointmentDate >= start && appointmentDate <= end) {
                if (status === 'Canceled') totals.canceledCount++;
                else {
                    totals.total++;
                    totals.incomeSum += Number(value) || 0;
                }
            }
        });

        setTotalAppointments(totals.total);
        setIncome(totals.incomeSum);
        setCanceledAppointments(totals.canceledCount);
    }, [startDate, endDate, appointments, currentDate]);



    const handleDateSelect = (date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (date > startDate) {
            setEndDate(date);
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    // Chart data and options
    const chartData = useMemo(() => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Earnings',
                data: monthlyEarnings,
                backgroundColor: 'black',
            },
        ],
    }), [monthlyEarnings]);

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: (value) => `${value}$` },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
            {/* Overview and Balance Cards */}
            <div className="grid grid-cols-10 gap-6 mb-6">
                {/* Overview Calendar */}
                <div className="col-span-4 bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Overview</h4>
                        <div>{new Date(currentDate.year, currentDate.month).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                    </div>
                    <hr />

                    {/* Summary for Selected Range */}
                    {startDate && endDate && (
                        <div className="mb-3 mt-3 p-2 bg-white">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-semibold text-gray-900">{totalAppointments}</p>
                                    <p className="text-base text-gray-500">Appointments</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-green-500">${income}</p>
                                    <p className="text-base text-gray-500">Income</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-red-500">{canceledAppointments}</p>
                                    <p className="text-base text-gray-500">Cancelled</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr />

                    {/* Calendar */}
                    <div className="grid grid-cols-7 gap-2 text-center text-gray-500 mt-3 mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                            <div key={index} className="font-semibold">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-gray-500 place-items-center">
                        {Array.from({ length: startDay }).map((_, index) => (
                            <div key={`empty-${index}`} className="p-2 w-10 h-10"></div>
                        ))}
                        {[...Array(daysInMonth).keys()].map(day => {
                            const currentDay = day + 1;
                            const isSelected = currentDay === startDate || currentDay === endDate;
                            const isInRange = startDate && endDate && currentDay > startDate && currentDay < endDate;

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateSelect(currentDay)}
                                    className={`p-2 w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-orange-400' : isInRange ? 'bg-gray-200' : 'bg-gray-100'}`}
                                >
                                    {currentDay}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Balance Card */}
                <div className="col-span-6 bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold mb-2">Your Balance</h4>
                    </div>
                    <hr />
                    <p className="text-sm text-gray-500 mt-4">Balance</p>
                    <p className="text-4xl font-semibold text-gray-900">${balance.toLocaleString("en-US")}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Compared to last month:
                        <span className={`${compare >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                            {compare >= 0 ? ` +${compare.toFixed(2)}` : `${compare.toFixed(2)}`}%</span>
                    </p>
                    <div className="bg-white rounded-lg p-6  mt-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-700 uppercase">Earnings by Month</h4>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-black mb-2 uppercase">Recent Transactions</h4>
                <hr />
                <table className="w-full text-left mt-1">
                    <thead>
                        <tr className="text-lg font-semibold text-black">
                            <th className="py-2 px-3">Date</th>
                            <th className="py-2 px-3">Type</th>
                            <th className="py-2 px-3">Amount</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">
                                <hr className="w-full border-gray-300 my-2" />
                            </td>
                        </tr>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="p-2">{appointment.date}</td>
                                <td className="p-2">{appointment.serviceType}</td>
                                <td className="p-2">${appointment.value}</td>
                                <td
                                    className={`p-2 ${appointment.status === 'Success' ? 'text-green-500' :
                                        appointment.status === 'Canceled' ? 'text-red-500' :
                                            appointment.status === 'Waiting' ? 'text-yellow-500' : ''
                                        }`}
                                >
                                    {appointment.status}
                                </td>
                                <td className="p-2">{appointment.methodPayment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Earning;
