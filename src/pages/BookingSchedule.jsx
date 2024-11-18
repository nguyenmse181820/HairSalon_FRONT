import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import toast from sonner
import { useAppointment } from "../context/AppointmentContext";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import dayjs from "dayjs";

function BookingSchedule() {
  const {
    selectedService,
    selectedStylist,
    appointmentDate,
    appointmentTime,
    setAppointmentDate,
    setAppointmentTime,
  } = useAppointment();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(appointmentDate ? dayjs(appointmentDate) : dayjs(currentDate));
  const [selectedTime, setSelectedTime] = useState(appointmentTime || "");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleMonthChange = (direction) => {
    setCurrentDate(currentDate.add(direction, "month"));
  };

  const handleDayClick = (day) => {
    const newDate = currentDate.date(day);
    setAppointmentDate(newDate.format("YYYY-MM-DD")); 
    setSelectedDate(newDate);
  };

  const handleTimeClick = (time) => {
    setAppointmentTime(time);
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (!isUserLoggedIn) {
      toast.error("Please log in to book an appointment");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time first!");
      return;
    }
    navigate("/booking/checkout");
  };

  const handleSignIn = () => { 
    navigate("/account");
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setIsUserLoggedIn(!!user);
  }, []);

  const daysInMonth = currentDate.daysInMonth();
  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const timeSlots = {
    morning: ["9:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["1:15 PM", "2:15 PM", "3:15 PM"],
    evening: ["5:00 PM", "6:00 PM", "7:00 PM"],
  };

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      <div className="flex flex-col md:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {currentDate.format("MMM YYYY")}
          </h2>
          <div className="flex space-x-1">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-s-lg bg-gray-200 hover:bg-gray-300"
            >
              {"<"}
            </button>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-e-lg bg-gray-200 hover:bg-gray-300"
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <button
              key={day}
              onClick={() => handleDayClick(day + 1)}
              className={`p-2 ${
                selectedDate.date() === day + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
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

        <div className="mb-4">
          {["morning", "afternoon", "evening"].map((period) => (
            <div key={period}>
              <h4 className="font-semibold capitalize">{period}</h4>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {timeSlots[period].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`p-2 ${
                      selectedTime === time
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/3">
        <AppointmentSummary
          service={selectedService}
          stylist={selectedStylist}
          selectedDate={selectedDate.format("MMM D, YYYY")}
          selectedTime={selectedTime}
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white w-1/2 border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black mr-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white w-1/2 border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black ml-2"
          >
            Proceed to checkout
          </button>
        </div>
        
        {!isUserLoggedIn && (
          <button className="bg-black text-white w-full border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black mt-3"
          onClick={handleSignIn}
          >
          Sign in
          </button>)}
      </div>
    </div>
  );
}

export default BookingSchedule;
