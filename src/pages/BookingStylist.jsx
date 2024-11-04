import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import StylistCard from "../components/booking/StylistCard";
import { stylists } from "../constant/index";

function BookingStylist() {
  const { setSelectedStylist } = useAppointment();
  const navigate = useNavigate();

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist); // Save stylist data in context
    navigate("/booking/schedule"); // Redirect to schedule page
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Select Your Stylist</h2>
      <div className="space-y-4">
        {stylists.map((stylist) => (
          <StylistCard
            key={stylist.name}
            stylist={stylist}
            onSelect={() => handleStylistSelect(stylist)}
          />
        ))}
      </div>
    </div>
  );
}

export default BookingStylist;
