import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import ServiceCard from "../components/booking/ServiceCard";
import AppointmentSummary from "../components/booking/AppointmentSummary";

function BookingService() {
  const { setSelectedService, selectedStylist, selectedService } =
    useAppointment();
  const [services, setServices] = useState([]);
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

export default BookingService;
