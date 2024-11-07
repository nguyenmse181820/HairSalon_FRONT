import React, { useContext } from 'react';
import Logo from '../assets/coiffure-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../main';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-2/12 bg-gray-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-full h-auto hidden lg:block" />
        </div>
        <button
          onClick={() => navigate('/manager/dashboard')}
          className={`w-full text-left px-4 py-2 text-lg font-semibold mb-4 flex items-center ${
            isActive('/manager/dashboard') ? 'bg-blue-500 text-white' : 'bg-white'
          } ${!isActive('/manager/dashboard') ? 'xl:justify-start justify-center' : ''}`}
        >
          <FontAwesomeIcon icon={faChartLine} className="mr-2 lg:mr-2" />
          <span className="hidden xl:inline">Dashboard</span>
        </button>
        <button
          onClick={() => navigate('/manager/manage-customer')}
          className={`w-full text-left px-4 py-2 text-lg font-semibold mb-4 flex items-center ${
            isActive('/manager/manage-customer') ? 'bg-blue-500 text-white' : 'bg-white'
          } ${!isActive('/manager/manage-customer') ? 'xl:justify-start justify-center' : ''}`}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2 lg:mr-2" />
          <span className="hidden xl:inline">Customer Management</span>
        </button>
        <button
          onClick={() => navigate('/manager/manage-staff')}
          className={`w-full text-left px-4 py-2 text-lg font-semibold flex items-center ${
            isActive('/manager/manage-staff') ? 'bg-blue-500 text-white' : 'bg-white'
          } ${!isActive('/manager/manage-staff') ? 'xl:justify-start justify-center' : ''}`}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-2 lg:mr-2" />
          <span className="hidden xl:inline">Staff Management</span>
        </button>
      </div>
      <div className="flex justify-start w-full">
        <button
          className="w-full py-2 font-montserrat font-bold italic bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid hover:scale-95 transform transition-all duration-300 ease-in-out"
          onClick={logout}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
