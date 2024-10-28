import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CustomerFrame from './pages/frame/CustomerFrame.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import './index.css'
import StylistFrame from './pages/frame/StylistFrame.jsx';
import StylistPage from './pages/stylistpage/StylistPage.jsx';
import ServiceStatus from './pages/stylistpage/ServiceStatus.jsx';
import AppointmentView from './pages/stylistpage/AppointmentView.jsx';
import ManagementAppointment from './pages/stylistpage/ManagementAppointment.jsx';
import Earning from './pages/stylistpage/Earning.jsx';


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
  <StrictMode>
    <App />
  </StrictMode>
);
