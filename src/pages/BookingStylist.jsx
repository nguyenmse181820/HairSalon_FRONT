import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import StylistCard from "../components/booking/StylistCard";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import { toast } from "sonner";

function BookingStylist() {
  const {
    setSelectedStylist,
    selectedService,
    selectedStylist,
    appointmentDate,
    appointmentTime,
  } = useAppointment();
  const [stylists, setStylists] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://667c07dd3c30891b865b026d.mockapi.io/ass2/stylists")
      .then((response) => {
        setStylists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stylists:", error);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setIsUserLoggedIn(!!user);
  }, []);

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleSignIn = () => {
    navigate("/account");
  };

  const handleNext = () => {
    if (!selectedStylist) {
      toast.error("Please select a stylist first.");
      return;
    }
    navigate("/booking/schedule");
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 space-y-5 md:space-y-0">
      {/* AppointmentSummary Section - Moves to the top on mobile */}
      <div className="md:w-2/5 px-0 md:px-4 order-1 md:order-2">
        <AppointmentSummary
          service={selectedService}
          stylist={selectedStylist}
          selectedDate={appointmentDate}
          selectedTime={appointmentTime}
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
            onClick={handleNext}
            className="bg-black text-white w-1/2 border-black border uppercase py-3 transform duration-300 
            ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black ml-2"
          >
            Next
          </button>
        </div>

        {isUserLoggedIn &&
          selectedService &&
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

      {/* Stylist Selection Section */}
      <div className="md:w-3/5 space-y-4 order-2 md:order-1">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Select Your Stylist
        </h2>
        {stylists.map((stylist) => (
          <StylistCard
            key={stylist.id}
            stylist={stylist}
            onSelect={() => handleStylistSelect(stylist)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookingStylist;
