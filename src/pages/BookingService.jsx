import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import ServiceCard from "../components/booking/ServiceCard";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import { toast } from "sonner";

function BookingService() {
  const {
    selectedService,
    setSelectedService,
    selectedStylist,
    appointmentDate,
    appointmentTime,
  } = useAppointment();
  const [services, setServices] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/services")
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
    setSelectedService((prevSelectedService) => {
      const isSelected = prevSelectedService.some((s) => s.id === service.id);
      if (isSelected) {
        toast.warning(`${service.title} removed from your booking.`);
        return prevSelectedService.filter((s) => s.id !== service.id);
      } else {
        toast.success(`${service.title} added to your booking.`);
        return [...prevSelectedService, service];
      }
    });
    
  };

  const handleNext = () => {
    if (selectedService.length <= 0) {
      toast.error("Please select a service first.");
      return;
    }
    navigate("/booking/stylist");
  };

  const handleSignIn = () => {
    navigate("/account");
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 space-y-5 md:space-y-0">
      <div className="md:w-2/5 px-0 md:px-4 order-1 md:order-2">
        <AppointmentSummary
          service={selectedService}
          stylist={selectedStylist}
          selectedDate={appointmentDate}
          selectedTime={appointmentTime}
        />

        <div className="mt-4 mb-2">
          <button
            onClick={handleNext}
            className="bg-black text-white w-full border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black"
          >
            Next
          </button>
        </div>
        {isUserLoggedIn &&
          selectedService.length > 0 &&
          selectedStylist &&
          appointmentDate &&
          appointmentTime && (
            <button
              onClick={() => navigate("/booking/checkout")}
              className="bg-black text-white w-full border-black border uppercase py-3 transform duration-300 
              ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black mt-3"
            >
              Proceed to checkout
            </button>
          )}
        {!isUserLoggedIn && (
          <button
            onClick={handleSignIn}
            className="bg-black text-white w-full border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black mt-3"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Service Selection Section */}
      <div className="md:w-3/5 space-y-5 order-2 md:order-1">
        <h2 className="text-xl md:text-2xl font-bold pb-3">
          Select your service
        </h2>
        {services.map((service) => {
          const isSelected = Array.isArray(selectedService) && selectedService.some(s => s.id === service.id);
          return (
            <ServiceCard
            key={service.id}
            service={service}
            onSelect={() => handleServiceSelect(service)}
            isSelected={isSelected}
          />
          );
        })}
      </div>
    </div>
  );
}

export default BookingService;
