import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import ServiceCard from "../components/booking/ServiceCard";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import { toast } from "sonner";

function BookingService() {
  const { setSelectedService, selectedStylist, selectedService, appointmentDate, appointmentTime } = useAppointment();
  const [services, setServices] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://667c07dd3c30891b865b026d.mockapi.io/ass2/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setIsUserLoggedIn(!!user);
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleNext = () => {
    if(!selectedService) {
      toast.error("Please select a service first.");
      return;
    }
    navigate("/booking/stylist");
  };

  const handleSignIn = () => {
    navigate("/account");
  }

  return (
    <div className="flex flex-row p-8">
      <div className="w-3/5 space-y-5">
        <h2 className="text-2xl font-bold pb-3">Select your service</h2>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={() => handleServiceSelect(service)}
          />
        ))}
      </div>
      <div className="w-2/5 px-4">
        <AppointmentSummary
          service={selectedService}
          stylist={selectedStylist}
          selectedDate = {appointmentDate}
          selectedTime = {appointmentTime}
        />
        
        <div className="mt-4">
          <button
            onClick={handleNext}
            className="bg-black text-white w-full py-2"
          >
            Next
          </button>
        </div>

        {!isUserLoggedIn && (
          <button
            onClick={handleSignIn}
            className="bg-black text-white w-full py-2 mt-4"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingService;
