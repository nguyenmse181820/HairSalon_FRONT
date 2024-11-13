import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContext";
import AppointmentSummary from "../components/booking/AppointmentSummary";

function Checkout() {
  const navigate = useNavigate();
  const { selectedService, selectedStylist, selectedDate, selectedTime } =
    useAppointment();

  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [form, setForm] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    hairHistory: "",
    note: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/"); // Redirect to home page when time runs out
    }
  }, [countdown, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment and submit appointment details
    console.log("Payment and appointment confirmed:", form);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-10">Checkout</h2>
      <p className="text-gray-500 text-center">
        appointment held for {formatTime(countdown)}
      </p>
      <div className="flex flex-col md:flex-row p-8 gap-8">
        <form onSubmit={handleSubmit} className="md:w-2/3 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold">Contact info</h3>
            <div className="flex items-center mb-4">
              <select
                className="border p-2 rounded-l bg-gray-200"
                required
                name="countryCode"
                value={form.countryCode}
                onChange={handleInputChange}
              >
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+61">AU +61</option>
                <option value="+84">VN +84</option>
                {/* Add country codes */}
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                required
                className="flex-grow p-2 border-t border-r border-b rounded-r"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                required
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                required
                className="p-2 border rounded"
              />
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="w-full p-2 border rounded mt-4"
            />
            <textarea
              name="hairHistory"
              value={form.hairHistory}
              onChange={handleInputChange}
              placeholder="If you'd like to share your hair history, please do so below"
              className="w-full p-2 border rounded mt-4"
            />
          </div>

          {/* Appointment Note */}
          <div>
            <h3 className="font-semibold">Appointment note</h3>
            <textarea
              name="note"
              value={form.note}
              onChange={handleInputChange}
              placeholder="write your note here"
              className="w-full p-2 border rounded mt-4"
            />
          </div>

          {/* Card on File */}
          <div>
            <h3 className="font-semibold">Card on file</h3>
            <div className="flex items-center border p-2 rounded">
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleInputChange}
                placeholder="Card number"
                required
                className="flex-grow p-2 border-r rounded-l"
              />
              <input
                type="text"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                className="w-20 p-2 border-r"
              />
              <input
                type="text"
                name="cvv"
                value={form.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                required
                className="w-16 p-2 rounded-r"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full py-2 mt-4 rounded text-lg"
          >
            Book Appointment
          </button>
        </form>

        {/* Right Side: Appointment Summary */}
        <div className="md:w-1/3 border rounded p-4">
          <AppointmentSummary
            service={selectedService}
            stylist={selectedStylist}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
