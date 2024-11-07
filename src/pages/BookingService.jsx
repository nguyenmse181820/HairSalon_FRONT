import { useNavigate } from "react-router-dom";
import React from "react";
import { useAppointment } from "../context/AppointmentContext";
import ServiceCard from "../components/booking/ServiceCard";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import { services } from "../constant/index";

function BookingService() {
  const { setSelectedService, selectedStylist, selectedService } = useAppointment();
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    navigate("/booking/stylist");
  };

  return (
    <div className="flex flex-row p-8">
      <div className="w-3/5 space-y-5">
      <h2 className="text-2xl font-bold pb-3">Select your service</h2>
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            service={service}
            onSelect={() => handleServiceSelect(service)}
          />
        ))}
      </div>
      <div className="w-2/5 px-4">
        <AppointmentSummary service={selectedService} stylist={selectedStylist} />
      </div>
    </div>
  );
}

export default BookingService;
