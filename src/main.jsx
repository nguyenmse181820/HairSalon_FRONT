import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerFrame from './pages/frame/CustomerFrame.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import AboutUs from './pages/AboutUsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CustomerAppointment from './pages/CustomerAppointment.jsx';
import './index.css'
import StylistFrame from './pages/frame/StylistFrame.jsx';
import StylistPage from './pages/stylistpage/StylistPage.jsx';
import ServiceStatus from './pages/stylistpage/ServiceStatus.jsx';
import AppointmentView from './pages/stylistpage/AppointmentView.jsx';
import ManagementAppointment from './pages/stylistpage/ManagementAppointment.jsx';
import Earning from './pages/stylistpage/Earning.jsx';
import ScheduleManagement from './pages/stylistpage/ScheduleManagement.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerFrame />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'account',
        element: <AccountPage />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />

      },
      {
        path: 'appointment',
        element: <CustomerAppointment />

      },

    ]
  },
  {
    path: '/stylist',
    element: <StylistFrame />,
    children: [
      {
        path: 'home',
        element: <StylistPage />
      },
      {
        path: 'services',
        element: <ServiceStatus />
      },
      {
        path: 'appointmentView',
        element: <AppointmentView />
      },
      {
        path: 'appointmentManagement',
        element: <ManagementAppointment />
      },
      {
        path: 'earning',
        element: <Earning />
      },
      {
        path: 'schedule',
        element: <ScheduleManagement />
      }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
