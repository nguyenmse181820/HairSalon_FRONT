import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavigationBar from './components/NavigationBar.jsx'
import CustomerFrame from './pages/frame/CustomerFrame.jsx';
import LandingPage from './pages/LandingPage.jsx';
import './index.css'

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
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
