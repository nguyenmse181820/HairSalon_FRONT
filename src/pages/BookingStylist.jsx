import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import StylistCard from "../components/booking/StylistCard";
import { stylists } from "../constant/index";
import AppointmentSummary from "../components/booking/AppointmentSummary";

function BookingStylist() {
  const { setSelectedStylist, selectedService, selectedStylist } = useAppointment();
  const navigate = useNavigate();

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist); // Save stylist data in context
    navigate("/booking/schedule"); // Redirect to schedule page
  };

  return (
    <div className="flex flex-row p-8">
      
      <div className="w-3/5 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Select Your Stylist</h2>
        {stylists.map((stylist) => (
          <StylistCard
            key={stylist.name}
            stylist={stylist}
            onSelect={() => handleStylistSelect(stylist)}
          />
        ))}
      </div>
      <div className="w-2/5 px-4">
        <AppointmentSummary service={selectedService} stylist={selectedStylist}/>
      </div>
    </div>
  );
}

export default BookingStylist;
