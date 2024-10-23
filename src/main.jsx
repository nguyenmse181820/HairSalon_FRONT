import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CustomerFrame from './pages/frame/CustomerFrame.jsx';
import LandingPage from './pages/LandingPage.jsx';
import './index.css'

import StylistPage from './pages/stylistpage/StylistPage.jsx';
import ServiceStatus from './pages/stylistpage/ServiceStatus.jsx';
import AppointmentView from './pages/stylistpage/AppointmentView.jsx';
import ManagementAppointment from './pages/stylistpage/ManagementAppointment.jsx';
import Earning from './pages/stylistpage/Earning.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerFrame />,
    children: [
      {
        path: '',
        element: <LandingPage />
      }
    ]
  },

  {
    path: '/stylist',
    element: <StylistPage />
  },
  {
    path: '/stylist/services',
    element: <ServiceStatus />
  },
  {
    path: '/stylist/appointmentView',
    element: <AppointmentView />
  },
  {
    path: '/stylist/appointmentManagement',
    element: <ManagementAppointment />
  },
  {
    path: '/stylist/earning',
    element: <Earning />
  }




])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
