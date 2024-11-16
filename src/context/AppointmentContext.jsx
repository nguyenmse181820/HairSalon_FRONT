import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AppointmentContext = createContext();

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(
    () => JSON.parse(sessionStorage.getItem("selectedService")) || null
  );
  const [selectedStylist, setSelectedStylist] = useState(
    () => JSON.parse(sessionStorage.getItem("selectedStylist")) || null
  );
  const [appointmentDate, setAppointmentDate] = useState(
    () => sessionStorage.getItem("appointmentDate") || ""
  );
  const [appointmentTime, setAppointmentTime] = useState(
    () => sessionStorage.getItem("appointmentTime") || ""
  );

  useEffect(() => {
    sessionStorage.setItem("selectedService", JSON.stringify(selectedService));
  }, [selectedService]);

  useEffect(() => {
    sessionStorage.setItem("selectedStylist", JSON.stringify(selectedStylist));
  }, [selectedStylist]);

  useEffect(() => {
    sessionStorage.setItem("appointmentDate", appointmentDate);
  }, [appointmentDate]);

  useEffect(() => {
    sessionStorage.setItem("appointmentTime", appointmentTime);
  }, [appointmentTime]);

  const contextValue = useMemo(() => ({
    selectedService,
    setSelectedService,
    selectedStylist,
    setSelectedStylist,
    appointmentDate,
    setAppointmentDate,
    appointmentTime,
    setAppointmentTime,
  }), [selectedService, selectedStylist, appointmentDate, appointmentTime]);

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};
