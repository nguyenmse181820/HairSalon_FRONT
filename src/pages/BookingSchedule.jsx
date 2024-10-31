import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import dayjs from "dayjs";

function BookingSchedule() {
  const {
    selectedService,
    selectedStylist,
    setAppointmentDate,
    setAppointmentTime,
  } = useAppointment();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState("");

  const handleMonthChange = (direction) => {
    setCurrentDate(currentDate.add(direction, "month"));
  };

  const handleDayClick = (day) => {
    const newDate = currentDate.date(day);
    setSelectedDate(newDate);
    setAppointmentDate(newDate.format("YYYY-MM-DD")); // Save to context
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setAppointmentTime(time); // Save to context
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/booking/checkout");
  };

  const daysInMonth = currentDate.daysInMonth();
  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const timeSlots = {
    morning: ["9:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["1:15 PM", "2:15 PM", "3:15 PM"],
    evening: ["5:00 PM", "6:00 PM", "7:00 PM"],
  };

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Left Side: Calendar and Time Selection */}
      <div className="flex flex-col md:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {currentDate.format("MMM YYYY")}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-full bg-gray-200"
            >
              {"<"}
            </button>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-full bg-gray-200"
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <button
              key={day}
              onClick={() => handleDayClick(day + 1)}
              className={`p-2 rounded ${
                selectedDate.date() === day + 1
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              {day + 1}
            </button>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-4">
          {selectedTime ? `${selectedTime}, ` : ""}
          {selectedDate.format("dddd, MMM D, YYYY")}
        </h3>

        {/* Time Selection */}
        <div className="mb-4">
          {["morning", "afternoon", "evening"].map((period) => (
            <div key={period}>
              <h4 className="font-semibold capitalize">{period}</h4>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {timeSlots[period].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`p-2 rounded ${
                      selectedTime === time
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white w-full py-2 rounded text-lg"
        >
          Finish
        </button>
      </div>

      {/* Right Side: Appointment Summary */}
      <div className="md:w-1/3">
        <AppointmentSummary
          service={selectedService}
          stylist={selectedStylist}
        />

        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">General Information</h3>
          <p>
            <strong>Address</strong>: 55 Nguyen Dinh Chieu, Ho Chi Minh
          </p>
          <p>
            <strong>Phone</strong>: 0339383282
          </p>
          <p>
            <strong>Hours</strong>: Mon - Sat, 11:00 AM - 7:00 PM
          </p>
        </div>

        <button className="bg-black text-white w-full py-2 mt-4 rounded">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default BookingSchedule;
