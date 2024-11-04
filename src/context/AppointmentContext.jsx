// src/context/AppointmentContext.jsx
import { createContext, useContext, useState } from "react";

// Create the AppointmentContext
const AppointmentContext = createContext();

// Custom hook to use the AppointmentContext
export const useAppointment = () => useContext(AppointmentContext);

// Provider component
// eslint-disable-next-line react/prop-types
export const AppointmentProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  return (
    <AppointmentContext.Provider
      value={{
        selectedService,
        setSelectedService,
        selectedStylist,
        setSelectedStylist,
        appointmentDate,
        setAppointmentDate,
        appointmentTime,
        setAppointmentTime,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
