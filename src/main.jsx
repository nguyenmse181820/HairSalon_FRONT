import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect, StrictMode } from "react";
import CustomerFrame from "./pages/frame/CustomerFrame.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import RewardPage from "./pages/RewardPage.jsx";
import CustomerAppointment from './pages/CustomerAppointment.jsx';
import StylistFrame from "./pages/frame/StylistFrame.jsx";
import StylistPage from "./pages/stylistpage/StylistPage.jsx";
import ServiceStatus from "./pages/stylistpage/ServiceStatus.jsx";
import AppointmentView from "./pages/stylistpage/AppointmentView.jsx";
import ManagementAppointment from "./pages/stylistpage/ManagementAppointment.jsx";
import Earning from "./pages/stylistpage/Earning.jsx";
import ScheduleManagement from "./pages/stylistpage/ScheduleManagement.jsx";
import StaffFrame from "./pages/frame/StaffFrame.jsx";
import Bookings from "./pages/staffpage/Bookings.jsx";
import StylistAssignment from "./pages/staffpage/StylistAssignment.jsx";
import ManageCustomers from "./pages/manager-pages/ManageCustomers.jsx";
import ManageStaffs from "./pages/manager-pages/ManageStaffs.jsx";
import SidebarFrame from "./pages/frame/SidebarFrame.jsx";
import UnauthorizedAccess from "./pages/UnauthorizedAccess.jsx";
import BookingService from "./pages/BookingService";
import BookingStylist from "./pages/BookingStylist";
import BookingSchedule from "./pages/BookingSchedule";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/manager-pages/Dashboard.jsx";
import { AppointmentProvider } from "./context/AppointmentContext";
import ManageService from "./pages/admin-pages/ManageService.jsx";
import ManageStylist from "./pages/admin-pages/ManageStylist.jsx";
import "./index.css";
import StaffManagement from "./pages/staffpage/StaffManagement.jsx";
import ProtectedRoute from "./components/control-access/ProtectedRoute.jsx";

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null,
    id: null,
  });
  
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
  
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...user,
        ...parsedUser,   
        isLoggedIn: true,  
      });
    } else {
      setUser({
        isLoggedIn: false,
        role: null,
        id: null,
      });
    }
  
    setLoadingUser(false);
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
        { path: 'appointment', element: <CustomerAppointment /> },
        { path: 'feedback', element: <FeedbackPage /> },
        { path: 'reward', element: <RewardPage /> },
        { path: "unauthorized", element: <UnauthorizedAccess /> },
        {
          path: "/booking",
          children: [
            {
              path: "service",
              element: (
                <AppointmentProvider>
                  <BookingService />
                </AppointmentProvider>
              ),
            },
            {
              path: "stylist",
              element: (
                <AppointmentProvider>
                  <BookingStylist />
                </AppointmentProvider>
              ),
            },
            {
              path: "schedule",
              element: (
                <AppointmentProvider>
                  <BookingSchedule />
                </AppointmentProvider>
              ),
            },
            {
              path: "checkout",
              element: (
                <AppointmentProvider>
                  <Checkout />
                </AppointmentProvider>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/stylist",
      element: (
        <ProtectedRoute allowedRoles={["stylist"]}>
          <StylistFrame />
        </ProtectedRoute>
      ),
      children: [
        { path: "home", element: <StylistPage /> },
        { path: "services", element: <ServiceStatus /> },
        { path: "appointment_view", element: <AppointmentView /> },
        { path: "appointment_management", element: <ManagementAppointment /> },
        { path: "earning", element: <Earning /> },
        { path: "schedule", element: <ScheduleManagement /> },
      ],
    },
    {
      path: "/staff",
      element: (
      <ProtectedRoute allowedRoles={["staff"]}>
        <StaffFrame />
      </ProtectedRoute>
    ),
      children: [
        { path: "bookings", element: <Bookings /> },
        { path: "stylist_assignment", element: <StylistAssignment /> },
        { path: "management", element: <StaffManagement />},
      ]
    },
    {
      path: "/manager",
      element: (
        <ProtectedRoute allowedRoles={["manager"]}>
          <SidebarFrame role="manager" />
        </ProtectedRoute>
      ),
      children: [
        { path: "manage-customer", element: <ManageCustomers /> },
        { path: "manage-staff", element: <ManageStaffs /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <SidebarFrame role="admin" />
        </ProtectedRoute>
      ),
      children: [
        { path: "manage-service", element: <ManageService /> },
        { path: "manage-stylist", element: <ManageStylist /> },
      ],
    },
  ]);

  if (loadingUser) return <div>Loading...</div>;

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
