import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useState, useEffect, StrictMode } from "react";
import CustomerFrame from "./pages/frame/CustomerFrame.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import StylistFrame from "./pages/frame/StylistFrame.jsx";
import StylistPage from "./pages/stylist-page/StylistPage.jsx";
import ServiceStatus from "./pages/stylist-page/ServiceStatus.jsx";
import AppointmentView from "./pages/stylist-page/AppointmentView.jsx";
import ManagementAppointment from "./pages/stylist-page/ManagementAppointment.jsx";
import Earning from "./pages/stylist-page/Earning.jsx";
import "./index.css";

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("user: ", storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerFrame />,
      children: [
        { path: "", element: <LandingPage /> },
        {
          path: "account",
          element: user?.isLoggedIn ? <ProfilePage /> : <AccountPage />,
        },
        { path: "about-us", element: <AboutUs /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
    {
      path: "/stylist",
      element: <StylistFrame />,
      children: [
        { path: "home", element: <StylistPage /> },
        { path: "services", element: <ServiceStatus /> },
        { path: "appointmentView", element: <AppointmentView /> },
        { path: "appointmentManagement", element: <ManagementAppointment /> },
        { path: "earning", element: <Earning /> },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <App />
);
