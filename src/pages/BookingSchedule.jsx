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
  const [selectedDate, setSelectedDate] = useState(
    appointmentDate ? dayjs(appointmentDate) : dayjs(currentDate)
  );
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
      toast.error("Please select a time to checkout.!");
      return;
    } else if(!selectedDate) {
      toast.error("Please select a date to checkout.!");
      return;
    } else if(selectedService.length < 1) {
      toast.error("Please select a service to checkout.!");
      return;
    } else if(!selectedStylist) {
      toast.error("Please select a stylist to checkout.!");
      return;
    }
    navigate("/booking/checkout");
  };

  const handleSignIn = () => {
    navigate("/account");
  };

  useEffect(() => {
    if(!appointmentDate) {
      setAppointmentDate(currentDate.format("YYYY-MM-DD"));
      setSelectedDate(currentDate);
    }
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
    <div className="flex flex-col md:flex-row p-4 sm:p-6 lg:p-8 gap-6">
      {/* Left Section */}
      <div className="flex flex-col md:w-2/3 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {currentDate.format("MMM YYYY")}
          </h2>
          <div className="flex space-x-1">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-l-lg bg-gray-200 hover:bg-gray-300"
            >
              {"<"}
            </button>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-r-lg bg-gray-200 hover:bg-gray-300"
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm sm:text-base">
          {weekdayLabels.map((label) => (
            <span key={label} className="font-semibold">
              {label}
            </span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <button
              key={day}
              onClick={() => handleDayClick(day + 1)}
              className={`p-2 text-sm sm:text-base rounded ${
                selectedDate.date() === day + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {day + 1}
            </button>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {selectedTime ? `${selectedTime}, ` : ""}
          {selectedDate.format("dddd, MMM D, YYYY")}
        </h3>

        <div>
          {["morning", "afternoon", "evening"].map((period) => (
            <div key={period} className="mb-4">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold capitalize mb-2">
                {period}
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots[period].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`p-2 rounded text-sm sm:text-base ${
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

      {/* Right Section */}
      <div className="md:w-1/3 space-y-6">
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
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black ml-2"
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
          <button
            onClick={handleSignIn}
            className="w-full bg-black text-white border-black border py-3 uppercase transition 
            hover:bg-transparent hover:text-black"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingSchedule;
