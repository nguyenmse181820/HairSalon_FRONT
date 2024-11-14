import React from 'react';
import { Toaster } from 'sonner';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { faChartLine, faUser, faUsers, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

const SidebarFrame = ({ role }) => {
  const sidebarItems = role === 'admin'
    ? [
        { title: 'Manage Service', path: '/admin/manage-service', icon: faConciergeBell },
        { title: 'Manage Stylist', path: '/admin/manage-stylist', icon: faUsers },
      ]
    : [
        { title: 'Dashboard', path: '/manager/dashboard', icon: faChartLine },
        { title: 'Customer Management', path: '/manager/manage-customers', icon: faUser },
        { title: 'Staff Management', path: '/manager/manage-staff', icon: faUsers },
      ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster position="bottom-right" richColors expand={true} />
      <Sidebar items={sidebarItems} />
      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarFrame;
